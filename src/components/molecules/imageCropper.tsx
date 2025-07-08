"use client";

import { useEffect, useRef, useState } from "react";
import { Coordinates, Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import LoadingSpinner from "../../../public/icons/LoadingSpinner.svg";

interface ImageCropperProps {
  cropData: any;
  cropType: string;
  selectImage: string;
  setCropData: any;
  setCropImage: any;
}

interface ImageSize {
  width: number;
  height: number;
}

const ImageCropper = ({
  cropData,
  cropType,
  selectImage,
  setCropData,
  setCropImage
}: ImageCropperProps) => {
  const cropperRef = useRef<CropperRef>(null);
  const lastLoadedImageRef = useRef<string | null>(null);
  const imageCropDataRef = useRef<Map<string, Coordinates>>(new Map());

  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSize, setImageSize] = useState<ImageSize | null>(null);

  const onCropEnd = () => {
    if (cropperRef.current && selectImage) {
      const cropper = cropperRef.current;
      const cropCoordinates = cropper.getCoordinates();
      const cropCanvas = cropper.getCanvas();
      const cropImagetoString = cropCanvas?.toDataURL();

      if (selectImage === lastLoadedImageRef.current) {
        if (cropCoordinates) {
          imageCropDataRef.current.set(selectImage, cropCoordinates);
          setCropData(cropCoordinates);
        }
        if (cropImagetoString) setCropImage(cropImagetoString);
      }
    }
  };

  const defaultSize = ({ imageSize }: { imageSize: ImageSize }) => {
    if (cropType === "stillCuts") {
      const stillcutWidth = imageSize.width * 0.4;
      const stillcutHeight = stillcutWidth * (160 / 204);

      return {
        width: stillcutWidth,
        height: stillcutHeight
      };
    } else {
      const width = imageSize.width * 0.2;
      const height = width * (16 / 9);

      return {
        width: width,
        height: height
      };
    }
  };

  const getInitialCropData = (imageSize: ImageSize) => {
    const defaultCropSize = defaultSize({ imageSize });

    const centerX = (imageSize.width - defaultCropSize.width) / 2;
    const centerY = (imageSize.height - defaultCropSize.height) / 2;

    return {
      top: centerY,
      left: centerX,
      width: defaultCropSize.width,
      height: defaultCropSize.height
    };
  };

  useEffect(() => {
    if (selectImage) {
      setIsLoaded(false);
      const img = new Image();
      img.src = selectImage;
      img.onload = () => {
        lastLoadedImageRef.current = selectImage;
        setImageSize({
          width: img.width,
          height: img.height
        });
        setTimeout(() => {
          setIsLoaded(true);
        }, 500);
      };
    }
    return () => {};
  }, [selectImage]);

  useEffect(() => {
    if (selectImage && imageSize) {
      const savedCropData = imageCropDataRef.current.get(selectImage);

      if (savedCropData) {
        setCropData(savedCropData);
      } else {
        const initialCropData = getInitialCropData(imageSize);
        setCropData(initialCropData);
      }
    }
  }, [selectImage, imageSize]);

  return (
    <div className="relative h-full w-full">
      {isLoaded ? (
        <Cropper
          ref={cropperRef}
          src={selectImage}
          defaultSize={
            cropData && cropData.width === 0 && cropData.height === 0
              ? defaultSize
              : cropData
          }
          defaultPosition={
            cropData && cropData.width !== 0 && cropData.height !== 0
              ? cropData
              : undefined
          }
          stencilProps={{
            aspectRatio: cropType === "stillCuts" ? 16 / 9 : 160 / 204
          }}
          onReady={() => onCropEnd()}
          onInteractionEnd={onCropEnd}
          className="h-full w-full"
        />
      ) : (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <LoadingSpinner
            width="24"
            height="24"
            className="fill-current animate-spin text-content-primary-light dark:text-content-primary-dark"
          />
        </div>
      )}
    </div>
  );
};

export default ImageCropper;

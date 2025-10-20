"use client";

import { useEffect, useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import LoadingSpinner from "../../../public/icons/LoadingSpinner.svg";
import { Coordinates } from "@/app/[@handle]/types";

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
  const isInitialCropRef = useRef(false);
  const loadingTimeoutRef = useRef<NodeJS.Timeout>();

  const [isLoaded, setIsLoaded] = useState(false);

  const onCropEnd = () => {
    if (!cropperRef.current || !selectImage) return;
    if (selectImage !== lastLoadedImageRef.current) return;

    const cropper = cropperRef.current;
    const cropCoordinates = cropper.getCoordinates();
    const cropCanvas = cropper.getCanvas();
    const cropImagetoString = cropCanvas?.toDataURL();

    if (cropCoordinates) {
      imageCropDataRef.current.set(selectImage, cropCoordinates);
      setCropData(cropCoordinates);
    }
    if (cropImagetoString) {
      setCropImage(cropImagetoString);
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
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }

      setIsLoaded(false);
      isInitialCropRef.current = false;
      lastLoadedImageRef.current = selectImage;

      const img = new Image();
      img.src = selectImage;
      img.onload = () => {
        if (lastLoadedImageRef.current !== selectImage) {
          return;
        }

        const imgSize = {
          width: img.width,
          height: img.height
        };

        const savedCropData = imageCropDataRef.current.get(selectImage);
        if (!savedCropData) {
          const initialCropData = getInitialCropData(imgSize);
          setCropData(initialCropData);
        } else {
          setCropData(savedCropData);
        }
        loadingTimeoutRef.current = setTimeout(() => {
          if (lastLoadedImageRef.current === selectImage) {
            setIsLoaded(true);
          }
        }, 500);
      };
    }
    return () => {
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, [selectImage]);

  useEffect(() => {
    if (isLoaded && selectImage && !isInitialCropRef.current) {
      const initialCropTimeout = setTimeout(() => {
        if (cropperRef.current && lastLoadedImageRef.current === selectImage) {
          onCropEnd();
          isInitialCropRef.current = true;
        }
      }, 100);

      return () => clearTimeout(initialCropTimeout);
    }
  }, [isLoaded, selectImage]);

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
          onReady={onCropEnd}
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

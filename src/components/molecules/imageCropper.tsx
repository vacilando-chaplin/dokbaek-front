"use client";

import { useEffect, useRef, useState } from "react";
import { Coordinates, Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import LoadingSpinner from "../../../public/icons/LoadingSpinner.svg";

interface ImageCropperProps {
  selectImage: string;
  setCropImage: any;
  cropData: any;
  setCropData: React.Dispatch<React.SetStateAction<Coordinates | null>>;
  cropType: string;
}

const ImageCropper = ({
  cropData,
  cropType,
  selectImage,
  setCropData,
  setCropImage
}: ImageCropperProps) => {
  const cropperRef = useRef<CropperRef>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  const onCropEnd = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current;
      const cropCoordinates = cropper.getCoordinates();
      const cropCanvas = cropper.getCanvas();
      const cropImagetoString = cropCanvas?.toDataURL();

      setCropData(cropCoordinates);
      setCropImage(cropImagetoString);
    }
  };

  const defaultSize = ({ imageSize }: any) => {
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

  useEffect(() => {
    if (selectImage) {
      const img = new Image();
      img.src = selectImage;
      img.onload = () => {
        setTimeout(() => {
          setIsLoaded(true);
          onCropEnd();
        }, 500);
      };
    }
    return () => {};
  }, [selectImage]);

  return (
    <>
      {isLoaded ? (
        <Cropper
          ref={cropperRef}
          src={selectImage}
          defaultSize={
            cropData.top === 0 && cropData.left === 0 ? defaultSize : cropData
          }
          defaultPosition={
            cropData.top !== 0 && cropData.left !== 0 ? cropData : undefined
          }
          stencilProps={{
            aspectRatio: cropType === "stillCuts" ? 16 / 9 : 160 / 204
          }}
          onInteractionEnd={onCropEnd}
          className="h-full w-full"
        />
      ) : (
        <LoadingSpinner
          width="24"
          height="24"
          className="fill-current absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-content-primary-light dark:text-content-primary-dark"
        />
      )}
    </>
  );
};

export default ImageCropper;

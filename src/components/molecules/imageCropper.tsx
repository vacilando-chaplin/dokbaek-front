"use client";

import { useEffect, useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface ImageCropperProps {
  selectImage: string;
  setCropImage: any;
  cropData: any;
  setCropData: any;
  cropType?: string;
}

const ImageCropper = ({
  cropData,
  cropType,
  selectImage,
  setCropData,
  setCropImage
}: ImageCropperProps) => {
  const cropperRef = useRef<CropperRef>(null);

  const [isLoading, setIsLoading] = useState(false);

  const onCropEnd = () => {
    if (cropperRef.current) {
      const cropData = cropperRef.current.getCoordinates();
      const cropImagetoString = cropperRef.current.getCanvas()?.toDataURL();

      setCropData(cropData);
      setCropImage(cropImagetoString);
    }
  };

  const defaultSize = ({ imageSize }: any) => {
    if (cropType === "stillcut") {
      const stillcutWidth = imageSize.width * 0.8;
      const stillcutHeight = stillcutWidth * (9 / 16);

      return {
        width: stillcutWidth,
        height: stillcutHeight
      };
    } else {
      const width = imageSize.width * 0.6;
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
          setIsLoading(true);
          onCropEnd();
        }, 1000);
      };
    }
    return () => {};
  }, [selectImage]);

  return (
    <>
      {isLoading && (
        <Cropper
          ref={cropperRef}
          src={selectImage}
          defaultSize={
            Object.keys(cropData).length >= 1 ? cropData : defaultSize
          }
          defaultPosition={Object.keys(cropData).length >= 1 && cropData}
          onInteractionEnd={onCropEnd}
          className="h-full w-full"
        />
      )}
    </>
  );
};

export default ImageCropper;

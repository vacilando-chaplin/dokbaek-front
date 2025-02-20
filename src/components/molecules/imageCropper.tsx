"use client";

import { useEffect, useRef, useState } from "react";
import { Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

interface ImageCropperProps {
  selectImage: string;
  setCropImage: any;
  cropType: string;
  cropData?: any;
  setCropData?: any;
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

  const defaultSize = ({ imageSize, visibleArea }: any) => {
    const aspectRatio = 160 / 204;
    const targetWidth = visibleArea ? visibleArea.width : imageSize.width;
    const maxWidth = Math.min(720, imageSize.width - 160);
    const finalWidth = Math.min(targetWidth, maxWidth);
    const finalHeight = finalWidth / aspectRatio;

    if (cropType === "stillcut") {
      const stillcutWidth = imageSize.width * 0.8;
      const stillcutHeight = stillcutWidth * (9 / 16);
      return {
        width: stillcutWidth,
        height: stillcutHeight
      };
    } else {
      return {
        width: finalWidth,
        height: finalHeight
      };
    }
  };

  useEffect(() => {
    if (selectImage) {
      setIsLoading(true);
      const img = new Image();
      img.src = selectImage;
      img.onload = () => {
        setTimeout(() => {
          onCropEnd();
        }, 200);
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

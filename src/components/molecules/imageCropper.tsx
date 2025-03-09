"use client";

import { CropDataType } from "@/app/profile/[id]/types";
import { useEffect, useRef, useState } from "react";
import { Coordinates, Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

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

  const [isLoading, setIsLoading] = useState(false);

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
    if (cropType === "stillcut") {
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
          setIsLoading(true);
          onCropEnd();
        }, 500);
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
            cropData.top === 0 && cropData.left === 0 ? defaultSize : cropData
          }
          defaultPosition={
            cropData.top !== 0 && cropData.left !== 0 ? cropData : undefined
          }
          stencilProps={{
            aspectRatio: cropType === "stillcut" ? 16 / 9 : 160 / 204
          }}
          onInteractionEnd={onCropEnd}
          className="h-full w-full"
        />
      )}
    </>
  );
};

export default ImageCropper;

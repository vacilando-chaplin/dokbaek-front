"use client";

import { useEffect, useRef, useState } from "react";
import {
  Coordinates,
  Cropper,
  CropperRef,
  debounce
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const ImageCropper = ({ selectImage, setCropImage }: any) => {
  const cropperRef = useRef<CropperRef>(null);

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null); // cropper 좌표
  const [isLoading, setIsLoading] = useState(false);

  const onCrop = () => {
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      setCropImage(cropperRef.current.getCanvas()?.toDataURL());
    }
  };

  useEffect(() => {
    if (selectImage) {
      const img = new Image();
      img.src = selectImage;
      img.onload = () => {
        setTimeout(() => {
          setIsLoading(true);
        }, 1000);
      };
    }
  }, [selectImage]);

  return (
    <>
      {isLoading && (
        <Cropper
          ref={cropperRef}
          src={selectImage}
          onChange={debounce(onCrop, 2000)}
          stencilProps={{
            aspectRatio: 160 / 204
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;

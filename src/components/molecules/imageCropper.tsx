"use client";

import { useRef, useState } from "react";
import { Coordinates, Cropper, CropperRef } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const ImageCropper = ({ selectImage, setCropImage }: any) => {
  const cropperRef = useRef<CropperRef>(null);

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null); // cropper 좌표

  const onCrop = () => {
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      setCropImage(cropperRef.current.getCanvas()?.toDataURL());
    }
  };

  return (
    <Cropper
      ref={cropperRef}
      src={selectImage}
      onChange={onCrop}
      stencilProps={{
        aspectRatio: 160 / 204
      }}
    />
  );
};

export default ImageCropper;

"use client";

import React, { useRef, useState } from "react";
import { CropperRef, Cropper, Coordinates } from "react-advanced-cropper";
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

  return <Cropper ref={cropperRef} src={selectImage} onChange={onCrop} />;
};

export default ImageCropper;

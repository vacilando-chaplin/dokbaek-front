"use client";

import { photoDragEnd } from "@/data/atom";
import { useEffect, useRef, useState } from "react";
import {
  Coordinates,
  Cropper,
  CropperRef,
  debounce
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";
import { useSetRecoilState } from "recoil";

interface ImageCropperProps {
  selectImage: string;
  setCropImage: any;
}

const ImageCropper = ({ selectImage, setCropImage }: ImageCropperProps) => {
  const cropperRef = useRef<CropperRef>(null);

  // const [coordinates, setCoordinates] = useState<Coordinates | null>(null); // cropper 좌표
  // setCoordinates(cropperRef.current.getCoordinates());
  const [isLoading, setIsLoading] = useState(false);

  const setDragEnd = useSetRecoilState(photoDragEnd);

  const onCrop = () => {
    if (cropperRef.current) {
      setDragEnd(true);
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
    return () => {};
  }, [selectImage]);

  return (
    <>
      {isLoading && (
        <Cropper
          ref={cropperRef}
          src={selectImage}
          onChange={onCrop}
          // onChange={debounce(onCrop, 3000)}
          // onMove={() => setDragEnd(false)}
          stencilProps={{
            aspectRatio: 160 / 204
          }}
        />
      )}
    </>
  );
};

export default ImageCropper;

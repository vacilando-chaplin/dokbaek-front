"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PhotoResponseType } from "./types";
import { convertToBase64, getFileMimeTypeFromUrl } from "./utils";
import { SelectedImagesType } from "@/app/profile/[id]/types";
import { cropDataInit } from "@/app/profile/[id]/data";
import { imageCompressionOptions } from "./data";
import imageCompression from "browser-image-compression";

export const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

export const useSetToken = (name: string, token: string) => {
  Cookies.set(name, token, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict"
  });
};

export const useSetLoginProfileId = (name: string, loginProfileId: string) => {
  Cookies.set(name, loginProfileId, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict"
  });
};

export const useSetLoginForm = (name: string, loginForm: string) => {
  Cookies.set(name, loginForm, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "strict"
  });
};

export const useGetBlurPhoto = async (photoList: PhotoResponseType[]) => {
  const blurImages = [];
  for (const photo of photoList) {
    const mimeType = await getFileMimeTypeFromUrl(photo.path);
    const response = await fetch(photo.path);
    const blob = await response.blob();
    const file = new File([blob], "image", { type: mimeType });
    const image = await convertToBase64(file);

    blurImages.push(image);
  }
  return blurImages;
};

export const useImageSelector = () => {
  const [selectImage, setSelectImage] = useState<string>("");
  const [cropImage, setCropImage] = useState<string>("");
  const [selectedImages, setSelectedImages] = useState<SelectedImagesType[]>(
    []
  );

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const originImage = await convertToBase64(file);
      const downSizedFile = await imageCompression(
        file,
        imageCompressionOptions
      );
      const downSizedImage = await convertToBase64(downSizedFile);

      setSelectImage(downSizedImage);
      setCropImage(downSizedImage);
      setSelectedImages([
        {
          origin: originImage,
          preview: downSizedImage,
          originImage: originImage,
          cropData: cropDataInit
        }
      ]);
    }
    e.target.value = "";
  };

  return {
    selectImage,
    cropImage,
    selectedImages,
    onSelectFile,
    setSelectImage,
    setCropImage,
    setSelectedImages
  };
};

"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PhotoResponseType } from "./types";
import { convertToBase64, getFileMimeTypeFromUrl } from "./utils";

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

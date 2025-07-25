"use client";

import { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { convertToBase64, getFileMimeTypeFromUrl } from "./utils";
import { imageCompressionOptions } from "./data";
import imageCompression from "browser-image-compression";
import { useSetRecoilState } from "recoil";
import {
  cropImageState,
  cropModalState,
  recentPhotoTypeState,
  selectedImagesState,
  selectImageState
} from "./recoil/handle/edit/photo/atom";
import { FileRejection } from "react-dropzone";
import {
  CategoryKey,
  RecentPhotoCategory
} from "@/app/[@handle]/edit/photo/types";
import { cropDataInit } from "@/app/[@handle]/data";
import {
  ProfilePhotoDataType,
  ProfileRecentPhotoDataType
} from "@/app/[@handle]/edit/types";

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

export const useImageSelector = () => {
  const setSelectImage = useSetRecoilState(selectImageState);
  const setCropImage = useSetRecoilState(cropImageState);
  const setSelectedImages = useSetRecoilState(selectedImagesState);

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
          id: Math.random(),
          origin: originImage,
          preview: downSizedImage,
          originImage: originImage,
          cropData: cropDataInit
        }
      ]);
    }
    e.target.value = "";
  };

  return { onSelectFile };
};

export const usePhotoDrop = (
  category: CategoryKey,
  photoType: RecentPhotoCategory
) => {
  const setCropImage = useSetRecoilState(cropImageState);
  const setSelectImage = useSetRecoilState(selectImageState);
  const setSelectedImages = useSetRecoilState(selectedImagesState);
  const setCropModal = useSetRecoilState(cropModalState);
  const setRecentPhotoType = useSetRecoilState(recentPhotoTypeState);

  const onDrop = async (images: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) return;

    const fileData = await Promise.all(
      images.map(async (file) => {
        const downSizedFile = await imageCompression(
          file,
          imageCompressionOptions
        );
        const downSizedImage = await convertToBase64(downSizedFile);

        return {
          id: Math.random(),
          origin: downSizedImage,
          preview: downSizedImage,
          originImage: downSizedImage,
          cropData: cropDataInit
        };
      })
    );

    if (photoType) setRecentPhotoType(photoType);

    setCropImage(fileData[0].preview);
    setSelectImage(fileData[0].originImage);
    setSelectedImages(fileData);
    setCropModal({
      id: "",
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category
    });
  };

  return { onDrop };
};

export const usePhotoEditModal = () => {
  const setCropImage = useSetRecoilState(cropImageState);
  const setSelectImage = useSetRecoilState(selectImageState);
  const setSelectedImages = useSetRecoilState(selectedImagesState);
  const setCropModal = useSetRecoilState(cropModalState);

  const onPhotoEditModalOpen = async (
    photo: ProfilePhotoDataType | ProfileRecentPhotoDataType,
    category: CategoryKey
  ) => {
    const mimeType = await getFileMimeTypeFromUrl(photo.path);
    const response = await fetch(photo.path);
    const blob = await response.blob();
    const file = new File([blob], "image", { type: mimeType });

    const downSizedFile = await imageCompression(file, imageCompressionOptions);
    const downSizedImage = await convertToBase64(downSizedFile);

    setCropImage(downSizedImage);
    setSelectImage(downSizedImage);
    setSelectedImages([
      {
        id: 0,
        origin: downSizedImage,
        preview: downSizedImage,
        originImage: downSizedImage,
        cropData: cropDataInit
      }
    ]);
    setCropModal({
      id: photo.id,
      state: "edit",
      active: true,
      name: "사진 편집",
      buttonText: "완료",
      category
    });
  };

  return {
    onPhotoEditModalOpen
  };
};

export const useActive = (initialActive: boolean = false) => {
  const [active, setActive] = useState(initialActive);

  const onActive = useCallback(() => {
    setActive((prev) => !prev);
  }, []);

  return { active, onActive };
};

"use client";

import { useCallback, useEffect, useState } from "react";
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

    const downSizedImage = await convertToBase64(file);

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

  const onOpen = useCallback(() => {
    setActive(true);
  }, []);

  const onClose = useCallback(() => {
    setActive(false);
  }, []);

  return { active, onOpen, onClose, onActive };
};

export const useRange = (defaultMin: number, defaultMax: number) => {
  const [min, setMin] = useState(defaultMin);
  const [max, setMax] = useState(defaultMax);

  const debouncedMin = useDebounce(min, 500);
  const debouncedMax = useDebounce(max, 500);

  const onReset = useCallback(() => {
    setMin(defaultMin);
    setMax(defaultMax);
  }, [defaultMin, defaultMax]);

  const onRangeChange = useCallback((newRange: [number, number]) => {
    setMin(newRange[0]);
    setMax(newRange[1]);
  }, []);

  const onMinChange = useCallback(
    (value: number) => {
      if (value > defaultMax) {
        setMin(defaultMax - 1);
        return;
      }

      setMin(value);
    },
    [max]
  );

  const onMaxChange = useCallback(
    (value: number) => {
      if (value > defaultMax) {
        setMax(defaultMax);
        return;
      }
      setMax(value);
    },
    [max]
  );

  useEffect(() => {
    let correctedMin = debouncedMin;
    let correctedMax = debouncedMax;
    let minChanged = false;
    let maxChanged = false;

    // 1. 기본 범위 (defaultMin, defaultMax) 클램핑

    // min이 defaultMin보다 작아지면 defaultMin으로 변경
    if (correctedMin < defaultMin) {
      correctedMin = defaultMin;
      minChanged = true;
    }

    // max가 defaultMax보다 커지면 defaultMax로 변경 (요청 사항)
    if (correctedMax > defaultMax) {
      correctedMax = defaultMax;
      maxChanged = true;
    }

    // 2. **min >= max 교차 검사 및 수정 (요청 사항 반영)**
    // min이 max 이상이 되면 max를 min + 1로 변경
    if (correctedMin >= correctedMax) {
      // max를 min + 1로 설정하여 최소 1의 차이 보장 (min < max)
      correctedMax = correctedMin + 1;
      maxChanged = true;

      // 만약 min + 1이 defaultMax를 초과한다면,
      // max는 defaultMax가 되고, min도 max - 1로 조정해야 합니다.
      if (correctedMax > defaultMax) {
        correctedMax = defaultMax;

        // min을 max - 1로 재조정
        correctedMin = correctedMax - 1;
        minChanged = true;

        // min이 defaultMin보다 작아지는 것을 방지하기 위해 다시 클램핑
        if (correctedMin < defaultMin) {
          correctedMin = defaultMin;
          // 이 경우 max는 min + 1이 되지만, 이 로직은 주로 defaultMin < defaultMax를 전제로 합니다.
        }
      }
    }

    // 3. 상태 업데이트
    // 디바운스된 값이 유효성 검사를 통과하여 변경되었을 때만 setMin/setMax 호출
    if (minChanged) {
      setMin(correctedMin);
    }
    if (maxChanged) {
      setMax(correctedMax);
    }

    // 이펙트는 debounced 값과 default 값에만 의존합니다.
  }, [debouncedMin, debouncedMax, defaultMin, defaultMax]);

  return {
    min,
    max,
    value: [min, max] as [number, number],
    onReset,
    onMinChange,
    onMaxChange,
    onRangeChange
  };
};

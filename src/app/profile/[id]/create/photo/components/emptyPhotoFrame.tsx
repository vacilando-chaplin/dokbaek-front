"use client";

import { useDropzone } from "react-dropzone";
import { ProfilePhotoDataType } from "../../types";
import { CategoryKey } from "../types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { useImageSelector, usePhotoDrop } from "@/lib/hooks";
import { cropModalState } from "@/lib/recoil/profile/photo/atom";

interface EmptyPhotoFrameProps {
  category: CategoryKey;
}

const EmptyPhotoFrame = ({ category }: EmptyPhotoFrameProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const setCropModal = useSetRecoilState(cropModalState);

  const photoList: ProfilePhotoDataType[] =
    profileData &&
    (category === "photos"
      ? profileData.photos
      : category === "stillCuts"
        ? profileData.stillCuts
        : []);

  const { onSelectFile } = useImageSelector();
  const { onDrop } = usePhotoDrop(category);

  // 사진 추가 모달 열기
  const onCropModalOpen = (category: string) => {
    setCropModal({
      id: "",
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category: category
    });
  };

  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": []
      },
      onDrop,
      multiple: true,
      maxFiles: 20 - photoList.length,
      maxSize: 10000000
    });

  return (
    <>
      {photoList.length === 0 && (
        <div
          className={`flex h-auto w-full cursor-pointer items-center justify-center gap-4 rounded-xl border border-dotted px-6 py-16 hover:border-accent-primary-light hover:bg-accent-light-light dark:hover:border-accent-primary-dark dark:hover:bg-accent-light-dark ${isDragAccept ? "border-accent-primary-light bg-accent-light-light dark:border-accent-primary-dark dark:bg-accent-light-dark" : isDragReject ? "border-state-negative-light bg-red-50 dark:border-state-negative-dark" : "border-gray-150 bg-gray-50 dark:border-border-active-light dark:bg-gray-800"}`}
          {...getRootProps()}
        >
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onClick={() => onCropModalOpen}
            onChange={onSelectFile}
            {...getInputProps()}
          />
          <label
            className={`typography-caption1 cursor-pointer font-medium ${isDragAccept ? "text-accent-primary-light dark:text-accent-primary-dark" : "text-content-tertiary-light dark:text-content-tertiary-dark"}`}
          >
            추가할 사진을 끌어다 놓으세요.
          </label>
        </div>
      )}
    </>
  );
};

export default EmptyPhotoFrame;

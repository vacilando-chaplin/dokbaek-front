"use client";

import { useDropzone } from "react-dropzone";
import { ProfilePhotoDataType } from "../../types";
import PhotoPreviewCard from "./photoPreviewCard";
import { CategoryKey } from "../types";
import { cropModalState } from "@/lib/recoil/profile/photo/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { useImageSelector, usePhotoDrop } from "@/lib/hooks";

interface PhotoPreviewListProps {
  category: CategoryKey;
}

const PhotoPreviewList = ({ category }: PhotoPreviewListProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const setCropModal = useSetRecoilState(cropModalState);

  const { onSelectFile } = useImageSelector();
  const { onDrop } = usePhotoDrop(category);

  const photoList: ProfilePhotoDataType[] =
    profileData &&
    (category === "photos"
      ? profileData.photos
      : category === "stillCuts"
        ? profileData.stillCuts
        : []);

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
      {photoList.length >= 1 && (
        <div
          className={`grid w-full cursor-pointer grid-cols-4 gap-2 rounded-xl hover:border hover:border-dotted hover:border-accent-primary-light hover:bg-accent-light-light dark:hover:border-accent-primary-dark dark:hover:bg-accent-light-dark ${isDragAccept ? "border border-dotted border-accent-primary-light bg-accent-light-light dark:border-accent-primary-dark dark:bg-accent-light-dark" : isDragReject ? "hover:border hover:border-dotted hover:border-state-negative-light hover:bg-red-50 hover:dark:border-state-negative-dark" : "border-gray-150 bg-gray-50 dark:border-border-active-light dark:bg-gray-800"}`}
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
          {photoList.map((previewPhoto: ProfilePhotoDataType) => {
            return (
              <PhotoPreviewCard
                key={previewPhoto.id}
                category={category}
                previewPhoto={previewPhoto}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default PhotoPreviewList;

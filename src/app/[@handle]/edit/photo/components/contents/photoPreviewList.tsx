"use client";

import { useDropzone } from "react-dropzone";
import PhotoPreviewCard from "./photoPreviewCard";
import { cropModalState } from "@/lib/recoil/handle/edit/photo/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { useImageSelector, usePhotoDrop } from "@/lib/hooks";
import { toastMessage } from "@/lib/atoms";
import { CategoryKey } from "../../types";
import { ProfilePhotoDataType } from "../../../types";

interface PhotoPreviewListProps {
  category: CategoryKey;
}

const PhotoPreviewList = ({ category }: PhotoPreviewListProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const setCropModal = useSetRecoilState(cropModalState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const { onSelectFile } = useImageSelector();
  const { onDrop } = usePhotoDrop(category, "");

  const photoList: ProfilePhotoDataType[] =
    category === "photos"
      ? (profileData?.photos ?? [])
      : category === "stillCuts"
        ? (profileData?.stillCuts ?? [])
        : [];

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

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop,
    onDropRejected: () => {
      setToastMessage("지원하지 않는 파일 형식이거나 파일 개수가 너무 많아요.");
    },
    multiple: true,
    maxFiles: 20 - (photoList?.length ?? 0),
    maxSize: 10000000
  });

  return (
    <>
      {photoList?.length >= 1 && (
        <div
          className={`grid w-full cursor-pointer grid-cols-4 gap-2 rounded-xl hover:border hover:border-dotted hover:border-accent-primary-light hover:bg-accent-light-light dark:hover:border-accent-primary-dark dark:hover:bg-accent-light-dark ${isDragAccept ? "border border-dotted border-accent-primary-light bg-accent-light-light dark:border-accent-primary-dark dark:bg-accent-light-dark" : "border-gray-150 bg-gray-50 dark:border-border-active-light dark:bg-gray-800"}`}
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

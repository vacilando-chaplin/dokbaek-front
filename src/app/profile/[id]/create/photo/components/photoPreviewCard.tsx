"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import LoadingSpinner from "../../../../../../../public/icons/LoadingSpinner.svg";
import { ProfilePhotoDataType } from "../../types";
import { useState } from "react";
import DeleteModal from "@/components/molecules/deleteModal";
import { deletePhoto } from "@/lib/api";
import { useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { convertToBase64, getFileMimeTypeFromUrl } from "@/lib/utils";
import imageCompression from "browser-image-compression";
import { imageCompressionOptions } from "@/lib/data";
import { cropDataInit } from "../../../data";
import { cropModalState } from "@/lib/recoil/profile/photo/atom";
import { SelectedImagesType } from "../../../types";
import { CategoryKey } from "../types";

interface PhotoPreviewCardProps {
  category: CategoryKey;
  previewPhoto: ProfilePhotoDataType;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImagesType[]>>;
}

const PhotoPreviewCard = ({
  category,
  previewPhoto,
  setCropImage,
  setSelectImage,
  setSelectedImages
}: PhotoPreviewCardProps) => {
  const profileId = Number(Cookies.get("loginProfileId"));

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);

  const setProfileData = useSetRecoilState(profileDraftData);
  const setCropModalState = useSetRecoilState(cropModalState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onDeleteModalActive = () => {
    setDeleteModalActive(!deleteModalActive);
  };

  const onDeletePhoto = async (
    id: string,
    category: "photos" | "stillCuts"
  ) => {
    await deletePhoto(
      profileId,
      id,
      category === "photos" ? "photo" : "stillcut"
    );

    setProfileData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== previewPhoto.id)
    }));
    onDeleteModalActive();
    setToastMessage("사진을 삭제했어요.");
  };

  // 사진 편집 모달 오픈
  const onPhotoEditModalOpen = async (
    photo: ProfilePhotoDataType,
    category: string
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
    setCropModalState({
      id: photo.id,
      state: "edit",
      active: true,
      name: "사진 편집",
      buttonText: "완료",
      category: category
    });
  };

  return (
    <div
      key={previewPhoto.id}
      className={`group relative flex h-full w-full rounded-lg ${category === "stillCuts" ? "aspect-video" : "aspect-[160/204]"}`}
    >
      {!isLoaded && !isError && (
        <LoadingSpinner
          width="24"
          height="24"
          className="fill-current absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin text-content-primary-light dark:text-content-primary-dark"
        />
      )}
      <Image
        src={previewPhoto.previewPath}
        alt=""
        sizes="100vw"
        fill
        priority
        className={`rounded-lg object-cover transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsError(true);
          setIsLoaded(true);
        }}
      />
      <div className="absolute h-full w-full opacity-0 transition-opacity group-hover:opacity-100">
        <label
          className="absolute right-8 top-2 h-auto w-auto cursor-pointer rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
          onClick={(e) => {
            e.stopPropagation();
            onPhotoEditModalOpen(previewPhoto, category);
          }}
        >
          <Edit
            width="12"
            height="12"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
        </label>
        <button
          className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteModalActive();
          }}
        >
          <X
            width="12"
            height="12"
            className="fill-current text-state-negative-light dark:text-state-negative-dark"
          />
        </button>
        {deleteModalActive && (
          <DeleteModal
            id={previewPhoto.id}
            text="이 사진을 삭제할까요?"
            category={category}
            onCancel={onDeleteModalActive}
            onDelete={onDeletePhoto}
          />
        )}
      </div>
      {isError && (
        <div>
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gray-50">
            <div className="mb-2 text-gray-400">
              <svg
                className="h-8 w-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-xs text-gray-500">
              이미지를 불러오는데 실패 했어요.
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoPreviewCard;

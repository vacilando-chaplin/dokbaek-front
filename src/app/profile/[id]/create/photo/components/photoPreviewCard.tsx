"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
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

interface PhotoPreviewCardProps {
  previewPhoto: ProfilePhotoDataType;
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImagesType[]>>;
}

const PhotoPreviewCard = ({
  previewPhoto,
  setCropImage,
  setSelectImage,
  setSelectedImages
}: PhotoPreviewCardProps) => {
  const profileId = Number(Cookies.get("loginProfileId"));

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
    <figure
      key={previewPhoto.id}
      className="group relative flex aspect-[160/204] h-full w-full rounded-lg"
    >
      <Image
        src={previewPhoto.previewPath}
        alt="사진 미리보기"
        sizes="100vw"
        fill
        priority
        className="rounded-lg"
      />
      (
      <div className="absolute h-full w-full opacity-0 transition-opacity group-hover:opacity-100">
        {/* edit */}
        <label
          className="absolute right-8 top-2 h-auto w-auto cursor-pointer rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
          onClick={() => onPhotoEditModalOpen(previewPhoto, "photos")}
        >
          <Edit
            width="12"
            height="12"
            className="fill-current text-content-primary-light dark:text-content-primary-dark"
          />
        </label>
        {/* delete */}
        <button
          className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
          type="button"
          onClick={onDeleteModalActive}
        >
          <X
            width="12"
            height="12"
            className="fill-current text-state-negative-light dark:text-state-negative-dark"
          />
        </button>
        {/* deleteModal */}
        {deleteModalActive && (
          <DeleteModal
            id={previewPhoto.id}
            text="이 사진을 삭제할까요?"
            category="photos"
            onCancel={onDeleteModalActive}
            onDelete={onDeletePhoto}
          />
        )}
      </div>
      )
    </figure>
  );
};

export default PhotoPreviewCard;

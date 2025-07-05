"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import LoadingSpinner from "../../../../../../../public/icons/LoadingSpinner.svg";
import { ProfilePhotoDataType, ProfileRecentPhotoDataType } from "../../types";
import { useState } from "react";
import DeleteModal from "@/components/molecules/deleteModal";
import { deletePhoto } from "@/lib/api";
import { useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { CategoryKey } from "../types";
import { usePhotoEditModal } from "@/lib/hooks";
import { categoryMap } from "../data";

interface PhotoPreviewCardProps {
  category: CategoryKey;
  previewPhoto: ProfilePhotoDataType | ProfileRecentPhotoDataType;
}

const PhotoPreviewCard = ({
  category,
  previewPhoto
}: PhotoPreviewCardProps) => {
  const profileId = Number(Cookies.get("loginProfileId"));

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [deleteModalActive, setDeleteModalActive] = useState(false);

  const setProfileData = useSetRecoilState(profileDraftData);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onDeleteModalActive = () => {
    setDeleteModalActive(!deleteModalActive);
  };

  const onDeletePhoto = async (id: string, category: CategoryKey) => {
    await deletePhoto(profileId, id, categoryMap[category]);

    setProfileData((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== previewPhoto.id)
    }));
    onDeleteModalActive();
    setToastMessage("사진을 삭제했어요.");
  };

  const { onPhotoEditModalOpen } = usePhotoEditModal();

  return (
    <div
      key={previewPhoto.id}
      className={`group relative flex h-full w-full rounded-lg ${category === "stillCuts" ? "aspect-video" : "aspect-[160/204]"}`}
    >
      {!isLoaded && !isError && (
        <LoadingSpinner
          width="24"
          height="24"
          className="fill-current absolute left-1/2 top-1/2 animate-spin text-content-primary-light dark:text-content-primary-dark"
        />
      )}
      <Image
        src={previewPhoto.previewPath}
        alt="미리보기 이미지"
        sizes="100vw, 50vw"
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

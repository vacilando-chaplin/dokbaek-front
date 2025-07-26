"use client";

import Cookies from "js-cookie";
import Image from "next/image";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import LoadingSpinner from "../../../../../../../public/icons/LoadingSpinner.svg";
import { useState } from "react";
import DeleteModal from "@/components/molecules/deleteModal";
import { useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { usePhotoEditModal } from "@/lib/hooks";
import { useMutation } from "@tanstack/react-query";
import EmptyImage from "@/components/atoms/emptyImage";
import { CategoryKey } from "../../types";
import {
  ProfilePhotoDataType,
  ProfileRecentPhotoDataType
} from "../../../types";
import { categoryMap } from "../../data";
import { deletePhoto } from "../../api";

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

  // 사진 삭제
  const useDeletePhotoMutation = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        id,
        category
      }: {
        profileId: number;
        id: string;
        category: CategoryKey;
      }) => {
        return await deletePhoto(profileId, id, categoryMap[category]);
      },
      onSuccess: (data, variables) => {
        const { id, category } = variables;

        setProfileData((prev) => ({
          ...prev,
          [category]: prev[category].filter((item) => item.id !== id)
        }));

        onDeleteModalActive();
        setToastMessage("사진을 삭제했어요.");
      },
      onError: () => {
        setToastMessage("사진 삭제에 실패했어요.");
      }
    });
  };

  const deletePhotoMutation = useDeletePhotoMutation();

  const onDeletePhoto = (id: string, category: CategoryKey) => {
    deletePhotoMutation.mutate({
      profileId,
      id,
      category
    });
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
      {isError && <EmptyImage />}
    </div>
  );
};

export default PhotoPreviewCard;

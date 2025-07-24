"use client";

import { useActive } from "@/lib/hooks";
import {
  isMyProfileState,
  mainPhotoCropImageState,
  mainPhotoImageState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import Image from "next/image";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { convertToBase64 } from "@/lib/utils";
import { imageCompressionOptions } from "@/lib/data";
import imageCompression from "browser-image-compression";
import MainPhotoMenuButton from "./mainPhotoMenuButton";
import MainPhotoMenu from "./mainPhotoMenu";
import MainPhotoEmpty from "./mainPhotoEmpty";
import { useState } from "react";
import LoadingSpinner from "../../../../../public/icons/LoadingSpinner.svg";
import Heart from "../../../../../public/icons/Heart.svg";
import HeartFill from "../../../../../public/icons/HeartFill.svg";
import EyeOn from "../../../../../public/icons/EyeOn.svg";
import EmptyImage from "@/components/atoms/emptyImage";
import Cookies from "js-cookie";
import { toastMessage } from "@/lib/atoms";
import { deleteProfileLike, postProfileLike } from "@/app/likes/api";
import { useMutation } from "@tanstack/react-query";

const MainPhoto = () => {
  const loginProfileId = Number(Cookies.get("loginProfileId"));

  const [profileData, setProfileData] = useRecoilState(profileViewState);
  const isMyProfile = useRecoilValue(isMyProfileState);

  const setCropImage = useSetRecoilState(mainPhotoCropImageState);
  const setSelectImage = useSetRecoilState(mainPhotoImageState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const mainPhotoPreview = profileData?.mainPhotoPreviewPath ?? "";

  const { active, onActive } = useActive();

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const downSizedFile = await imageCompression(
        file,
        imageCompressionOptions
      );
      const downSizedImage = await convertToBase64(downSizedFile);

      setSelectImage(downSizedImage);
      setCropImage(downSizedImage);
    }
    e.target.value = "";
  };

  // 프로필 좋아요 Mutation
  const useProfileLikeMutation = () => {
    return useMutation({
      mutationFn: async ({
        loginProfileId,
        action
      }: {
        loginProfileId: number;
        action: "like" | "unlike";
      }) => {
        if (action === "like") {
          return await postProfileLike(loginProfileId);
        } else {
          return await deleteProfileLike(loginProfileId);
        }
      },
      onSuccess: (_, { action }) => {
        setProfileData((prev) => ({
          ...prev,
          likedByMe: action === "like"
        }));
      },
      onError: () => {
        setToastMessage("오류가 발생했습니다. 다시 시도해 주세요.");
      }
    });
  };

  const likeMutation = useProfileLikeMutation();

  // 프로필 좋아요
  const onLike = async () => {
    if (isNaN(loginProfileId)) {
      setToastMessage("해당 기능은 로그인 후 이용할 수 있어요.");
    } else if (loginProfileId) {
      if (profileData.likedByMe) {
        const action = profileData.likedByMe ? "unlike" : "like";
        likeMutation.mutate({ loginProfileId, action });
      }
    }
  };

  return mainPhotoPreview ? (
    <div
      className="relative w-full"
      style={{ paddingBottom: `${(532 / 416) * 100}%` }}
    >
      {!isLoaded && !isError && (
        <LoadingSpinner
          width="24"
          height="24"
          className="fill-current absolute left-1/2 top-1/2 animate-spin text-content-primary-light dark:text-content-primary-dark"
        />
      )}
      {isError && <EmptyImage />}
      <Image
        src={mainPhotoPreview}
        alt="대표 사진"
        quality={100}
        fill
        priority
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setIsError(true);
          setIsLoaded(true);
        }}
        className="h-full w-full rounded-2xl object-cover"
      />
      <div className="absolute bottom-2 right-2 flex flex-row gap-1.5 rounded-lg bg-background-scrim-light px-2 py-1 dark:bg-background-scrim-dark">
        {!isMyProfile && (
          <button
            type="button"
            className="flex flex-row items-center gap-1"
            onClick={onLike}
          >
            {profileData.likedByMe ? (
              <Heart
                width="14"
                height="14"
                className="fill-current text-static-white"
              />
            ) : (
              <HeartFill
                width="14"
                height="14"
                className="fill-current text-content-primary-light dark:text-content-primary-dark"
              />
            )}
            <span className="typography-caption1 font-medium text-static-white">
              {profileData.likesCount ?? 0}
            </span>
          </button>
        )}
        <div className="flex flex-row items-center gap-1">
          <EyeOn
            width="14"
            height="14"
            className="fill-current text-static-white"
          />
          <span className="typography-caption1 font-medium text-static-white">
            {profileData.viewsCount ?? 0}
          </span>
        </div>
      </div>
      <MainPhotoMenuButton onActive={onActive} />
      <MainPhotoMenu
        active={active}
        onActive={onActive}
        onSelectFile={onSelectFile}
      />
    </div>
  ) : (
    <MainPhotoEmpty onSelectFile={onSelectFile} />
  );
};

export default MainPhoto;

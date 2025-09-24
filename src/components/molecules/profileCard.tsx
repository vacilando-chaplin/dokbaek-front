"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ProfileShowcaseResponseType } from "@/app/landing/types";
import { deleteProfileLike, postProfileLike } from "@/app/profiles/api";
import Heart from "../../../public/icons/Heart.svg";
import HeartFill from "../../../public/icons/HeartFill.svg";
import EyeOn from "../../../public/icons/EyeOn.svg";
import Account from "../../../public/icons/Account.svg";
import LoadingSpinner from "../../../public/icons/LoadingSpinner.svg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LoginModal from "../organisms/loginModal";
import { routePaths } from "@/constants/routes";
import { getProfileByProfileId } from "@/lib/api";
import { getProfileImageUrl } from "@/lib/utils";

interface ProfileCardProps {
  profile: ProfileShowcaseResponseType;
  fetchProfiles: () => void;
}

const ProfileCard = ({ profile, fetchProfiles }: ProfileCardProps) => {
  const [liked, setLiked] = useState(profile.likedByMe);
  const [loginModal, setLoginModal] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const jwt = Cookies.get("jwt");
  const router = useRouter();

  const profileImage = getProfileImageUrl(profile.mainPhotoPreviewPath);

  const onClickProfile = async () => {
    if (loginModal) return;
    const res = await getProfileByProfileId(profile.id);
    const data = res.data;
    router.push(routePaths.profile(data.handleId));
  };

  const calculateBornYearShort = (bornYear: number) => {
    return bornYear.toString().slice(2, 4);
  };
  const calculateKoreanAge = () => {
    const currentYear = new Date().getFullYear();
    return profile?.bornYear ? currentYear - profile?.bornYear + 1 : "-";
  };

  const onClickProfileLike = async () => {
    if (!jwt || !profile.id) {
      setLoginModal(true);
      return;
    }

    setLiked((prev) => !prev);

    try {
      if (liked) {
        await deleteProfileLike(profile.id);
      } else {
        await postProfileLike(profile.id);
      }
    } catch (error) {
      setLiked((prev) => !prev);
    } finally {
      fetchProfiles();
    }
  };

  return (
    <div
      onClick={onClickProfile}
      className="w-full cursor-pointer rounded-2xl border border-gray-100 bg-background-base-light p-4 hover:border-gray-300 dark:border-gray-900 dark:bg-background-base-dark dark:hover:border-gray-700"
    >
      <div className="relative flex aspect-[212/271] items-center justify-center rounded-lg">
        {!isLoaded && !isError && profileImage && (
          <LoadingSpinner
            width="24"
            height="24"
            className="fill-current left-1/2 top-1/2 animate-spin text-content-primary-light dark:text-content-primary-dark"
          />
        )}
        {profileImage && (
          <Image
            src={profileImage}
            alt="photo"
            fill
            loading="lazy"
            unoptimized={true}
            className="h-full w-full rounded-lg object-cover"
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setIsError(true);
              setIsLoaded(true);
            }}
          />
        )}
        {(!profileImage || isError) && (
          <Account
            width="24"
            height="24"
            className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
          />
        )}
        <div className="absolute bottom-2 right-2 flex h-[18px] items-center justify-center gap-1 rounded-full bg-background-scrim-light bg-opacity-40 px-2 py-1 dark:bg-background-scrim-dark">
          <div className="flex items-center gap-0.5">
            <Heart
              width="14"
              height="14"
              className="fill-current text-static-white"
            />
            <div className="typography-caption2 text-static-white">
              {profile.likesCount}
            </div>
          </div>
          <div className="flex items-center gap-0.5">
            <EyeOn
              width="14"
              height="14"
              className="fill-current text-static-white"
            />
            <div className="typography-caption2 text-static-white">
              {profile.viewCount}
            </div>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <div className="flex items-center justify-between">
          <p className="typography-body2 mb-1 font-semibold text-content-primary-light dark:text-content-primary-dark">
            {profile.name ? profile.name : "-"}
          </p>
          <button
            type="button"
            className="p-0.5 hover:rounded-2xl hover:bg-gray-200 dark:hover:bg-gray-800"
            onClick={(e) => {
              e.stopPropagation();
              onClickProfileLike();
            }}
          >
            {liked ? (
              <HeartFill
                width="16"
                height="16"
                className="fill-current text-state-negative-light dark:text-state-negative-dark"
              />
            ) : (
              <Heart
                width="16"
                height="16"
                className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
              />
            )}
          </button>
        </div>
        <div className="typography-caption1 flex font-regular text-content-tertiary-light dark:text-content-primary-dark">
          {typeof profile.height === "number" && profile.height !== 0 && (
            <>
              {profile.height}cm
              <span className="mx-1">·</span>
            </>
          )}
          {typeof profile.weight === "number" && profile.weight !== 0 && (
            <>
              {profile.weight}kg
              <span className="mx-1">·</span>
            </>
          )}
          {profile.bornYear && (
            <span>
              {calculateBornYearShort(profile.bornYear)}년생(
              {calculateKoreanAge()}세)
            </span>
          )}
        </div>
      </div>
      {loginModal && (
        <LoginModal onLoginModalClose={() => setLoginModal(false)} />
      )}
    </div>
  );
};

export default ProfileCard;

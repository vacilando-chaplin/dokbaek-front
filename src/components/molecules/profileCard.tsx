import React, { useEffect, useState } from "react";
import Image from "next/image";
import Profile from "../../../public/images/samples/profile.png";
import { ProfileShowcaseResponseType } from "@/app/landing/types";
import { deleteProfileLike, postProfileLike } from "@/app/profiles/api";
import Heart from "../../../public/icons/Heart.svg";
import Like from "../../../public/icons/Like.svg";
import LikeRed from "../../../public/icons/LikeRed.svg";
import EyeOn from "../../../public/icons/EyeOn.svg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import LoginModal from "../organisms/loginModal";

interface ProfileCardProps {
  profile: ProfileShowcaseResponseType;
  fetchProfiles: () => void;
}

const ProfileCard = ({ profile, fetchProfiles }: ProfileCardProps) => {
  const [liked, setLiked] = useState(profile.likedByMe);
  const [loginModal, setLoginModal] = useState(false);

  const jwt = Cookies.get("jwt");
  const router = useRouter();

  const onClickProfile = () => {
    if (loginModal) return;
    router.push(`/profile/${profile.id}`);
  };

  const calculateBornYearShort = (bornYear: number) => {
    return bornYear.toString().slice(2, 4);
  };
  const calculateKoreanAge = () => {
    const currentYear = new Date().getFullYear();
    return profile?.bornYear ? currentYear - profile?.bornYear + 1 : "-";
  };
  interface OnClickProfileLikeEvent
    extends React.MouseEvent<HTMLButtonElement> {}

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
      className="w-[100%] cursor-pointer rounded-[16px] border border-gray-100 bg-background-base-light p-4 hover:border-gray-300 dark:border-gray-900 dark:bg-background-base-dark dark:hover:border-gray-700"
    >
      <div className="relative">
        {profile.mainPhotoPreviewPath ? (
          <Image
            src={profile.mainPhotoPreviewPath}
            alt="photo"
            width={212}
            height={271}
            className="h-full w-full rounded-2xl"
          />
        ) : (
          <Image
            src={Profile}
            alt="photo"
            width={212}
            height={271}
            className="h-full w-full rounded-2xl"
          />
        )}
        <div className="absolute bottom-2 right-2 flex h-[18px] items-center justify-center gap-[4px] rounded-full bg-background-scrim-light bg-opacity-40 px-2 py-1 dark:bg-background-scrim-dark">
          <div className="flex items-center gap-[2px]">
            <Heart
              width="14"
              height="14"
              className="fill-current text-static-white"
            />
            <div className="typography-caption2 text-static-white">
              {profile.likesCount}
            </div>
          </div>
          <div className="flex items-center gap-[2px]">
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
            <Like
              width="16"
              height="16"
              className={`fill-current ${liked ? "text-state-negative-light dark:text-state-negative-dark" : "text-content-alternative-light dark:text-content-alternative-dark"}`}
            />
          </button>
        </div>
        <div className="typography-caption1 flex font-regular text-content-tertiary-light dark:text-content-primary-dark">
          {profile.height}cm
          <span className="mx-1">·</span>
          {profile.weight}kg
          <span className="mx-1">·</span>
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

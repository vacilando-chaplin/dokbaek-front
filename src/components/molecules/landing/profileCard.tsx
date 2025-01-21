import React from "react";
import Image from "next/image";
import Profile from "../../../../public/images/samples/profile.png";
import { ProfileShowcaseResponseType } from "@/app/landing/types";

interface ProfileCardProps {
  profile: ProfileShowcaseResponseType;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  const calculateKoreanAge = () => {
    const currentYear = new Date().getFullYear();
    return profile?.bornYear ? currentYear - profile?.bornYear + 1 : "-";
  };

  return (
    <div className="rounded-[16px] border border-gray-100 bg-background-base-light p-4 sm:w-[calc(50%-6px)] md:w-[calc(33.33%-6px)] lg:w-[calc(25%-6px)]">
      <Image
        src={Profile}
        alt="photo"
        height={311}
        className="w-[100%] rounded-[16px]"
      />
      <div className="mt-3">
        <p className="mb-1 text-body2 font-semibold text-content-primary-light">
          {profile.name}
        </p>
        <div className="flex text-caption1 font-regular text-content-tertiary-light">
          {profile.height}cm
          <span className="mx-1">·</span>
          {profile.weight}kg
          <span className="mx-1">·</span>
          {profile.bornYear && (
            <span>
              {profile.bornYear}년생({calculateKoreanAge()}세)
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

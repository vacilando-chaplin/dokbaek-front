import React from "react";
import Image from "next/image";
import Profile from "../../../../public/images/samples/profile.png";
import { recentProfile } from "@/types/types";

interface ProfileCardProps {
  profile: recentProfile;
}

const ProfileCard = ({ profile }: ProfileCardProps) => {
  return (
    <div
      className="rounded-[16px] border border-border-default-light bg-background-base-light p-4"
      style={{ width: `calc(25% - 8px)` }}
    >
      <Image
        src={Profile}
        alt="photo"
        height={311}
        className="rounded-[16px]"
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
          {profile.bornYear}년생(32세)
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;

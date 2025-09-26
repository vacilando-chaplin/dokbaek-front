"use client";

import ProfileCard from "@/components/molecules/profileCard";
import { profileShowcaseState } from "@/lib/recoil/home/atom";
import { MyProfileIdType, ProfileShowcaseType } from "@/lib/types";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

interface HomeProfileListShowcaseProps {
  myProfileId: MyProfileIdType;
  profileShowcase: ProfileShowcaseType;
}

const HomeProfileListShowcase = ({
  myProfileId,
  profileShowcase
}: HomeProfileListShowcaseProps) => {
  const [profileShowcaseList, setProfileShowcaseList] =
    useRecoilState(profileShowcaseState);

  useEffect(() => {
    setProfileShowcaseList(profileShowcase);
  }, []);

  return (
    <div className="mx-auto grid w-full max-w-[1272px] grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] gap-[13px]">
      {profileShowcaseList.profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          profile={profile}
          myProfileId={myProfileId}
        />
      ))}
    </div>
  );
};

export default HomeProfileListShowcase;

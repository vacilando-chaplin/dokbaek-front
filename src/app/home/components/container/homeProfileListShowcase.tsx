"use client";

import ProfileCard from "@/components/molecules/profileCard";
import {
  profileShowcasePageState,
  profileShowcaseState
} from "@/lib/recoil/home/atom";
import { MyProfileIdType, ProfileShowcaseType } from "@/lib/types";
import { useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { getProfileShowcase } from "../../api";

interface HomeProfileListShowcaseProps {
  myProfileId: MyProfileIdType;
  profileShowcase: ProfileShowcaseType;
}

const HomeProfileListShowcase = ({
  myProfileId,
  profileShowcase
}: HomeProfileListShowcaseProps) => {
  const profileShowcasePage = useRecoilValue(profileShowcasePageState);

  const [profileShowcaseList, setProfileShowcaseList] =
    useRecoilState(profileShowcaseState);

  useEffect(() => {
    const fetchProfileShowcase = async () => {
      const res = await getProfileShowcase(profileShowcasePage, 20);
      const data = res.content || [];
      setProfileShowcaseList({
        profiles: data,
        currentPage: res.page || 0,
        totalElements: res.totalElements || 0,
        totalPages: res.totalPages || 0,
        hasNext: res.hasNext,
        isLoading: false
      });
    };
    fetchProfileShowcase();
  }, [JSON.stringify(profileShowcase), profileShowcasePage]);

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

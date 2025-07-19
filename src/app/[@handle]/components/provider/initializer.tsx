"use client";

import { ProfileDraftDataType } from "@/app/profile/[id]/create/types";
import { isMyProfileState, profileViewState } from "@/lib/recoil/handle/atom";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

interface HandleInitializerProps {
  children: React.ReactNode;
  profileData: ProfileDraftDataType;
  isMyProfile: boolean;
}

const HandleInitializer = ({
  children,
  profileData,
  isMyProfile
}: HandleInitializerProps) => {
  const setProfileData = useSetRecoilState(profileViewState);
  const setIsMyProfile = useSetRecoilState(isMyProfileState);

  useLayoutEffect(() => {
    setProfileData(profileData);
    setIsMyProfile(isMyProfile);
  }, []);

  return <>{children}</>;
};

export default HandleInitializer;

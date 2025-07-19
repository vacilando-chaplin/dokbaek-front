"use client";

import { ProfileDraftDataType } from "@/app/profile/[id]/create/types";
import {
  handleNameState,
  isMyProfileState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

interface HandleInitializerProps {
  children: React.ReactNode;
  profileData: ProfileDraftDataType;
  isMyProfile: boolean;
  handleName: string;
}

const HandleInitializer = ({
  children,
  profileData,
  isMyProfile,
  handleName
}: HandleInitializerProps) => {
  const setProfileData = useSetRecoilState(profileViewState);
  const setIsMyProfile = useSetRecoilState(isMyProfileState);
  const setHandleName = useSetRecoilState(handleNameState);

  useLayoutEffect(() => {
    setProfileData(profileData);
    setIsMyProfile(isMyProfile);
    setHandleName(handleName);
  }, []);

  return <>{children}</>;
};

export default HandleInitializer;

"use client";

import { ProfileDraftDataType } from "@/app/profile/[id]/create/types";
import {
  handleNameState,
  isMyProfileState,
  profileFilmoCategoryState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { FilmoCategoryType } from "@/lib/types";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";

interface HandleInitializerProps {
  children: React.ReactNode;
  profileData: ProfileDraftDataType;
  isMyProfile: boolean;
  handleName: string;
  filmoCategories: FilmoCategoryType[];
}

const HandleInitializer = ({
  children,
  profileData,
  isMyProfile,
  handleName,
  filmoCategories
}: HandleInitializerProps) => {
  const setProfileData = useSetRecoilState(profileViewState);
  const setIsMyProfile = useSetRecoilState(isMyProfileState);
  const setHandleName = useSetRecoilState(handleNameState);
  const setFilmoCategoryList = useSetRecoilState(profileFilmoCategoryState);

  useLayoutEffect(() => {
    setProfileData(profileData);
    setIsMyProfile(isMyProfile);
    setHandleName(handleName);
    setFilmoCategoryList(filmoCategories);
  }, []);

  return <>{children}</>;
};

export default HandleInitializer;

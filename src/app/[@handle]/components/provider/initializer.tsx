"use client";

import { ProfileDraftDataType } from "@/app/profile/[id]/create/types";
import {
  filmoViewAllModalState,
  filmoYoutubeModalState,
  handleNameState,
  isMyProfileState,
  mainPhotoCropImageState,
  mainPhotoDeleteModalActiveState,
  mainPhotoImageState,
  mainPhotoModalState,
  photoListSliderState,
  photoOriginModalState,
  profileFilmoCategoryState,
  profileViewState,
  selectedPhotoLabelState,
  specialtyModalState
} from "@/lib/recoil/handle/atom";
import { FilmoCategoryType } from "@/lib/types";
import { useLayoutEffect } from "react";
import { useSetRecoilState } from "recoil";
import { photoOriginModalInit, youtubeModalInit } from "../../data";
import { profilePhotoModalInit } from "@/app/profile/[id]/data";

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

  const setMainPhotoModalState = useSetRecoilState(mainPhotoModalState);
  const setMainPhotoImageState = useSetRecoilState(mainPhotoImageState);
  const setMainPhotoCropImageState = useSetRecoilState(mainPhotoCropImageState);
  const setMainPhotoDeleteModalActiveState = useSetRecoilState(
    mainPhotoDeleteModalActiveState
  );

  const setSpecialtyModalState = useSetRecoilState(specialtyModalState);

  const setSelectedPhotoLabelState = useSetRecoilState(selectedPhotoLabelState);
  const setPhotoListSliderState = useSetRecoilState(photoListSliderState);
  const setPhotoOriginModalState = useSetRecoilState(photoOriginModalState);

  const setFilmoViewAllModalState = useSetRecoilState(filmoViewAllModalState);
  const setFilmoYoutubeModalState = useSetRecoilState(filmoYoutubeModalState);

  useLayoutEffect(() => {
    setProfileData(profileData);
    setIsMyProfile(isMyProfile);
    setHandleName(handleName);
    setFilmoCategoryList(filmoCategories);

    setMainPhotoModalState(profilePhotoModalInit);
    setMainPhotoImageState("");
    setMainPhotoCropImageState("");
    setMainPhotoDeleteModalActiveState(false);

    setSpecialtyModalState(false);

    setSelectedPhotoLabelState("photos");
    setPhotoListSliderState(0);
    setPhotoOriginModalState(photoOriginModalInit);

    setFilmoViewAllModalState(false);
    setFilmoYoutubeModalState(youtubeModalInit);
  }, []);

  return <>{children}</>;
};

export default HandleInitializer;

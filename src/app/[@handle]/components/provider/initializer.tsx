"use client";

import {
  filmoViewAllModalState,
  filmoYoutubeModalState,
  handleNameEditModalState,
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
import { useEffect, useLayoutEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  photoOriginModalInit,
  profilePhotoModalInit,
  youtubeModalInit
} from "../../data";
import { ProfileDraftDataType } from "../../edit/types";
import { getProfileByHandleId } from "../../api";
import { loginState } from "@/lib/atoms";
import { getProfileMe } from "@/lib/api";
import { setLoginProfileId } from "@/lib/utils";

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
  const isLoggedIn = useRecoilValue(loginState);

  const setProfileData = useSetRecoilState(profileViewState);
  const setIsMyProfile = useSetRecoilState(isMyProfileState);
  const setHandleName = useSetRecoilState(handleNameState);
  const setHandleNameEditModal = useSetRecoilState(handleNameEditModalState);
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
    setHandleName(handleName);
    setProfileData(profileData);
    setIsMyProfile(isMyProfile);
    setHandleNameEditModal(false);
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

  useEffect(() => {
    const getCurrentProfile = async () => {
      const res = await getProfileByHandleId(handleName);
      const data = res.data;

      setProfileData(data);
    };
    const getMyProfileId = async () => {
      if (isLoggedIn) {
        const res = await getProfileMe();
        const MyId = res.data.data.id;

        if (MyId) {
          setLoginProfileId("loginProfileId", String(MyId));
        }
      }
    };
    getCurrentProfile();
    getMyProfileId();
  }, []);

  return <>{children}</>;
};

export default HandleInitializer;

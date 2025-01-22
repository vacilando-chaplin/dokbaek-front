"use client";

import {
  convertImageToBase64,
  getFilmoCategories,
  getFilmoRoles,
  getProfile
} from "@/lib/api";
import LinkModal from "@/components/organisms/linkModal";
import {
  categoryData,
  defaultId,
  filmoCategory,
  filmoRole,
  stepperInit
} from "@/lib/atoms";
import { profileInit } from "@/lib/data";
import {
  FilmoCategoryType,
  FilmoResponseType,
  PhotoResponseType
} from "@/lib/types";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import ProfileMain from "./components/profileMain";
import ProfileSub from "./components/profileSub";
import ProfilePhotoModal from "./components/profilePhotoModal";
import ProfileFilmoModal from "./components/profileFilmoModal";
import { profileModalInit, selectedPhotoInit, videoLinkInit } from "./data";

const Profile = () => {
  const userId = useRecoilValue(defaultId);
  const [categoryList, setCategoryList] = useRecoilState(categoryData);
  const [filmoCategoryList, setFilmoCategoryList] =
    useRecoilState(filmoCategory);
  const setFilmoRoleList = useSetRecoilState(filmoRole);
  const setStepper = useSetRecoilState(stepperInit);

  // main, sub 구분선
  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);
  const [linear, setLinear] = useState("sub");

  const [profileData, setProfileData] = useState<any>(profileInit);
  const [mainPhoto, setMainPhoto] = useState("");
  const [selectedPhoto, setSelectedPhoto] = useState(selectedPhotoInit);
  const [profileModal, setProfileModal] = useState(profileModalInit);
  const [videoLink, setVideoLink] = useState(videoLinkInit);

  const onPhotoModalOpen = async (photo: string) => {
    const blurPhoto = await convertImageToBase64(photo);

    setSelectedPhoto({ origin: photo, blur: blurPhoto });
    setProfileModal({ state: "photo", active: true });
  };

  const onPhotoModalClose = () => {
    setProfileModal(profileModalInit);
  };

  const onFilmoModalActive = () => {
    setProfileModal({ state: "filmo", active: !profileModal.active });
  };

  const onFilmoLinkModalOpen = (link: string) => {
    setVideoLink({ url: link, active: true });
  };

  const onLinkModalClose = () => {
    setVideoLink(videoLinkInit);
  };

  useEffect(() => {
    if (mainRef.current && subRef.current) {
      const mainHeight = mainRef.current.offsetHeight;
      const subHeight = subRef.current.offsetHeight;

      mainHeight >= subHeight ? setLinear("main") : setLinear("sub");
    }

    const getProfileData = async () => {
      const res = await getProfile(userId);
      const data = await res.data;

      setProfileData(data);

      const findMainPhoto = data.photos.find(
        (photo: PhotoResponseType) => photo.isDefault === true
      );
      setMainPhoto(findMainPhoto);
    };

    const getFilmoCategoryList = async () => {
      const res = await getFilmoCategories();
      const data = await res.data;
      setFilmoCategoryList(data);
    };

    const getFilmoRoleList = async () => {
      const res = await getFilmoRoles();
      const data = await res.data;
      setFilmoRoleList(data);
    };

    getFilmoCategoryList();
    getFilmoRoleList();
    getProfileData();
  }, []);

  useEffect(() => {
    const filteredCategoryList = filmoCategoryList.filter(
      (category: FilmoCategoryType) =>
        profileData.filmos.findIndex(
          (filmo: FilmoResponseType) =>
            filmo.production.category.name === category.name
        ) >= 0
    );
    const resultCategoryList = filteredCategoryList.map(
      (category: FilmoCategoryType) => category.name
    );
    setCategoryList(resultCategoryList);
  }, [profileData]);

  return (
    <div className="no-scrollbar mt-12 flex h-full w-full flex-row justify-between overflow-hidden">
      <div ref={mainRef} className="flex-[1_1_30%]">
        <ProfileMain
          linear={linear}
          userId={userId}
          mainPhoto={mainPhoto}
          info={profileData.info}
          education={
            profileData.education.length >= 1 ? profileData.education[0] : []
          }
          setStepper={setStepper}
        />
      </div>
      <div ref={subRef} className="flex-[1_1_70%]">
        <ProfileSub
          linear={linear}
          userId={userId}
          photoList={profileData.photos}
          filmographyList={profileData.filmos}
          videoList={profileData.videos}
          setStepper={setStepper}
          onPhotoModalOpen={onPhotoModalOpen}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLinkModalOpen={onFilmoLinkModalOpen}
        />
      </div>
      {profileModal.state === "photo" && profileModal.active && (
        <ProfilePhotoModal
          selectedPhoto={selectedPhoto}
          onPhotoModalClose={onPhotoModalClose}
        />
      )}
      {profileModal.state === "filmo" && profileModal.active && (
        <ProfileFilmoModal
          filmoList={profileData?.filmos}
          categoryList={categoryList}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLinkModalOpen={onFilmoLinkModalOpen}
        />
      )}
      {videoLink.active && (
        <LinkModal link={videoLink.url} onLinkModalClose={onLinkModalClose} />
      )}
    </div>
  );
};

export default Profile;

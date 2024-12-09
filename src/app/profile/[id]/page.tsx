"use client";

import {
  convertImageToBase64,
  getFilmoCategories,
  getFilmoRoles,
  getProfile
} from "@/api/api";
import ProfileFilmographyModal from "@/components/organisms/profileFilmographyModal";
import LinkModal from "@/components/organisms/linkModal";
import ProfileMain from "@/components/organisms/profileMain";
import ProfilePhotoModal from "@/components/organisms/profilePhotoModal";
import ProfileSub from "@/components/organisms/profileSub";
import {
  categoryData,
  defaultId,
  filmoCategory,
  filmoRole,
  jwt,
  stepperInit
} from "@/data/atom";
import { profileInit } from "@/data/data";
import {
  FilmoCategoryType,
  FilmoResponseType,
  PhotoResponseType
} from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Profile = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const [categoryList, setCategoryList] = useRecoilState(categoryData);

  const [filmoCategoryList, setFilmoCategoryList] =
    useRecoilState(filmoCategory);
  const setFilmoRoleList = useSetRecoilState(filmoRole);

  const [profileData, setProfileData] = useState<any>(profileInit);
  const [mainPhoto, setMainPhoto] = useState("");

  const setStepper = useSetRecoilState(stepperInit);

  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const [linear, setLinear] = useState("sub");

  const [selectedPhoto, setSelectedPhoto] = useState("");
  const [selectedPhotoBlur, setSelectedPhotoBlur] = useState("");
  const [photoModalActive, setPhotoModalActive] = useState(false);
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [videoLink, setVideoLink] = useState("");
  const [linkModalActive, setLinkModalActive] = useState(false);

  const onCopyUrl = async () => {
    const copyUrl = window.location.href;
    try {
      alert("링크를 복사 했어요");
      await navigator.clipboard.writeText(copyUrl);
    } catch (error) {
      throw error;
    }
  };

  const onPhotoModalOpen = async (photo: string) => {
    const blurPhoto = await convertImageToBase64(photo);

    setSelectedPhotoBlur(blurPhoto);
    setSelectedPhoto(photo);
    setPhotoModalActive(!photoModalActive);
  };

  const onPhotoModalClose = () => {
    setPhotoModalActive(!photoModalActive);
  };

  const onFilmoModalActive = () => {
    setFilmoModalActive(!filmoModalActive);
  };

  const onFilmoLinkModalOpen = (link: string) => {
    setVideoLink(link);
    setLinkModalActive(!linkModalActive);
  };

  const onLinkModalClose = () => {
    setLinkModalActive(!linkModalActive);
  };

  useEffect(() => {
    if (mainRef.current && subRef.current) {
      const mainHeight = mainRef.current.offsetHeight;
      const subHeight = subRef.current.offsetHeight;

      mainHeight >= subHeight ? setLinear("main") : setLinear("sub");
    }

    const getProfileData = async () => {
      const res = await getProfile(userId, token);
      const data = await res.data;

      setProfileData(data);

      const findMainPhoto = data.photos.find(
        (photo: PhotoResponseType) => photo.isDefault === true
      );
      setMainPhoto(findMainPhoto);
    };

    const getFilmoCategoryList = async () => {
      const res = await getFilmoCategories(token);
      const data = await res.data;
      setFilmoCategoryList(data);
    };

    const getFilmoRoleList = async () => {
      const res = await getFilmoRoles(token);
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
      <ProfileMain
        linear={linear}
        userId={userId}
        mainRef={mainRef}
        mainPhoto={mainPhoto}
        info={profileData?.info}
        education={profileData?.education[0]}
        setStepper={setStepper}
        onCopyUrl={onCopyUrl}
      />
      <ProfileSub
        linear={linear}
        userId={userId}
        subRef={subRef}
        photoList={profileData?.photos}
        filmographyList={profileData?.filmos}
        videoList={profileData?.videos}
        setStepper={setStepper}
        onPhotoModalOpen={onPhotoModalOpen}
        onFilmoModalActive={onFilmoModalActive}
        onFilmoLinkModalOpen={onFilmoLinkModalOpen}
      />
      {photoModalActive && (
        <ProfilePhotoModal
          selectedPhoto={selectedPhoto}
          selectedPhotoBlur={selectedPhotoBlur}
          onPhotoModalClose={onPhotoModalClose}
        />
      )}
      {filmoModalActive && (
        <ProfileFilmographyModal
          filmoList={profileData?.filmos}
          categoryList={categoryList}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLinkModalOpen={onFilmoLinkModalOpen}
        />
      )}
      {linkModalActive && (
        <LinkModal link={videoLink} onLinkModalClose={onLinkModalClose} />
      )}
    </div>
  );
};

export default Profile;

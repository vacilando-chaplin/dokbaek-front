"use client";

import { getProfile } from "@/api/api";
import ProfileFilmographyModal from "@/components/organisms/profileFilmographyModal";
import ProfileLinkModal from "@/components/organisms/profilelinkModal";
import ProfileMain from "@/components/organisms/profileMain";
import ProfilePhotoModal from "@/components/organisms/profilePhotoModal";
import ProfileSub from "@/components/organisms/profileSub";
import { defaultId, jwt, stepperInit } from "@/data/atom";
import { PhotoResponseType } from "@/types/types";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Profile = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const [profileData, setProfileData] = useState<any>();

  console.log(profileData);

  const mainPhotoData = profileData.photos.find(
    (photo: PhotoResponseType) => photo.isDefault === true
  );

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const res = await getProfile(userId, token);
        const data = res.data;
        setProfileData(data);
      } catch (error) {
        throw error;
      }
    };
    getProfileData();
  }, []);

  const setStepper = useSetRecoilState(stepperInit);

  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const [linear, setLinear] = useState("");

  const [selectedPhoto, setSelectedPhoto] = useState<any>({});
  const [photoModalActive, setPhotoModalActive] = useState(false);
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoLink, setFilmoLink] = useState("");
  const [linkModalActive, setLinkModalActive] = useState(false);

  const onPhotoModalOpen = (photo: string) => {
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
    setFilmoLink(link);
    setLinkModalActive(!linkModalActive);
  };

  const onFilmoLinkModalClose = () => {
    setLinkModalActive(!linkModalActive);
  };

  // main, sub 구분선 길이 구하기
  useEffect(() => {
    if (mainRef.current && subRef.current) {
      const mainHeight = mainRef.current.offsetHeight;
      const subHeight = subRef.current.offsetHeight;

      mainHeight >= subHeight ? setLinear("main") : setLinear("sub");
    }
  }, []);

  return (
    <div className="no-scrollbar mt-12 flex h-full w-full flex-row justify-between overflow-hidden">
      <ProfileMain
        linear={linear}
        mainRef={mainRef}
        mainPhoto={mainPhotoData.previewPath}
        info={profileData.info}
        education={profileData.education}
        setStepper={setStepper}
      />
      <ProfileSub
        linear={linear}
        subRef={subRef}
        photoList={profileData.photos}
        filmographyList={profileData.filmos}
        videoList={profileData.videos}
        setStepper={setStepper}
        onPhotoModalOpen={onPhotoModalOpen}
        onFilmoModalActive={onFilmoModalActive}
        onFilmoLinkModalOpen={onFilmoLinkModalOpen}
      />
      {photoModalActive && (
        <ProfilePhotoModal
          selectedPhoto={selectedPhoto.path}
          onPhotoModalClose={onPhotoModalClose}
        />
      )}
      {filmoModalActive && (
        <ProfileFilmographyModal
          filmographyList={profileData.filmos}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLinkModalOpen={onFilmoLinkModalOpen}
        />
      )}
      {linkModalActive && (
        <ProfileLinkModal
          filmoLink={filmoLink}
          onFilmoLinkModalClose={onFilmoLinkModalClose}
        />
      )}
    </div>
  );
};

export default Profile;

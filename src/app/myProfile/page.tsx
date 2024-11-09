"use client";

import ProfileFilmographyModal from "@/components/organisms/profileFilmographyModal";
import ProfileLinkModal from "@/components/organisms/profilelinkModal";
import ProfileMain from "@/components/organisms/profileMain";
import ProfilePhotoModal from "@/components/organisms/profilePhotoModal";
import ProfileSub from "@/components/organisms/profileSub";
import {
  filmography,
  info,
  mainPhoto,
  photo,
  stepperAtom,
  video
} from "@/data/atom";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const myProfile = () => {
  const mainPhotoData = useRecoilValue(mainPhoto);
  const infoData = useRecoilValue(info);
  const photoData = useRecoilValue(photo);
  const filmographyData = useRecoilValue(filmography);
  const videoData = useRecoilValue(video);

  const setStepper = useSetRecoilState(stepperAtom);

  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const [linear, setLinear] = useState("");

  const [photoModalActive, setPhotoModalActive] = useState({
    state: false,
    select: ""
  });
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [filmoLink, setFilmoLink] = useState("");
  const [linkModalActive, setLinkModalActive] = useState(false);

  const onPhotoModalActive = (photo: string) => {
    photo
      ? setPhotoModalActive({
          ...photoModalActive,
          state: !photoModalActive.state,
          select: photo
        })
      : setPhotoModalActive({
          ...photoModalActive,
          state: !photoModalActive.state,
          select: ""
        });
  };

  const onFilmoModalActive = () => {
    setFilmoModalActive(!filmoModalActive);
  };

  const onFilmoLink = (link: string) => {
    setFilmoLink(link);
    setLinkModalActive(!linkModalActive);
  };

  const onLinkModalActive = () => {
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
        mainPhoto={mainPhotoData}
        info={infoData}
        setStepper={setStepper}
      />
      <ProfileSub
        linear={linear}
        subRef={subRef}
        mainPhotoData={mainPhotoData}
        photo={photoData}
        filmography={filmographyData}
        video={videoData}
        setStepper={setStepper}
        onPhotoModalActive={onPhotoModalActive}
        onFilmoModalActive={onFilmoModalActive}
        onFilmoLink={onFilmoLink}
      />
      {photoModalActive.state && (
        <ProfilePhotoModal
          select={photoModalActive.select}
          onPhotoModalActive={onPhotoModalActive}
        />
      )}
      {filmoModalActive && (
        <ProfileFilmographyModal
          filmography={filmographyData}
          onFilmoModalActive={onFilmoModalActive}
          onFilmoLink={onFilmoLink}
        />
      )}
      {linkModalActive && (
        <ProfileLinkModal
          filmoLink={filmoLink}
          onLinkModalActive={onLinkModalActive}
        />
      )}
    </div>
  );
};

export default myProfile;

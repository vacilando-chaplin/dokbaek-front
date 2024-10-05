"use client";

import ProfileFilmographyModal from "@/components/organisms/profileFilmographyModal";
import ProfileLinkModal from "@/components/organisms/profilelinkModal";
import ProfileMain from "@/components/organisms/profileMain";
import ProfilePhotoModal from "@/components/organisms/profilePhotoModal";
import ProfileSub from "@/components/organisms/profileSub";
import { filmography, info, photo, stepperAtom } from "@/data/atom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const myProfile = () => {
  const infoData = useRecoilValue(info);
  const photoData = useRecoilValue(photo);
  const filmographyData = useRecoilValue(filmography);

  const setStepper = useSetRecoilState(stepperAtom);

  const [photoModalActive, setPhotoModalActive] = useState({
    state: false,
    select: ""
  });
  const [filmoModalActive, setFilmoModalActive] = useState(false);
  const [linkModalActive, setLinkModalActive] = useState({
    state: false,
    link: ""
  });

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

  const onLinkModalActive = (link: string) => {
    link
      ? setLinkModalActive({
          ...linkModalActive,
          state: !linkModalActive.state,
          link: link.slice(32, 43)
        })
      : setLinkModalActive({
          ...linkModalActive,
          state: !linkModalActive.state,
          link: ""
        });
  };

  return (
    <div className="no-scrollbar no-scrollbar mt-12 flex h-full w-full flex-row justify-between overflow-hidden">
      <ProfileMain info={infoData} setStepper={setStepper} />
      <ProfileSub
        photo={photoData}
        filmography={filmographyData}
        setStepper={setStepper}
        onPhotoModalActive={onPhotoModalActive}
        onFilmoModalActive={onFilmoModalActive}
        onLinkModalActive={onLinkModalActive}
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
        />
      )}
      {linkModalActive.state && (
        <ProfileLinkModal
          link={linkModalActive.link}
          onLinkModalActive={onLinkModalActive}
        />
      )}
    </div>
  );
};

export default myProfile;

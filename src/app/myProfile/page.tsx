"use client";

import FilmographyListModal from "@/components/organisms/filmographyListModal";
import ProfileMain from "@/components/organisms/profileMain";
import ProfileSub from "@/components/organisms/profileSub";
import { profile, stepperAtom } from "@/data/atom";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const myProfile = () => {
  const data = useRecoilValue(profile);

  const setStepper = useSetRecoilState(stepperAtom);

  const [filmoModalActive, setFilmoModalActive] = useState(false);

  const onFilmoModalActive = () => {
    setFilmoModalActive(!filmoModalActive);
  };

  return (
    <div className="mt-12 flex h-full w-full flex-row justify-between">
      <div className="border-r-[1px] border-border-default-light">
        <ProfileMain info={data.info} />
      </div>
      <ProfileSub
        photo={data.photo}
        filmography={data.filmography}
        setStepper={setStepper}
        onFilmoModalActive={onFilmoModalActive}
      />
      {filmoModalActive && (
        <FilmographyListModal
          filmography={data.filmography}
          onFilmoModalActive={onFilmoModalActive}
        />
      )}
    </div>
  );
};

export default myProfile;

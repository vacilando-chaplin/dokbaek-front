"use client";

import {
  profileViewState,
  specialtyModalState
} from "@/lib/recoil/handle/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ProfileInfoFrame from "../container/profileInfoFrame";
import ChipItem from "@/components/atoms/chipItem";

const Specialty = () => {
  const profileData = useRecoilValue(profileViewState);
  const setModalState = useSetRecoilState(specialtyModalState);

  const specialties = profileData?.specialties || [];

  const onSpecialtyModalOpen = () => {
    setModalState((prev) => !prev);
  };

  return (
    specialties.length >= 1 && (
      <ProfileInfoFrame title="특기">
        <div className="flex flex-row gap-1">
          {specialties.map((specialty) => {
            return (
              <ChipItem key={specialty.id} onClick={onSpecialtyModalOpen}>
                <span>{specialty.specialty.specialtyName}</span>
              </ChipItem>
            );
          })}
        </div>
      </ProfileInfoFrame>
    )
  );
};

export default Specialty;

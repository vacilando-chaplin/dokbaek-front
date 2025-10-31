"use client";

import {
  profileViewState,
  specialtyItemIdState,
  specialtyModalState
} from "@/lib/recoil/handle/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ProfileInfoFrame from "../container/profileInfoFrame";

const Specialty = () => {
  const profileData = useRecoilValue(profileViewState);
  const setModalState = useSetRecoilState(specialtyModalState);
  const setSpecialtyId = useSetRecoilState(specialtyItemIdState);

  const specialties = profileData?.specialties || [];

  const onSpecialtyModalOpen = (specialtyId: number) => {
    setSpecialtyId(specialtyId);
    setModalState((prev) => !prev);
  };

  return (
    specialties.length >= 1 && (
      <ProfileInfoFrame title="특기">
        <div className="flex flex-row flex-wrap gap-1">
          {specialties.map((specialty) => {
            return (
              <button
                key={specialty.id}
                type="button"
                onClick={() => onSpecialtyModalOpen(specialty.specialty.id)}
                className="interaction-default flex h-auto w-auto items-center gap-0.5 rounded-lg bg-accent-light-light px-2 py-[5px] hover:bg-[#1E85EF26] active:bg-[#1E85EF33] dark:bg-accent-light-dark"
              >
                <span className="typography-body3 text-nowrap font-normal text-accent-primary-light dark:text-accent-primary-dark">
                  {specialty.specialty.specialtyName}
                </span>
              </button>
            );
          })}
        </div>
      </ProfileInfoFrame>
    )
  );
};

export default Specialty;

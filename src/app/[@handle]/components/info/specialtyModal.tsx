"use client";

import ModalHeader from "@/components/molecules/modalHeader";
import {
  profileViewState,
  specialtyModalState
} from "@/lib/recoil/handle/atom";
import { useRecoilState, useRecoilValue } from "recoil";
import SpecialtyModalItem from "./specialtyModalItem";

const SpecialtyModal = () => {
  const profileData = useRecoilValue(profileViewState);
  const [modalState, setModalState] = useRecoilState(specialtyModalState);

  const specialties = profileData?.specialties ?? [];

  const onSpecialtyModalClose = () => {
    setModalState((prev) => !prev);
  };

  return (
    modalState && (
      <section className="fixed inset-0 z-[49] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div className="interaction-default relative flex h-auto w-[480px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader name="특기" onClick={onSpecialtyModalClose} />
          <div className="flex h-auto w-full flex-col gap-1 rounded-b-3xl p-6">
            {specialties.map((specialty) => {
              return (
                <SpecialtyModalItem key={specialty.id} specialty={specialty} />
              );
            })}
          </div>
        </div>
      </section>
    )
  );
};

export default SpecialtyModal;

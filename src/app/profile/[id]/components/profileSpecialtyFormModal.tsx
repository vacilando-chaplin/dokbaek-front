import React from "react";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import ProfileSpecialtyEditor from "@/app/profile/[id]/components/profileSpecialtyEditor";
import { SpecialtyType } from "../create/info/types";

interface ProfileSpecialtyFormModalProps {
  type: "add" | "edit";
  specialties: SpecialtyType[];
  setSpecialties: (specialty: SpecialtyType[]) => void;
  setSearchSpecialty: (specialty: SpecialtyType[]) => void;
  searchSpecialty: SpecialtyType[];
  specialty: SpecialtyType;
  onSpecialtyFormModalClose: React.MouseEventHandler<HTMLButtonElement>;
  onAddSpecialty: (newSpecialty: string) => void;
  onSpecialtyDropdownClick: (name: string, item: string) => void;
  onSpecialtyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteSpecialty: (specialtyId: number) => () => void;
  onSaveSpecialty: () => void;
}

const ProfileSpecialtyFormModal = ({
  type,
  specialties,
  setSpecialties,
  specialty,
  setSearchSpecialty,
  searchSpecialty,
  onAddSpecialty,
  onSpecialtyDropdownClick,
  onSpecialtyChange,
  onDeleteSpecialty,
  onSpecialtyFormModalClose,
  onSaveSpecialty
}: ProfileSpecialtyFormModalProps) => {
  const modalTitle = type === "add" ? "특기 추가" : "특기 추가/수정";

  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0 dark:bg-background-scrim-dark">
      <div className="interaction-default relative flex h-auto w-full max-w-[480px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
        <ModalHeader name={modalTitle} onClick={onSpecialtyFormModalClose} />
        <div className="w-full p-6">
          <ProfileSpecialtyEditor
            specialties={specialties}
            setSpecialties={setSpecialties}
            setSearchSpecialty={setSearchSpecialty}
            searchSpecialty={searchSpecialty}
            specialty={specialty}
            onAddSpecialty={onAddSpecialty}
            onSpecialtyDropdownClick={onSpecialtyDropdownClick}
            onSpecialtyChange={onSpecialtyChange}
            onDeleteSpecialty={onDeleteSpecialty}
          />
        </div>
        <ModalFooter
          text="완료"
          onCloseClick={onSpecialtyFormModalClose}
          onSaveClick={onSaveSpecialty}
        />
      </div>
    </section>
  );
};

export default ProfileSpecialtyFormModal;

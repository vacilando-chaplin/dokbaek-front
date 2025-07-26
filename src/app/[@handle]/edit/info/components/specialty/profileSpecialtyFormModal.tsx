"use client";

import React, { useState } from "react";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import ProfileSpecialtyEditor from "@/app/[@handle]/edit/info/components/specialty/profileSpecialtyEditor";
import { useRecoilState } from "recoil";
import {
  profileSpecialtyModalState,
  specialtyData
} from "@/lib/recoil/handle/edit/info/atom";
import { postSpecialty, postUserProfileSpecialty } from "../../api";
import { SpecialtyType } from "../../types";

interface ProfileSpecialtyFormModalProps {
  type: "add" | "edit";
  profileId: number;
}

const ProfileSpecialtyFormModal = ({
  type,
  profileId
}: ProfileSpecialtyFormModalProps) => {
  const modalTitle = type === "add" ? "특기 추가" : "특기 추가/수정";

  const [specialties, setSpecialties] =
    useRecoilState<SpecialtyType[]>(specialtyData);
  const [searchSpecialty, setSearchSpecialty] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState<SpecialtyType>({
    id: 0,
    specialtyName: "",
    imageUrl: "",
    mediaUrl: ""
  });

  const [profileSpecialtyModal, setProfileSpecialtyModal] = useRecoilState(
    profileSpecialtyModalState
  );

  const onSpecialtyFormModalClose = () => {
    setProfileSpecialtyModal(false);
  };

  const onAddSpecialty = async (newSpecialty: string) => {
    const res = await postSpecialty(newSpecialty);
    const data = {
      id: res.data.id,
      specialtyName: res.data.specialtyName,
      imageUrl: "",
      mediaUrl: ""
    };
    setSpecialties((prev) => [...prev, data]);
    setSpecialty({ id: 0, specialtyName: "", imageUrl: "", mediaUrl: "" });
    setProfileSpecialtyModal(true);
  };
  const onSaveSpecialty = async () => {
    setSpecialties(specialties);
    onSpecialtyFormModalClose();

    if (specialties && specialties.length > 0) {
      for (const specialty of specialties) {
        const specialtyId = specialty.id;
        const mediaUrl = specialty.mediaUrl ?? "";
        await postUserProfileSpecialty(profileId, specialtyId, mediaUrl);
      }
    }
  };

  const onSpecialtyDropdownClick = (name: string, item: string) => {
    const selectedSpecialty = searchSpecialty.find(
      (specialty) => specialty.specialtyName === item
    );
    if (
      selectedSpecialty &&
      !specialties.some((specialty) => specialty.specialtyName === item)
    ) {
      const data = {
        id: selectedSpecialty.id,
        specialtyName: selectedSpecialty.specialtyName,
        imageUrl: "",
        mediaUrl: ""
      };
      setSpecialties((prev) => [...prev, data]);
      setSpecialty({ id: 0, specialtyName: "", imageUrl: "", mediaUrl: "" });
    }
  };

  const onSpecialtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSpecialty({ ...specialty, specialtyName: value });
  };

  const onDeleteSpecialty = (specialtyId: number) => {
    return () => {
      setSpecialties((prev) =>
        prev.filter((specialty) => specialty.id !== specialtyId)
      );
    };
  };

  return (
    <>
      {profileSpecialtyModal && (
        <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
          <div className="interaction-default relative flex h-auto w-full max-w-[480px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
            <ModalHeader
              name={modalTitle}
              onClick={onSpecialtyFormModalClose}
            />
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
      )}
    </>
  );
};

export default ProfileSpecialtyFormModal;

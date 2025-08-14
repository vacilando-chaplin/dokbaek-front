"use client";

import React, { useState } from "react";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import ProfileSpecialtyEditor from "@/app/[@handle]/edit/info/components/specialty/profileSpecialtyEditor";
import { useRecoilState } from "recoil";
import {
  profileSpecialtyModalState,
  specialtyData,
  specialtyDeleteIds
} from "@/lib/recoil/handle/edit/info/atom";
import {
  deleteSpecialty,
  postDraftSpecialty,
  postSpecialty,
  postSpecialtyImage,
  putSpecialtyMediaUrl
} from "../../api";
import { SpecialtyType } from "../../types";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";

interface ProfileSpecialtyFormModalProps {
  profileId: number;
}

const ProfileSpecialtyFormModal = ({
  profileId
}: ProfileSpecialtyFormModalProps) => {
  const [specialties, setSpecialties] =
    useRecoilState<SpecialtyType[]>(specialtyData);
  const [profileData, setProfileData] = useRecoilState(profileDraftData);
  const [profileSpecialtyModal, setProfileSpecialtyModal] = useRecoilState(
    profileSpecialtyModalState
  );
  const [specialtyDeleteIdList, setSpecialtyDeleteIdList] =
    useRecoilState(specialtyDeleteIds);

  const [searchSpecialty, setSearchSpecialty] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState<SpecialtyType>({
    id: 0,
    specialtyName: "",
    imageUrl: "",
    mediaUrl: ""
  });

  const onSpecialtyFormModalClose = () => {
    setSpecialties([]);
    setSpecialtyDeleteIdList([]);
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
    const newSpecialties: any = [];
    const deletedIds: number[] = [];

    for (const specialtyId of specialtyDeleteIdList) {
      await deleteSpecialty(profileId, specialtyId);
      deletedIds.push(specialtyId);
    }

    if (deletedIds.length > 0) {
      setProfileData((prev) => ({
        ...prev,
        specialties: prev.specialties.filter(
          (specialty) => !deletedIds.includes(specialty.id)
        )
      }));
    }

    for (const specialty of specialties) {
      const specialtyId = specialty.id;
      const mediaUrl = specialty.mediaUrl ?? "";
      const imageUrl = specialty.imageUrl ?? null;

      const existingSpecialty = profileData.specialties.find(
        (existing) =>
          existing.id === specialtyId && !deletedIds.includes(specialtyId)
      );

      // 기존에 없던 특기 일 경우
      if (!existingSpecialty) {
        const res = await postDraftSpecialty(profileId, specialtyId, mediaUrl);

        if (imageUrl) {
          const imageRes = await postSpecialtyImage(
            profileId,
            res.id,
            imageUrl
          );
          newSpecialties.push(imageRes);
        } else {
          newSpecialties.push(res);
        }
      } else {
        // 기존에 있던 특기에서 이미지를 추가하는 경우
        if (!existingSpecialty.imageUrl && imageUrl) {
          const imageRes = await postSpecialtyImage(
            profileId,
            specialtyId,
            imageUrl
          );

          setProfileData((prev) => ({
            ...prev,
            specialties: prev.specialties.map((item) =>
              item.id === existingSpecialty.id
                ? { ...item, imageUrl: imageRes.imageUrl }
                : item
            )
          }));
        }

        // 기존 특기에서 이미지를 삭제 했을 때 deleteSpecialtyImage 추가 되어야 함
        // else if (existingSpecialty.imageUrl && !imageUrl) {
        //   delete
        // }

        // 기존에 있던 특기에서 영상이 변경된 경우
        if (existingSpecialty.mediaUrl !== mediaUrl) {
          const res = await putSpecialtyMediaUrl(
            profileId,
            specialtyId,
            mediaUrl
          );

          setProfileData((prev) => ({
            ...prev,
            specialties: prev.specialties.map((item) =>
              item.id === existingSpecialty.id
                ? { ...item, mediaUrl: res.mediaUrl }
                : item
            )
          }));
        }
      }
    }

    // 추가된 특기가 있을 경우 특기 추가
    if (newSpecialties.length > 0) {
      setProfileData((prev) => ({
        ...prev,
        specialties: [...prev.specialties, ...newSpecialties]
      }));
    }

    setSpecialties([]);
    setSpecialtyDeleteIdList([]);
    onSpecialtyFormModalClose();
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
    const { value } = e.target;
    setSpecialty({ ...specialty, specialtyName: value });
  };

  const onDeleteSpecialty = (specialtyId: number) => {
    setSpecialtyDeleteIdList((prev) => [...prev, specialtyId]);
    setSpecialties((prev) =>
      prev.filter((specialty) => specialty.id !== specialtyId)
    );
  };

  return (
    profileSpecialtyModal && (
      <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div className="interaction-default relative flex h-auto w-full max-w-[480px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader
            name={
              profileData.specialties.length >= 1
                ? "특기 추가/수정"
                : "특기 추가"
            }
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
    )
  );
};

export default ProfileSpecialtyFormModal;

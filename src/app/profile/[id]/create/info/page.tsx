"use client";

import { completionProgress } from "@/lib/atoms";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { SpecialtyType } from "./types";
import { specialtyData } from "../../../../../lib/atoms";
import ProfileSpecialtyFormModal from "../../components/profileSpecialtyFormModal";
import PersonalInfo from "./components/personalInfo";
import { cookies } from "next/headers";
import Cookies from "js-cookie";
import Introduction from "./components/introduction";
import Education from "./components/education";
import { postSpecialty, postUserProfileSpecialty } from "./api";

const Info = () => {
  // const profileId = Number(cookies().get("loginProfileId")?.value);
  const profileId = Number(Cookies.get("loginProfileId"));

  const [completion, setCompletion] = useRecoilState(completionProgress);

  const [specialties, setSpecialties] =
    useRecoilState<SpecialtyType[]>(specialtyData);
  const [searchSpecialty, setSearchSpecialty] = useState<any[]>([]);
  const [specialty, setSpecialty] = useState<SpecialtyType>({
    id: 0,
    specialtyName: "",
    imageUrl: "",
    mediaUrl: ""
  });

  const [profileSpecialtyModal, setProfileSpecialtyModal] = useState(false);

  const onSpecialtyFormModalClose = () => {
    setProfileSpecialtyModal(false);
  };

  const onSpecialtyFormModalOpen = async () => {
    setProfileSpecialtyModal(true);
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
    setCompletion({ ...completion, specialty: true });
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
      if (specialties.length === 0) {
        setCompletion({ ...completion, specialty: false });
      }
    };
  };

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <PersonalInfo
        profileId={profileId}
        specialties={specialties}
        onSpecialtyFormModalOpen={onSpecialtyFormModalOpen}
        onDeleteSpecialty={onDeleteSpecialty}
      />
      <Education profileId={profileId} />
      <Introduction profileId={profileId} />
      {profileSpecialtyModal && (
        <ProfileSpecialtyFormModal
          type="add"
          specialties={specialties}
          setSpecialties={setSpecialties}
          searchSpecialty={searchSpecialty}
          setSearchSpecialty={setSearchSpecialty}
          specialty={specialty}
          onSpecialtyFormModalClose={onSpecialtyFormModalClose}
          onAddSpecialty={onAddSpecialty}
          onSpecialtyDropdownClick={onSpecialtyDropdownClick}
          onSpecialtyChange={onSpecialtyChange}
          onDeleteSpecialty={onDeleteSpecialty}
          onSaveSpecialty={onSaveSpecialty}
        />
      )}
    </div>
  );
};

export default Info;

"use client";

import Title from "@/components/atoms/title";
import Plus from "../../../../../../../public/icons/Plus.svg";
import EducationForm from "./educationForm";
import { useRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { deleteEducation, postEducation, putEducation } from "../api";
import { ProfileEducationDataType } from "../../types";

interface EducationProps {
  profileId: number;
}

const Education = ({ profileId }: EducationProps) => {
  const [profileData, setProfileData] = useRecoilState(profileDraftData);

  const { education } = profileData;

  // 학력 1개 생성
  const onCreateEducation = async () => {
    const educationData = {
      school: {
        name: "",
        schoolType: "",
        schoolGubun: ""
      },
      major: "",
      status: "GRADUATED"
    };
    const res = await postEducation(profileId, educationData);
    const data = res.data;

    const educationInit = {
      id: data.id,
      school: {
        name: data.school.name,
        schoolType: data.school.schoolType,
        schoolGubun: data.school.schoolGubun
      },
      major: data.major,
      status: "GRADUATED"
    };

    setProfileData((prev) => ({
      ...prev,
      education: [...prev.education, educationInit]
    }));
  };

  // 학력 1개 삭제
  const onDeleteEducation = async (educationId: number) => {
    await deleteEducation(profileId, educationId);

    const updateEducation = profileData.education.filter(
      (edu) => edu.id !== educationId
    );
    setProfileData((prev) => ({
      ...prev,
      education: updateEducation
    }));
  };

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <div className="flex flex-row items-center justify-between">
        <Title name="학력" />
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center gap-2.5 rounded-lg"
          disabled={education && education.length >= 5}
          onClick={onCreateEducation}
        >
          <Plus
            width="16"
            height="16"
            className={`fill-current ${education && education.length >= 5 ? "text-content-disabled-light dark:text-content-disabled-dark" : "text-content-primary-light dark:text-content-primary-dark"}`}
          />
        </button>
      </div>
      {education &&
        education.length >= 1 &&
        education.map((item: ProfileEducationDataType) => {
          return (
            <EducationForm
              key={item.id}
              item={item}
              profileId={profileId}
              onDelete={() => onDeleteEducation(item.id)}
            />
          );
        })}
    </section>
  );
};

export default Education;

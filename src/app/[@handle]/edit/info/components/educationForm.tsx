"use client";

import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import SearchDropdown from "@/components/molecules/searchDropdown";
import SelectDropdown from "@/components/molecules/selectDropdown";
import X from "../../../../../../../public/icons/X.svg";
import { SchoolType } from "../types";
import { educationEngList, educationList } from "@/lib/data";
import { ProfileEducationDataType } from "../../types";
import { useDebounce } from "@/lib/hooks";
import { useEffect, useState } from "react";
import { getSchoolName, putEducation } from "../api";
import { useRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";

interface EducationFormProps {
  item: ProfileEducationDataType;
  profileId: number;
  onDelete: () => void;
}

const EducationForm = ({ item, profileId, onDelete }: EducationFormProps) => {
  const [profileData, setProfileData] = useRecoilState(profileDraftData);
  const [schoolList, setSchoolList] = useState<string[]>([]);
  const [dropdownActive, setDropdownActive] = useState({
    schoolName: false,
    status: false
  });

  const statusName =
    educationList[
      educationEngList.findIndex((status) => status === item.status)
    ];

  // 학력 입력 완료 후 또는 드랍다운 클릭 시 PUT
  const onSaveEducation = async (
    updateEducation: ProfileEducationDataType[]
  ) => {
    const findEducation = updateEducation.find((edu) => edu.id === item.id);

    if (!findEducation) {
      return;
    }

    const educationData = {
      school: {
        name: findEducation.school.name,
        schoolType: findEducation.school.schoolType,
        schoolGubun: findEducation.school.schoolGubun
      },
      major: findEducation.major,
      status: findEducation.status
    };
    await putEducation(profileId, item.id, educationData);
  };

  // 학교 검색
  const onSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const updateEducation = profileData.education.map((edu) => {
      return edu.id === item.id
        ? { ...edu, school: { ...edu.school, name: value } }
        : edu;
    });

    setProfileData((prev) => ({
      ...prev,
      education: updateEducation
    }));

    if (value && !dropdownActive.schoolName) {
      setDropdownActive({ ...dropdownActive, schoolName: true });
    }
  };

  // 학교 이름 드랍다운 액티브
  const onSchoolDropdownActive = () => {
    setDropdownActive((prev) => ({
      ...prev,
      schoolName: !prev.schoolName
    }));
  };

  // 학교 이름 드랍다운 요소 클릭
  const onSchoolDropdownClick = async (name: string, value: string) => {
    const updateEducation = profileData.education.map((edu) => {
      return edu.id === item.id
        ? { ...edu, school: { ...edu.school, name: value } }
        : edu;
    });

    setProfileData((prev) => ({
      ...prev,
      education: updateEducation
    }));

    await onSaveEducation(updateEducation);
    setDropdownActive({ ...dropdownActive, schoolName: false });
  };

  // 전공 입력
  const onMajorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    const updateEducation = profileData.education.map((edu) => {
      return edu.id === item.id ? { ...edu, major: value } : edu;
    });

    setProfileData((prev) => ({
      ...prev,
      education: updateEducation
    }));
  };

  // 학교 졸업 여부 드랍다운 액티브
  const onStatusDropdownActive = () => {
    setDropdownActive((prev) => ({
      ...prev,
      status: !prev.status
    }));
  };

  // 학교 졸업 여부 드랍다운 요소 클릭
  const onStatusDropdownClick = async (name: string, value: string) => {
    const findStatus = educationList.findIndex((status) => status === value);

    const updateEducation = profileData.education.map((edu) => {
      return edu.id === item.id
        ? { ...edu, status: educationEngList[findStatus] }
        : edu;
    });
    setProfileData((prev) => ({
      ...prev,
      education: updateEducation
    }));

    await onSaveEducation(updateEducation);
    setDropdownActive({ ...dropdownActive, status: false });
  };

  // 학교 검색 api 딜레이 0.3ms, 한번에 보여지는 요소 최대 10개
  const debounceSearch: string = useDebounce(item.school.name, 300);

  useEffect(() => {
    const getSearchSchool = async (name: string) => {
      const data = await getSchoolName(name);
      const filteredSchoolName = data.map(
        (school: SchoolType) => school.schoolName
      );
      setSchoolList(filteredSchoolName);
    };
    getSearchSchool(debounceSearch);
  }, [debounceSearch]);

  return (
    <div className="flex h-auto w-full flex-col gap-4 rounded-lg border border-border-default-light bg-background-surface-light p-6 dark:border-border-default-dark dark:bg-background-surface-dark">
      <div className="flex h-auto w-full items-center justify-between">
        <div className="flex flex-row items-center justify-center gap-1.5">
          <label className="typography-body2 font-semibold text-content-primary-light dark:text-content-primary-dark">
            학교 정보
          </label>
        </div>
        <button
          type="button"
          className="flex h-5 w-5 items-center justify-center rounded-md border border-border-default-light bg-background-surface-light p-1 dark:border-border-default-dark dark:bg-background-surface-dark"
          onClick={onDelete}
        >
          <X
            width="12"
            height="12"
            className="fill-current text-state-negative-light dark:text-state-negative-dark"
          />
        </button>
      </div>
      <div className="flex h-auto w-full flex-col">
        <Label label="학교 이름" />
        <SearchDropdown
          size="medium"
          name="name"
          list={schoolList}
          value={item.school.name ?? ""}
          active={dropdownActive.schoolName}
          selected={item.school.name}
          isEmpty={dropdownActive.schoolName && schoolList?.length === 0}
          maxLength={20}
          placeholder="학교 이름을 검색해보세요."
          onClick={onSchoolDropdownClick}
          onActive={onSchoolDropdownActive}
          onChange={onSchoolChange}
          onSave={() => onSaveEducation(profileData.education)}
        />
      </div>
      <div className="flex h-auto w-full flex-col">
        <Label label="전공" />
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-[1_1_75%]">
            <TextInput
              type="text"
              size="medium"
              name="major"
              value={item.major ?? ""}
              maxLength={20}
              onChange={onMajorChange}
              onBlur={() => onSaveEducation(profileData.education)}
            />
          </div>
          <div className="flex flex-[1_1_25%]">
            <SelectDropdown
              name="education"
              list={educationList}
              size="medium"
              value={statusName ?? "졸업"}
              active={dropdownActive.status}
              selected={statusName}
              onClick={onStatusDropdownClick}
              onActive={onStatusDropdownActive}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationForm;

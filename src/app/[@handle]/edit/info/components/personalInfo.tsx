"use client";

import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import Title from "@/components/atoms/title";
import SearchDropdown from "@/components/molecules/searchDropdown";
import { yearList } from "@/lib/data";
import { SpecialtyItemType, SpecialtyType } from "../types";
import BoxButton from "@/components/atoms/boxButton";
import Plus from "../../../../../../public/icons/Plus.svg";
import Chips from "@/components/atoms/chips";
import { useRecoilState, useSetRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { contactFormat, setOnlyNumber } from "@/lib/utils";
import { ProfileInfoDataType } from "../../types";
import { deleteSpecialty, putInfoDraft } from "../api";
import {
  profileSpecialtyModalState,
  specialtyData
} from "@/lib/recoil/handle/edit/info/atom";

interface PersonalInfoProps {
  profileId: number;
}

const PersonalInfo = ({ profileId }: PersonalInfoProps) => {
  const [profileData, setProfileData] = useRecoilState(profileDraftData);
  const setSpecialties = useSetRecoilState<SpecialtyType[]>(specialtyData);
  const setProfileSpecialtyModal = useSetRecoilState(
    profileSpecialtyModalState
  );
  const [dropdownActive, setDropdownActive] = useState(false);

  const {
    name,
    bornYear,
    gender,
    height,
    weight,
    contact,
    email,
    instagramLink,
    youtubeLink
  } = profileData?.info ?? {};

  const { mutate } = useMutation({
    mutationFn: (newInfo: ProfileInfoDataType) =>
      putInfoDraft(profileId, newInfo)
  });

  // 기본 정보 저장
  const onSaveInfo = () => {
    mutate(profileData.info);
  };

  // 문자열, 숫자 상관없는 입력
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setProfileData((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [name]:
          name === "name"
            ? value.replace(
                /[A-Z\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g,
                ""
              )
            : value
      }
    }));
  };

  // 출생연도 입력(숫자만 입력 가능하게)
  const onBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setProfileData((prev) => ({
      ...prev,
      info: {
        ...prev.info,
        [name]: changeNumber
      }
    }));
    if (value && !dropdownActive) {
      setDropdownActive(true);
    } else if (value.length === 4 || (value.length === 0 && dropdownActive)) {
      setDropdownActive(false);
    }
  };

  // 키, 몸무게 입력(숫자만 입력 가능하게)
  const onNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setProfileData((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: changeNumber }
    }));
  };

  // 전화번호 입력(전화번호 포맷으로 변경)
  const onContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const inputContact = contactFormat(value);
    setProfileData((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: inputContact }
    }));
  };

  // 드랍다운 액티브
  const onDropdownActive = () => {
    setDropdownActive(!dropdownActive);
  };

  // 드랍다운 아이템 클릭
  const onDropdownClick = (name: string, item: string) => {
    const updatedInfo = {
      ...profileData.info,
      [name]: item
    };

    setProfileData((prev) => ({
      ...prev,
      info: { ...prev.info, [name]: item }
    }));
    mutate(updatedInfo);
  };

  // 성별 선택
  const onSelectGender = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedGender = e.target.id;

    const updatedInfo = {
      ...profileData.info,
      gender: selectedGender
    };

    setProfileData((prev) => ({
      ...prev,
      info: { ...prev.info, gender: selectedGender }
    }));
    mutate(updatedInfo);
  };

  const onSpecialtyFormModalOpen = () => {
    if (profileData.specialties.length >= 1) {
      const currnetSpecialties = profileData.specialties.map(
        (specialty: SpecialtyItemType) => {
          return {
            id: specialty.id,
            specialtyId: specialty.specialty.id,
            specialtyName: specialty.specialty.specialtyName,
            imageUrl: specialty.imageUrl ?? "",
            mediaUrl: specialty.mediaUrl ?? ""
          };
        }
      );

      setSpecialties(currnetSpecialties);
    }
    setProfileSpecialtyModal(true);
  };

  const onDeleteSpecialty = async (specialtyId: number) => {
    await deleteSpecialty(profileId, specialtyId);
    setProfileData((prev) => ({
      ...prev,
      specialties: prev.specialties.filter(
        (specialty) => specialty.id !== specialtyId
      )
    }));
  };

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <Title name="기본 정보" />
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="이름" required />
            <TextInput
              type="text"
              size="medium"
              name="name"
              value={name ?? ""}
              maxLength={10}
              placeholder="이름을 입력해주세요."
              onChange={onInputChange}
              onBlur={onSaveInfo}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="출생연도" required />
            <SearchDropdown
              size="medium"
              name="bornYear"
              list={yearList}
              value={bornYear ?? ""}
              active={dropdownActive}
              selected={bornYear}
              maxLength={4}
              placeholder="출생연도를 선택해주세요."
              onClick={onDropdownClick}
              onActive={onDropdownActive}
              onChange={onBirthChange}
              onSave={onSaveInfo}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="성별" required />
            <div className="typography-body2 flex h-10 w-full flex-row items-center gap-4 rounded-xl border border-border-default-light bg-background-surface-light px-4 font-normal text-content-primary-light dark:border-border-default-dark dark:bg-background-surface-dark dark:text-content-primary-dark">
              <div className="flex h-auto w-auto flex-row gap-2">
                <input
                  type="radio"
                  id="F"
                  name="customRadio"
                  checked={gender === "F"}
                  className="peer hidden"
                  onChange={onSelectGender}
                />
                <label
                  htmlFor="F"
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <span
                    className={`interaction-default flex h-4 w-4 items-center justify-center rounded-full ${gender === "F" ? "border-[4px] border-accent-primary-light dark:border-accent-primary-dark" : "border-[1.5px] border-border-default-light hover:border-[2.5px] hover:border-accent-primary-light dark:border-border-default-dark dark:hover:border-accent-primary-dark"}`}
                  >
                    <span className="bg-white hidden h-2.5 w-2.5 rounded-full peer-checked:block"></span>
                  </span>
                  <span>여성</span>
                </label>
              </div>
              <div className="flex h-auto w-auto flex-row gap-2">
                <input
                  type="radio"
                  id="M"
                  name="customRadio"
                  checked={gender === "M"}
                  className="peer hidden"
                  onChange={onSelectGender}
                />
                <label
                  htmlFor="M"
                  className="flex cursor-pointer items-center space-x-2"
                >
                  <span
                    className={`interaction-default flex h-4 w-4 items-center justify-center rounded-full ${gender === "M" ? "border-[4px] border-accent-primary-light dark:border-accent-primary-dark" : "border-[1.5px] border-border-default-light hover:border-[2.5px] hover:border-accent-primary-light dark:border-border-default-dark dark:hover:border-accent-primary-dark"}`}
                  >
                    <span className="bg-white hidden h-2.5 w-2.5 rounded-full peer-checked:block"></span>
                  </span>
                  <span>남성</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="키" />
            <TextInput
              type="text"
              size="medium"
              name="height"
              value={height ?? ""}
              parameter="cm"
              maxLength={3}
              placeholder="0"
              onChange={onNumberChange}
              onBlur={onSaveInfo}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="몸무게" />
            <TextInput
              type="text"
              size="medium"
              name="weight"
              value={weight ?? ""}
              parameter="kg"
              maxLength={3}
              placeholder="0"
              onChange={onNumberChange}
              onBlur={onSaveInfo}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="전화번호" required />
            <TextInput
              type="tel"
              size="medium"
              name="contact"
              value={contact ?? ""}
              maxLength={13}
              onChange={onContactChange}
              onBlur={onSaveInfo}
            />
            <p className="typography-caption1 mt-[5px] text-content-tertiary-light dark:text-content-tertiary-dark">
              전화번호는 다른 사람에게 보이지 않아요.
            </p>
          </div>
          <div className="flex w-full flex-col">
            <Label label="이메일" />
            <TextInput
              type="email"
              size="medium"
              name="email"
              value={email ?? ""}
              maxLength={40}
              onChange={onInputChange}
              onBlur={onSaveInfo}
            />
          </div>
        </div>
        <div className="flex h-auto w-full">
          <div className="flex w-full flex-col">
            <Label label="특기" />
            <div className="flex h-auto w-full flex-col gap-1">
              <BoxButton
                type="secondaryOutlined"
                size="medium"
                onClick={onSpecialtyFormModalOpen}
              >
                <Plus
                  width="12"
                  height="12"
                  className="fill-current text-content-primary-light dark:text-content-primary-dark"
                />
                추가/수정
              </BoxButton>
            </div>
            <div className="mt-2 flex h-auto gap-1">
              {profileData.specialties.map((specialty: SpecialtyItemType) => {
                return (
                  <Chips
                    key={specialty.id}
                    text={specialty.specialty?.specialtyName}
                    icon
                    onClick={() => onDeleteSpecialty(specialty.id)}
                  />
                );
              })}
            </div>
          </div>
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="링크" />
          <div className="flex h-auto w-full flex-col gap-1">
            <TextInput
              type="link"
              size="medium"
              name="instagramLink"
              icon="instagram"
              value={instagramLink ?? ""}
              maxLength={300}
              placeholder="https://"
              onChange={onInputChange}
              onBlur={onSaveInfo}
            />
            <TextInput
              type="link"
              size="medium"
              name="youtubeLink"
              icon="youtube"
              value={youtubeLink ?? ""}
              maxLength={300}
              placeholder="https://"
              onChange={onInputChange}
              onBlur={onSaveInfo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalInfo;

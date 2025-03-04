"use client";

import Image from "next/image";
import Link from "next/link";
import { educationEngList, educationList } from "@/lib/data";
import { useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import BoxButton from "@/components/atoms/boxButton";
import EmptyState from "@/components/molecules/emptyState";
import Plus from "../../../../../public/icons/Plus.svg";
import Download from "../../../../../public/icons/Download.svg";
import Copy from "../../../../../public/icons/Copy.svg";
import Edit from "../../../../../public/icons/Edit.svg";
import { InfoResponseType } from "@/lib/types";
import UploadButton from "@/components/atoms/uploadButton";
import Tooltip from "@/components/atoms/tooltip";
import DotsVertical from "../../../../../public/icons/DotsVertical.svg";
import { SpecialtyItemType } from "../create/info/types";
import ProfileInfoContainer from "./profileInfoContainer";
import { isValidInstagramUrl, isValidYoutubeChannelUrl } from "@/lib/utils";

interface ProfileMainProps {
  info: InfoResponseType;
  linear: string;
  updated: string;
  otherUser: boolean;
  mainPhoto: string;
  profileSpecialties: SpecialtyItemType[];
  education: any;
  mainPhotoMenuActive: boolean;
  setStepperData: React.Dispatch<React.SetStateAction<number>>;
  onProfileEdit: () => void;
  onMainPhotoModalOpen: () => void;
  onMainPhotoSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMainPhotoMenuActive: () => void;
  onMainPhotoChangeModalOpen: () => void;
  onMainPhotoEditModalOpen: () => void;
  onMainPhotoDeleteModalOpen: () => void;
}

const ProfileMain = ({
  info,
  linear,
  updated,
  otherUser,
  mainPhoto,
  profileSpecialties,
  education,
  mainPhotoMenuActive,
  setStepperData,
  onProfileEdit,
  onMainPhotoSelectFile,
  onMainPhotoModalOpen,
  onMainPhotoMenuActive,
  onMainPhotoChangeModalOpen,
  onMainPhotoEditModalOpen,
  onMainPhotoDeleteModalOpen
}: ProfileMainProps) => {
  const setToast = useSetRecoilState(toastMessage);

  const {
    name,
    bornYear,
    height,
    weight,
    contact,
    email,
    instagramLink,
    youtubeLink,
    introduction
  } = info;

  const statusIndex = educationEngList.findIndex(
    (item: string) => item === education?.status
  );

  const onCopyUrl = async () => {
    const copyUrl = window.location.href;
    try {
      setToast("프로필 링크를 복사 했어요.");
      await navigator.clipboard.writeText(copyUrl);
    } catch (error) {
      throw error;
    }
  };

  const date = new Date(updated);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return (
    <section
      className={`flex h-full w-full flex-col gap-2 p-8 ${linear === "main" && "border-r-[1px] border-border-default-light"}`}
    >
      {mainPhoto ? (
        <div
          className="relative w-full"
          style={{ paddingBottom: `${(532 / 416) * 100}%` }}
        >
          <Image
            src={mainPhoto}
            alt="대표 사진"
            layout="fill"
            priority
            className="h-full w-full rounded-2xl"
          />
          {otherUser === false && (
            <div className="absolute right-1 top-1">
              <button
                className="absolute right-1 top-1 h-auto w-auto rounded-[10px] border border-border-default-light bg-background-surface-light p-2 outline-none"
                type="button"
                onClick={onMainPhotoMenuActive}
              >
                <DotsVertical width="20" height="20" fill="#212529" />
              </button>
            </div>
          )}
          {mainPhotoMenuActive && (
            <div className="interaction-default absolute right-2 top-[52px] flex h-auto w-20 animate-enter flex-col rounded-xl bg-background-elevated-light p-2 shadow-low">
              <label className="typography-body3 flex h-[38px] w-full cursor-pointer gap-2 rounded-md bg-background-surface-light px-3 py-2 font-regular text-content-primary-light">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    onMainPhotoChangeModalOpen();
                    onMainPhotoMenuActive();
                    onMainPhotoSelectFile(e);
                  }}
                />
                변경
              </label>
              <button
                type="button"
                className="typography-body3 flex h-[38px] w-full gap-2 rounded-md bg-background-surface-light px-3 py-2 font-regular text-content-primary-light"
                onClick={() => {
                  onMainPhotoMenuActive();
                  onMainPhotoEditModalOpen();
                }}
              >
                편집
              </button>
              <button
                type="button"
                className="typography-body3 flex h-[38px] w-full gap-2 rounded-md bg-background-surface-light px-3 py-2 font-regular text-content-primary-light"
                onClick={() => {
                  onMainPhotoMenuActive();
                  onMainPhotoDeleteModalOpen();
                }}
              >
                삭제
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className="relative w-full"
          style={{ paddingBottom: `${(532 / 416) * 100}%` }}
        >
          <div className="absolute flex h-full w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border-default-light bg-gray-50">
            <Image
              src="/icons/Account.svg"
              alt="account"
              width={40}
              height={40}
            />
            {otherUser === false && (
              <div className="relative flex justify-center">
                <UploadButton
                  type="secondaryOutlined"
                  size="medium"
                  onClick={onMainPhotoModalOpen}
                  onChange={onMainPhotoSelectFile}
                >
                  <Plus width="14" height="14" fill="#212529" />
                  대표 사진 추가
                </UploadButton>
                <div className="absolute -top-10">
                  <Tooltip placement="top" text="대표 사진을 추가하세요." />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      {otherUser ? (
        <BoxButton type="secondaryOutlined" size="medium" onClick={onCopyUrl}>
          <Copy width="14" height="14" fill="#212529" />
          링크 복사
        </BoxButton>
      ) : (
        <div className="relative grid h-auto w-full grid-cols-3 flex-row items-center justify-between gap-2">
          <BoxButton type="secondaryOutlined" size="medium">
            <Download width="14" height="14" fill="#212529" />
            PDF 다운로드
          </BoxButton>
          <BoxButton type="secondaryOutlined" size="medium" onClick={onCopyUrl}>
            <Copy width="14" height="14" fill="#212529" />
            링크 복사
          </BoxButton>
          <div className="relative flex justify-center">
            <button
              type="button"
              className="interaction-default typography-body3 flex h-auto w-full items-center justify-center gap-1.5 rounded-xl border border-border-default-light bg-background-surface-light px-5 py-[11px] font-medium text-content-primary-light outline-none hover:bg-hover-secondaryOutlined active:bg-pressed-secondaryOutlined"
              onClick={() => {
                setStepperData(0);
                onProfileEdit();
              }}
            >
              <Edit width="14" height="14" fill="#212529" />
              프로필 편집
            </button>
            {bornYear === 0 ||
              (contact.length === 0 && (
                <div className="absolute -top-10">
                  <Tooltip placement="top" text="프로필을 완성하세요." />
                </div>
              ))}
          </div>
        </div>
      )}
      <div className="flex h-auto w-full items-center justify-between gap-4 rounded-2xl bg-background-base_inverse-light px-5 py-3 text-content-on_color-light">
        <div className="flex flex-row items-center gap-3">
          <span className="typography-body1 font-semibold">{name}</span>
          <div className="typography-caption1 flex flex-row gap-1 font-medium text-content-tertiary-light">
            <span>최근 업데이트</span>
            <span>
              {year}.{month}.{day}
            </span>
          </div>
        </div>
        <span className="typography-body2 font-medium">배우</span>
      </div>
      {bornYear >= 1 || contact ? (
        <ProfileInfoContainer title="기본 정보">
          <span>
            {bornYear}년생{" "}
            <label className="opacity-50">
              {(height >= 1 || weight >= 1) && "· "}
            </label>
            {height && height + "cm "}
            {weight && weight + "kg"}
          </span>
          {education.length >= 1 && (
            <span>
              {education.school.name}{" "}
              {education.major && education.major + " 전공"}{" "}
              {educationList[statusIndex]}
            </span>
          )}
          {email && <span>{email}</span>}
        </ProfileInfoContainer>
      ) : (
        <EmptyState
          text="정보가 없어요."
          icon
          button={false}
          buttonSize=""
          buttonText=""
          buttonType=""
          otherUser={otherUser}
        />
      )}
      {(isValidInstagramUrl(instagramLink) ||
        isValidYoutubeChannelUrl(youtubeLink)) && (
        <ProfileInfoContainer title="SNS">
          <div className="flex flex-row gap-2">
            {isValidInstagramUrl(instagramLink) && (
              <Link
                href={instagramLink}
                className="flex w-fit items-center gap-1 rounded-[100px] bg-gray-150 p-[5px]"
                target="_blank"
              >
                <Image
                  src="/icons/instagramIcon.svg"
                  alt="instagram"
                  width={14}
                  height={14}
                />
              </Link>
            )}
            {isValidYoutubeChannelUrl(youtubeLink) && (
              <Link
                href={youtubeLink}
                className="flex w-fit items-center gap-1 rounded-[100px] bg-gray-150 p-[5px]"
                target="_blank"
              >
                <Image
                  src="/icons/youtubeIcon.svg"
                  alt="youtube"
                  width={16}
                  height={16}
                />
              </Link>
            )}
          </div>
        </ProfileInfoContainer>
      )}
      {profileSpecialties.length >= 1 && (
        <div className="typography-body2 flex h-auto w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-normal text-content-primary-light">
          <div className="mb-2 text-body2 font-semibold">특기</div>
          <div className="flex gap-1">
            {profileSpecialties.map((item) => (
              <span
                key={item.id}
                className="rounded-[8px] bg-accent-light-light px-2 py-[5px] text-accent-primary-light"
              >
                피아노
              </span>
            ))}
          </div>
        </div>
      )}
      {introduction && (
        <ProfileInfoContainer title="자기소개" introduction>
          <p className="whitespace-pre break-all">{introduction}</p>
        </ProfileInfoContainer>
      )}
    </section>
  );
};

export default ProfileMain;

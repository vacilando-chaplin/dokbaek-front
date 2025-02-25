"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { educationEngList, educationList } from "@/lib/data";
import { useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import BoxButton from "@/components/atoms/boxButton";
import EmptyState from "@/components/molecules/emptyState";
import Plus from "../../../../../public/icons/Plus.svg";
import Download from "../../../../../public/icons/Download.svg";
import Copy from "../../../../../public/icons/Copy.svg";
import Edit from "../../../../../public/icons/Edit.svg";
import { EducationType, InfoResponseType } from "@/lib/types";
import UploadButton from "@/components/atoms/uploadButton";
import Tooltip from "@/components/atoms/tooltip";
import X from "../../../../../public/icons/X.svg";
import { SpecialtyItemType } from "../create/info/types";
interface ProfileMainProps {
  linear: string;
  userId: number;
  mainPhoto: string;
  info: InfoResponseType;
  profileSpecialties: SpecialtyItemType[];
  education: EducationType;
  onProfileEdit: React.MouseEventHandler<HTMLButtonElement>;
  onMainPhotoModalOpen: React.MouseEventHandler<HTMLInputElement>;
  onMainPhotoSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onDeleteMainPhoto: React.MouseEventHandler<HTMLButtonElement>;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileMain = ({
  linear,
  userId,
  mainPhoto,
  info,
  profileSpecialties,
  education,
  setStepper,
  onProfileEdit,
  onMainPhotoSelectFile,
  onMainPhotoModalOpen,
  onDeleteMainPhoto
}: ProfileMainProps) => {
  const router = useRouter();

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

  return (
    <section
      className={`flex h-full w-full flex-col gap-2 p-8 ${linear === "main" && "border-r-[1px] border-border-default-light"}`}
    >
      {mainPhoto ? (
        <div className="flex h-[60vh] w-full">
          <div className="relative h-full w-full">
            <Image
              src={mainPhoto}
              alt="대표 사진"
              width="0"
              height="0"
              sizes="100vw"
              priority
              className="h-full w-full rounded-2xl"
            />
            <div className="absolute bottom-2 left-2">
              <UploadButton
                type="secondaryOutlined"
                size="medium"
                onClick={onMainPhotoModalOpen}
                onChange={onMainPhotoSelectFile}
              >
                <Plus width="14" height="14" fill="#212529" />
                대표 사진 변경
              </UploadButton>
            </div>
            <div className="absolute right-2 top-2">
              <button
                className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
                type="button"
                onClick={onDeleteMainPhoto}
              >
                <X width="12" height="12" fill="#FB3E34" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border-default-light bg-gray-50">
          <Image
            src="/icons/Account.svg"
            alt="account"
            width={40}
            height={40}
          />
          <div>
            <Tooltip placement="top" text="대표 사진을 추가하세요." />
          </div>
          <UploadButton
            type="secondaryOutlined"
            size="medium"
            onClick={onMainPhotoModalOpen}
            onChange={onMainPhotoSelectFile}
          >
            <Plus width="14" height="14" fill="#212529" />
            대표 사진 추가
          </UploadButton>
        </div>
      )}
      <div className="grid h-auto w-full grid-cols-3 flex-row items-center justify-between gap-2">
        <BoxButton type="secondaryOutlined" size="medium">
          <Download width="14" height="14" fill="#212529" />
          PDF 다운로드
        </BoxButton>
        <BoxButton type="secondaryOutlined" size="medium" onClick={onCopyUrl}>
          <Copy width="14" height="14" fill="#212529" />
          링크 복사
        </BoxButton>
        <BoxButton
          type="secondaryOutlined"
          size="medium"
          onClick={onProfileEdit}
        >
          <Edit width="14" height="14" fill="#212529" />
          프로필 편집
        </BoxButton>
      </div>
      <div className="flex h-auto w-full items-center justify-between gap-4 rounded-2xl bg-background-base_inverse-light px-5 py-3 text-content-on_color-light">
        <label className="typography-body1 font-semibold">{name}</label>
        <label className="typography-body2 font-medium">배우</label>
      </div>
      {bornYear >= 1 || contact ? (
        <div className="typography-body2 flex h-auto w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-normal text-content-primary-light">
          <span>
            {bornYear}년생{" "}
            <label className="opacity-50">
              {(height >= 1 || weight >= 1) && "· "}
            </label>
            {height && height + "cm "}
            {weight && weight + "kg"}
          </span>
          {contact && <span>{contact}</span>}
          {education.school?.name && (
            <span>
              {education.school?.name}{" "}
              {education.major && education.major + " 전공"}{" "}
              {educationList[statusIndex]}
            </span>
          )}
          {email && <span>{email}</span>}
          {instagramLink.length >= 27 && (
            <Link
              href={instagramLink}
              className="flex w-fit items-center gap-1"
              target="_blank"
            >
              <Image
                src="/icons/instagram.svg"
                alt="instagram"
                width={24}
                height={24}
              />
            </Link>
          )}
          {youtubeLink.length >= 26 && (
            <Link
              href={youtubeLink}
              className="flex w-fit items-center gap-1"
              target="_blank"
            >
              <Image
                src="/icons/youtube.svg"
                alt="youtube"
                width={24}
                height={24}
              />
            </Link>
          )}
        </div>
      ) : (
        <EmptyState
          text="정보가 없어요."
          icon
          button={false}
          buttonText=""
          buttonType=""
        />
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
        <p className="typography-body2 flex h-full w-full gap-2 whitespace-pre break-all rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 font-normal text-content-primary-light">
          {introduction}
        </p>
      )}
    </section>
  );
};

export default ProfileMain;

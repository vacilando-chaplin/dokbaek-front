"use client";

import { infoInputsTypes, PhotoTypes } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Button from "../atoms/button";
import ProfileButton from "../atoms/profileButton";
import ProfileEmpty from "../atoms/profileEmpty";
import { educationEngList, educationList } from "@/data/data";

interface ProfileMainProps {
  linear: string;
  mainRef: any;
  mainPhoto: string;
  info: any;
  education: any;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileMain = ({
  linear,
  mainRef,
  mainPhoto,
  info,
  education,
  setStepper
}: ProfileMainProps) => {
  const router = useRouter();

  const {
    name,
    bornYear,
    height,
    weight,
    contact,
    speciality,
    email,
    instagramLink,
    youtubeLink,
    introduction
  } = info;

  const statusIndex = educationEngList.findIndex(
    (item: string) => item === education.status
  );

  return (
    <section
      ref={mainRef}
      className={`flex h-full w-[41vw] flex-col gap-2 p-8 ${linear === "main" && "border-r-[1px] border-border-default-light"}`}
    >
      {mainPhoto ? (
        <div className="flex h-[60vh] w-full">
          <Image
            src={mainPhoto}
            alt="대표 사진"
            width="0"
            height="0"
            sizes="100vw"
            priority
            className="h-auto w-full rounded-2xl"
          />
        </div>
      ) : (
        <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4 rounded-2xl border border-border-default-light bg-gray-50">
          <Image
            src="/icons/Account.svg"
            alt="account"
            width={40}
            height={40}
          />
          <ProfileButton
            text="메인 사진 추가"
            onClick={() => {
              router.push("/profile");
              setStepper(1);
            }}
          />
        </div>
      )}
      <div className="grid h-auto w-full grid-cols-3 flex-row items-center justify-between gap-2">
        <Button text="PDF 다운로드" icon="/icons/Download.svg" />
        <Button text="링크 복사" icon="/icons/Copy.svg" />
        <Button
          text="프로필 편집"
          icon="/icons/Edit.svg"
          onClick={() => {
            router.push("/profile");
            setStepper(0);
          }}
        />
      </div>
      <div className="flex h-auto w-full items-center justify-between gap-4 rounded-2xl bg-background-base_inverse-light px-5 py-3 text-content-on_color-light">
        <label className="text-body1 font-semibold leading-body1 tracking-body1">
          {name}
        </label>
        <label className="text-body2 font-medium leading-body2 tracking-body2">
          배우
        </label>
      </div>
      {bornYear >= 1 || contact ? (
        <div className="flex h-auto w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-body2 font-normal leading-body2 tracking-body2 text-content-primary-light">
          <span>
            {bornYear}년생{" "}
            <label className="opacity-50">
              {(height >= 1 || weight >= 1) && "· "}
            </label>
            {height && height + "cm "}
            {weight && weight + "kg"}
          </span>
          {contact && <span>{contact}</span>}
          {education.school.name && (
            <span>
              {education.school.name}{" "}
              {education.major && education.major + "전공"}{" "}
              {educationList[statusIndex]}
            </span>
          )}
          {speciality && <span>{speciality && "특기: " + speciality}</span>}
          {email && <span>{email}</span>}
          {instagramLink.length >= 27 && (
            <Link
              href={instagramLink}
              className="flex w-fit items-center gap-1"
              target="_blank"
            >
              <img src="/icons/instagram.svg" />
            </Link>
          )}
          {youtubeLink.length >= 26 && (
            <Link
              href={youtubeLink}
              className="flex w-fit items-center gap-1"
              target="_blank"
            >
              <img src="/icons/youtube.svg" />
            </Link>
          )}
        </div>
      ) : (
        <div className="flex h-auto w-full items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 py-16">
          <ProfileEmpty text="정보가 없어요." />
        </div>
      )}
      {introduction && (
        <p className="flex h-full w-full gap-2 whitespace-pre break-all rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-body2 font-normal leading-body2 tracking-body2 text-content-primary-light">
          {introduction}
        </p>
      )}
    </section>
  );
};

export default ProfileMain;

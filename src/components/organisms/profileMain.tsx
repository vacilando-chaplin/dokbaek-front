import Image from "next/image";
import Button from "../atoms/button";
import { infoInputsTypes } from "@/types/types";
import ProfileButton from "../atoms/profileButton";
import ProfileEmpty from "../atoms/profileEmpty";

interface ProfileMainProps {
  info: infoInputsTypes;
}

const ProfileMain = ({ info }: ProfileMainProps) => {
  const {
    name,
    birth,
    height,
    weight,
    contact,
    school,
    major,
    education,
    specialty,
    email,
    instagram,
    youtube,
    introduction
  } = info;

  return (
    <section className="flex h-full w-[480px] flex-col gap-2 p-8">
      <div className="flex h-[532px] w-[416px] flex-col items-center justify-center gap-4 rounded-2xl border border-border-default-light bg-gray-50">
        <Image src="/icons/Account.svg" alt="account" width={40} height={40} />
        <ProfileButton text="메인 사진 추가" />
      </div>
      <div className="flex h-auto w-full flex-row items-center justify-between gap-2">
        <Button text="PDF 다운로드" icon="/icons/download.svg" />
        <Button text="링크 복사" icon="/icons/copy.svg" />
        <Button text="프로필 편집" icon="/icons/edit.svg" />
      </div>
      <div className="flex h-auto w-full items-center justify-between gap-4 rounded-2xl bg-background-base_inverse-light px-5 py-3 text-content-on_color-light">
        <label className="text-body1 font-semibold leading-body1 tracking-body1">
          {name}
        </label>
        <label className="text-body2 font-medium leading-body2 tracking-body2">
          배우
        </label>
      </div>
      {birth || contact ? (
        <div className="flex h-auto w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-body2 font-normal leading-body2 tracking-body2 text-content-primary-light">
          <span>
            {birth}년생 <label className="opacity-50">·</label>
            {height && height + "cm"}
            {weight && weight + "kg"}
          </span>
          {contact && <span>{contact}</span>}
          {school && (
            <span>
              {school} {major && major + "전공"} {education}
            </span>
          )}
          {specialty && <span>{specialty && "특기: " + specialty}</span>}
          {email && <span>{email}</span>}
          {instagram && (
            <span className="flex items-center gap-1">
              <img src="/icons/instagram.svg" />
              {instagram}
            </span>
          )}
          {youtube && (
            <span className="flex items-center gap-1">
              <img src="/icons/youtube.svg" />
              {youtube}
            </span>
          )}
        </div>
      ) : (
        <div className="flex h-auto w-full items-center justify-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 py-16">
          <ProfileEmpty text="정보가 없어요." />
        </div>
      )}
      {introduction && (
        <span className="flex h-auto w-full flex-col gap-2 rounded-2xl border border-gray-100 bg-gray-50 px-5 py-4 text-body2 font-normal leading-body2 tracking-body2 text-content-primary-light">
          {introduction}
        </span>
      )}
    </section>
  );
};

export default ProfileMain;

"use client";

import { infoInputsTypes, PhotoTypes } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProfileButton from "../atoms/profileButton";
import ProfileEmpty from "../atoms/profileEmpty";

interface ProfileMainProps {
  linear: string;
  mainRef: any;
  mainPhoto: PhotoTypes;
  info: infoInputsTypes;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}

const ProfileMain = ({
  linear,
  mainRef,
  mainPhoto,
  info,
  setStepper
}: ProfileMainProps) => {
  const router = useRouter();

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
    <section
      ref={mainRef}
      className={`flex h-full w-[50vw] flex-col gap-2 p-8 ${linear === "main" && "border-r-[1px] border-border-default-light"}`}
    >
      {mainPhoto.photo ? (
        <div className="flex h-[60vh] w-full">
          <Image
            src={mainPhoto.photo}
            alt="대표 사진"
            width="0"
            height="0"
            sizes="100vw"
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
        <button
          type="button"
          className="flex h-auto items-center w-auto justify-center gap-1.5 rounded-xl border border-border-default-light px-5 py-[11px] text-body3 font-medium leading-body3 tracking-body3 outline-none bg-background-surface-light text-content-primary-light"
        >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M7.29289 11.7071C6.90237 11.3166 6.90237 10.6834 7.29289 10.2929C7.68342 9.90237 8.31658 9.90237 8.70711 10.2929L11 12.5858L11 3C11 2.44771 11.4477 2 12 2C12.5523 2 13 2.44771 13 3L13 12.5858L15.2929 10.2929C15.6834 9.90237 16.3166 9.90237 16.7071 10.2929C17.0976 10.6834 17.0976 11.3166 16.7071 11.7071L12 16.4142L7.29289 11.7071Z" fill="#212529"/>
          <path d="M4 16C4 15.4477 3.55228 15 3 15C2.44772 15 2 15.4477 2 16V18C2 19.6569 3.34315 21 5 21H19C20.6569 21 22 19.6569 22 18V16C22 15.4477 21.5523 15 21 15C20.4477 15 20 15.4477 20 16V18C20 18.5523 19.5523 19 19 19H5C4.44772 19 4 18.5523 4 18V16Z" fill="#212529"/>
        </svg>

        PDF 다운로드
      </button>
      <button
        type="button"
        className="flex h-auto items-center w-auto justify-center gap-1.5 rounded-xl border border-border-default-light px-5 py-[11px] text-body3 font-medium leading-body3 tracking-body3 outline-none bg-background-surface-light text-content-primary-light"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 7C5 5.34315 6.34315 4 8 4H15C15.5523 4 16 3.55228 16 3C16 2.44772 15.5523 2 15 2H8C5.23858 2 3 4.23858 3 7V16C3 16.5523 3.44772 17 4 17C4.55228 17 5 16.5523 5 16V7Z" fill="#363644"/>
          <path fillRule="evenodd" clipRule="evenodd" d="M6 8C6 6.34315 7.34315 5 9 5H17C18.6569 5 20 6.34315 20 8V19C20 20.6569 18.6569 22 17 22H9C7.34315 22 6 20.6569 6 19V8ZM9 7H17C17.5523 7 18 7.44772 18 8V19C18 19.5523 17.5523 20 17 20H9C8.44772 20 8 19.5523 8 19V8C8 7.44772 8.44771 7 9 7Z" fill="#363644"/>
        </svg>
        링크 복사
      </button>
      <button
        type="button"
          className="flex h-auto items-center w-auto justify-center gap-1.5 rounded-xl border border-border-default-light px-5 py-[11px] text-body3 font-medium leading-body3 tracking-body3 outline-none bg-background-surface-light text-content-primary-light"
          onClick={() => {
            router.push("/profile");
            setStepper(0);
          }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" clipRule="evenodd" d="M19.9142 1.99997C19.1332 1.21892 17.8668 1.21892 17.0858 1.99997L7.78167 11.3041C7.39841 11.6873 7.18712 12.2097 7.19616 12.7517L7.23096 14.8382C7.24895 15.9166 8.11887 16.7866 9.19733 16.8045L11.2838 16.8393C11.8258 16.8484 12.3482 16.6371 12.7314 16.2538L22.0355 6.94972C22.8166 6.16867 22.8166 4.90234 22.0355 4.12129L19.9142 1.99997ZM18.5 3.41418L20.6213 5.5355L11.3172 14.8396L9.23068 14.8048L9.19588 12.7183L18.5 3.41418Z" fill="#212529"/>
          <path d="M4 4.99997C4 4.44769 4.44772 3.99997 5 3.99997H11C11.5523 3.99997 12 3.55226 12 2.99997C12 2.44769 11.5523 1.99997 11 1.99997H5C3.34315 1.99997 2 3.34312 2 4.99997V19C2 20.6568 3.34315 22 5 22H19C20.6569 22 22 20.6568 22 19V13C22 12.4477 21.5523 12 21 12C20.4477 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V4.99997Z" fill="#212529"/>
        </svg>
        프로필 편집
      </button>
        {/* <Button text="PDF 다운로드" icon="/icons/Download.svg"/> */}
        {/* <Button text="링크 복사" icon="/icons/Copy.svg"/> */}
        {/* <Button
          text="프로필 편집"
          icon="/icons/Edit.svg"
          onClick={() => {
            router.push("/profile");
            setStepper(0);
          }}
        /> */}
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
            {birth}년생 <label className="opacity-50">{(height || weight) && "· "}</label>
            {height && height + "cm "}
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
          {instagram.length >= 27 && (
            <Link
              href={instagram}
              className="flex w-fit items-center gap-1"
              target="_blank"
            >
              <img src="/icons/instagram.svg" />
            </Link>
          )}
          {youtube.length >= 26 && (
            <Link
              href={youtube}
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

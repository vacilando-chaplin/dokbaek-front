import { ProfileDraftDataType } from "@/app/profile/[id]/create/types";
import { profilePhotoModalInit } from "@/app/profile/[id]/data";
import { ProfilePhotoModalType } from "@/app/profile/[id]/types";
import { profileInit } from "@/lib/data";
import { atom } from "recoil";

export const isMyProfileState = atom<boolean>({
  key: "isMyProfileState",
  default: false
});

export const profileViewState = atom<ProfileDraftDataType>({
  key: "profileViewState",
  default: profileInit
});

export const handleNameState = atom<string>({
  key: "handleNameState",
  default: ""
});

export const mainPhotoModalState = atom<ProfilePhotoModalType>({
  key: "mainPhotoModalState",
  default: profilePhotoModalInit
});

export const mainPhotoImageState = atom<string>({
  key: "mainPhotoImageState",
  default: ""
});

export const mainPhotoCropImageState = atom<string>({
  key: "mainPhotoCropImageState",
  default: ""
});

export const mainPhotoDeleteModalActiveState = atom<boolean>({
  key: "mainPhotoDeleteModalActiveState",
  default: false
});

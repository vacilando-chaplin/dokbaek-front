import { ProfileDraftDataType } from "@/app/profile/[id]/create/types";
import { profilePhotoModalInit } from "@/app/profile/[id]/data";
import { ProfilePhotoModalType } from "@/app/profile/[id]/types";
import { atom } from "recoil";

export const isMyProfileState = atom<boolean>({
  key: "isMyProfileState",
  default: false
});

export const profileViewState = atom<ProfileDraftDataType | null>({
  key: "profileViewState",
  default: null
});

export const mainPhotoModalState = atom<ProfilePhotoModalType>({
  key: "mainPhotoModalState",
  default: profilePhotoModalInit
});

export const mainPhotoImageState = atom<string | null>({
  key: "mainPhotoImage",
  default: null
});

export const mainPhotoCropImageState = atom<string>({
  key: "mainPhotoImage",
  default: ""
});

export const mainPhotoDeleteModalActiveState = atom<boolean>({
  key: "mainPhotoDeleteModalActiveState",
  default: false
});

import {
  photoOriginModalInit,
  profilePhotoModalInit,
  youtubeModalInit
} from "@/app/[@handle]/data";
import { ProfileDraftDataType } from "@/app/[@handle]/edit/types";
import {
  PhotoOriginModalType,
  ProfilePhotoModalType,
  SelectedPhotoLabelType,
  YoutubeModalType
} from "@/app/[@handle]/types";
import { profileInit } from "@/lib/data";
import { FilmoCategoryType } from "@/lib/types";
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

export const specialtyModalState = atom<boolean>({
  key: "specialtyModalState",
  default: false
});

export const selectedPhotoLabelState = atom<SelectedPhotoLabelType>({
  key: "selectedPhotoLabelState",
  default: "photos"
});

export const photoListSliderState = atom<number>({
  key: "photoListSliderState",
  default: 0
});

export const photoOriginModalState = atom<PhotoOriginModalType>({
  key: "photoOriginModalState",
  default: photoOriginModalInit
});

export const filmoViewAllModalState = atom<boolean>({
  key: "filmoViewAllModalState",
  default: false
});

export const filmoYoutubeModalState = atom<YoutubeModalType>({
  key: "filmoYoutubeModalState",
  default: youtubeModalInit
});

export const profileFilmoCategoryState = atom<FilmoCategoryType[]>({
  key: "profileFilmoCategoryState",
  default: []
});

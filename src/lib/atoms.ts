import { SpecialtyType } from "@/app/profile/[id]/create/info/types";
import {
  CompletionProgressType,
  FilmoCategoryType,
  FilmoRoleType,
  InfoRequiredType
} from "@/lib/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
import { profileResponseInit } from "./data";

const { persistAtom } = recoilPersist();

export const defaultId = atom<number>({
  key: "defaultId",
  default: 0,
  effects_UNSTABLE: [persistAtom]
});

export const stepperInit = atom<number>({
  key: "stepperInit",
  default: 0
});

export const completionProgress = atom<CompletionProgressType>({
  key: "completionProgress",
  default: {
    name: false,
    birth: false,
    height: false,
    weight: false,
    contact: false,
    email: false,
    specialty: false,
    youtube: false,
    instagram: false,
    schoolName: false,
    schoolMajor: false,
    schoolStatus: false,
    introduction: false,
    profilePhoto: false,
    stillcutPhoto: false,
    recentPhoto: false,
    filmography: false,
    video: false
  }
});

export const toastMessage = atom<string>({
  key: "toastMessage",
  default: ""
});

export const infoRequired = atom<InfoRequiredType>({
  key: "infoRequired",
  default: {
    name: "",
    birth: "",
    contact: ""
  }
});

export const categoryData = atom<string[]>({
  key: "categoryData",
  default: []
});

export const filmoCategory = atom<FilmoCategoryType[]>({
  key: "filmoCategory",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const filmoRole = atom<FilmoRoleType[]>({
  key: "filmoRole",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const profileData = atom({
  key: "profileData",
  default: profileResponseInit
});

export const specialtyData = atom<SpecialtyType[]>({
  key: "specialtyData",
  default: [],
  effects_UNSTABLE: [persistAtom]
});

export const currentPath = atom({
  key: "currentPath",
  default: "/"
});

export const isDraft = atom({
  key: "isDraft",
  default: false
});

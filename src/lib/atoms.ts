import { SpecialtyType } from "@/app/profile/[id]/create/info/types";
import {
  FilmoCategoryType,
  FilmoRoleType,
  InfoRequiredType
} from "@/lib/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

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

export const photoDragEnd = atom<boolean>({
  key: "photoDragEnd",
  default: false
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
  default: {},
  effects_UNSTABLE: [persistAtom]
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

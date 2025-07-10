import {
  CompletionProgressType,
  FilmoCategoryType,
  FilmoRoleType
} from "@/lib/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const profileIdInit = atom<number>({
  key: "profileIdInit",
  default: 0,
  effects_UNSTABLE: [persistAtom]
});

export const loginProfileId = atom<number>({
  key: "loginProfileId",
  default: 0,
  effects_UNSTABLE: [persistAtom]
});

export const stepperInit = atom<number>({
  key: "stepperInit",
  default: 0,
  effects_UNSTABLE: [persistAtom]
});

export const completionProgress = atom<CompletionProgressType>({
  key: "completionProgress",
  default: {
    name: false,
    gender: false,
    bornYear: false,
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

export const loginErrorState = atom<boolean>({
  key: "loginErrorState",
  default: false
});

export const toastMessage = atom<string>({
  key: "toastMessage",
  default: ""
});

export const categoryData = atom<string[]>({
  key: "categoryData",
  default: []
});

export const filmoCategory = atom<FilmoCategoryType[]>({
  key: "filmoCategory",
  default: [
    { id: 1, name: "장편상업영화" },
    { id: 2, name: "장편독립영화" },
    { id: 3, name: "단편영화" },
    { id: 4, name: "TV드라마" },
    { id: 5, name: "웹드라마" },
    { id: 6, name: "광고" },
    { id: 7, name: "뮤직비디오" },
    { id: 8, name: "연극" },
    { id: 9, name: "기타" }
  ],
  effects_UNSTABLE: [persistAtom]
});

export const filmoRole = atom<FilmoRoleType[]>({
  key: "filmoRole",
  default: [
    { id: 1, name: "주연" },
    { id: 2, name: "조연" },
    { id: 3, name: "단역" },
    { id: 4, name: "직접 입력" }
  ],
  effects_UNSTABLE: [persistAtom]
});

export const currentPath = atom<string>({
  key: "currentPath",
  default: "/"
});

import { infoRequiredType } from "@/types/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const defaultId = atom<number>({
  key: "defaultId",
  default: 0,
  effects_UNSTABLE: [persistAtom]
});

export const jwt = atom<string>({
  key: "jwt",
  default: "",
  effects_UNSTABLE: [persistAtom]
});

export const loginForm = atom<string>({
  key: "loginForm",
  default: ""
});

export const stepperInit = atom<number>({
  key: "stepperInit",
  default: 0
});

export const toastMessage = atom<string>({
  key: "toastMessage",
  default: ""
});

export const infoRequired = atom<infoRequiredType>({
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

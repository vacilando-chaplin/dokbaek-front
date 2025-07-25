import { atom } from "recoil";

export const loginErrorState = atom<boolean>({
  key: "loginErrorState",
  default: false
});

export const toastMessage = atom<string>({
  key: "toastMessage",
  default: ""
});

export const currentPath = atom<string>({
  key: "currentPath",
  default: "/"
});

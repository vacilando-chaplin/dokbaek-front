import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const loginState = atom<boolean>({
  key: "loginState",
  default: false,
  effects_UNSTABLE: [persistAtom]
});

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

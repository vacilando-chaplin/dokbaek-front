import { atom } from "recoil";

export const homeLoginModalState = atom<boolean>({
  key: "homeLoginModalState",
  default: false
});

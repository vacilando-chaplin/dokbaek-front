import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const profile = atom({
  key: "profile",
  default: {},
  effects_UNSTABLE: [persistAtom]
});

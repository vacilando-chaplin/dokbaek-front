import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const data = atom({
  key: "info",
  default: {},
  effects_UNSTABLE: [persistAtom]
});

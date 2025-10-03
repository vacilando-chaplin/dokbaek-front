import { LikedProfileShowcaseType } from "@/app/likes/types";
import { atom } from "recoil";

export const profileShowcaseState = atom<LikedProfileShowcaseType>({
  key: "profileShowcaseState",
  default: {
    profiles: [],
    currentPage: 0,
    totalElements: 0,
    totalPages: 0,
    hasNext: false
  }
});

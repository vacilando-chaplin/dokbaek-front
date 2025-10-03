import { ProfileShowcaseType } from "@/lib/types";
import { atom } from "recoil";

export const loginModalState = atom<boolean>({
  key: "loginModalState",
  default: false
});

export const profileShowcaseState = atom<ProfileShowcaseType>({
  key: "profileShowcaseState",
  default: {
    profiles: [],
    currentPage: 0,
    totalElements: 0,
    totalPages: 0,
    hasNext: false,
    isLoading: false
  }
});

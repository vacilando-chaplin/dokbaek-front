import { SpecialtyType } from "@/app/[@handle]/edit/info/types";
import { atom } from "recoil";

export const profileSpecialtyModalState = atom<boolean>({
  key: "profileSpecialtyModalState",
  default: false
});

export const specialtyData = atom<SpecialtyType[]>({
  key: "specialtyData",
  default: []
});

export const specialtyDeleteIds = atom<number[]>({
  key: "specialtyDeleteIds",
  default: []
});

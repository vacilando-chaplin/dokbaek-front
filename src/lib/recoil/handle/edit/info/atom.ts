import { SpecialtyType } from "@/components/molecules/addableSearchDropdown";
import { atom } from "recoil";

export const profileSpecialtyModalState = atom<boolean>({
  key: "profileSpecialtyModalState",
  default: false
});

export const specialtyData = atom<SpecialtyType[]>({
  key: "specialtyData",
  default: []
});

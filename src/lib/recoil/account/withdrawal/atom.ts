import { ReasonWithCheckType } from "@/app/account/withdrawal/type";
import { atom } from "recoil";

export const withdrawalReasons = atom<ReasonWithCheckType[]>({
  key: "withdrawalReasons",
  default: []
});

export const withdrawalAgreement = atom<boolean>({
  key: "withdrawalAgreement",
  default: false
});

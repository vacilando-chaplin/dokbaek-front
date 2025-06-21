import { PhotoModalType } from "@/app/profile/[id]/types";
import { atom } from "recoil";

export const cropModalState = atom<PhotoModalType>({
  key: "cropModalState",
  default: {
    id: "",
    state: "",
    active: false,
    name: "",
    buttonText: "",
    category: ""
  }
});

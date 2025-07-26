import { RecentPhotoCategory } from "@/app/[@handle]/edit/photo/types";
import { PhotoModalType, SelectedImagesType } from "@/app/[@handle]/types";
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

export const selectImageState = atom<string>({
  key: "selectImageState",
  default: ""
});

export const cropImageState = atom<string>({
  key: "cropImageState",
  default: ""
});

export const selectedImagesState = atom<SelectedImagesType[]>({
  key: "selectedImagesState",
  default: []
});

export const recentPhotoTypeState = atom<RecentPhotoCategory>({
  key: "recentPhotoTypeState",
  default: ""
});

import {
  FilmoDeleteModalType,
  FilmoInputType,
  FilmoModalType
} from "@/app/profile/[id]/create/filmo/types";
import {
  ProfileFilmoDataType,
  VideoLinkType
} from "@/app/profile/[id]/create/types";
import { atom } from "recoil";

export const filmoInputState = atom<FilmoInputType>({
  key: "filmoInputState",
  default: {
    classification: "",
    production: "",
    title: "",
    cast: "",
    castInput: "",
    casting: "",
    description: "",
    link: "",
    thumbnail: "",
    representative: false,
    id: 0,
    displayOrder: 0
  }
});

export const filmoRepActiveState = atom<boolean>({
  key: "filmoRepActiveState",
  default: false
});

export const filmoRepEditListState = atom<ProfileFilmoDataType[]>({
  key: "filmoRepEditListState",
  default: []
});

export const filmoModalState = atom<FilmoModalType>({
  key: "filmoModalState",
  default: { state: "", active: false, name: "", buttonText: "" }
});

export const filmoYoutubeLinkModalState = atom<VideoLinkType>({
  key: "filmoYoutubeLinkModalState",
  default: { url: "", active: false }
});

export const filmoDeleteModalState = atom<FilmoDeleteModalType>({
  key: "filmoDeleteModalState",
  default: { id: 0, active: false }
});

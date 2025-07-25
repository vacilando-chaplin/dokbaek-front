import {
  filmoDeleteModalInit,
  filmoInputInit,
  filmoLinkModalInit,
  filmoModalInit
} from "@/app/[@handle]/edit/filmo/data";
import {
  FilmoDeleteModalType,
  FilmoInputType,
  FilmoModalType
} from "@/app/[@handle]/edit/filmo/types";
import {
  ProfileFilmoDataType,
  VideoLinkType
} from "@/app/[@handle]/edit/types";
import { FilmoCategoryType, FilmoRoleType } from "@/lib/types";
import { atom } from "recoil";

export const filmoCategoryListState = atom<FilmoCategoryType[]>({
  key: "filmoCategoryListState",
  default: []
});

export const filmoRoleListState = atom<FilmoRoleType[]>({
  key: "filmoRoleListState",
  default: []
});

export const filmoInputState = atom<FilmoInputType>({
  key: "filmoInputState",
  default: filmoInputInit
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
  default: filmoModalInit
});

export const filmoYoutubeLinkModalState = atom<VideoLinkType>({
  key: "filmoYoutubeLinkModalState",
  default: filmoLinkModalInit
});

export const filmoDeleteModalState = atom<FilmoDeleteModalType>({
  key: "filmoDeleteModalState",
  default: filmoDeleteModalInit
});

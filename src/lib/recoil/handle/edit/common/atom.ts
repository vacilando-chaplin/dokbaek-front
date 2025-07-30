import { ProfileDraftDataType } from "@/app/[@handle]/edit/types";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const profileDraftData = atom<ProfileDraftDataType>({
  key: "profileDraftData",
  default: {
    id: 0,
    handleId: "",
    userId: null,
    status: null,
    info: {
      name: null,
      gender: null,
      bornYear: 0,
      height: 0,
      weight: 0,
      email: null,
      contact: null,
      instagramLink: null,
      youtubeLink: null,
      introduction: null
    },
    mainPhotoPath: null,
    mainPhotoPreviewPath: null,
    education: [],
    photos: [],
    stillCuts: [],
    recentPhotos: [],
    filmos: [],
    videos: [],
    specialties: [],
    likesCount: 0,
    likedByMe: false,
    viewsCount: 0,
    createdAt: "",
    updatedAt: ""
  }
});

export const profileDraftModalState = atom<string>({
  key: "profiledraftModalState",
  default: ""
});

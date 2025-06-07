import { ProfileDarftDataType } from "@/app/profile/[id]/create/types";
import { atom } from "recoil";

export const profileDraftData = atom<ProfileDarftDataType>({
  key: "profileDraftData",
  default: {
    id: 0,
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
    createdAt: "",
    updatedAt: ""
  }
});

export const profiledraftModalState = atom<string>({
  key: "profiledraftModalState",
  default: ""
});

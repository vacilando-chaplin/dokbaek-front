import { ProfileDarftDataType } from "@/app/profile/[id]/create/types";
import { atom } from "recoil";

export const profileDraftData = atom<ProfileDarftDataType>({
  key: "profileDraftData",
  default: {
    id: 0,
    userId: null,
    status: null,
    info: {
      name: "",
      gender: "M",
      bornYear: 0,
      height: 0,
      weight: 0,
      email: "",
      contact: "",
      instagramLink: "",
      youtubeLink: "",
      introduction: ""
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

export const draftStatus = atom<number>({
  key: "draftStatus",
  default: 0
});

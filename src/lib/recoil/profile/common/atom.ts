import { ProfileDarftDataType } from "@/app/profile/[id]/create/types";
import { atom } from "recoil";

export const profileDraftData = atom<ProfileDarftDataType>({
  key: "profileDraftData",
  default: {
    id: 0,
    userId: null,
    status: null,
    info: null,
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

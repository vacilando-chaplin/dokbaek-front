export interface StepperType {
  name: string;
  id: number;
  path: string;
}

export interface VideoLinkType {
  url: string;
  active: boolean;
}

export interface ProfileInfoDataType {
  name: string | null;
  gender: string | null;
  bornYear: number | string;
  height: number | string;
  weight: number | string;
  email: string | null;
  contact: string | null;
  instagramLink: string | null;
  youtubeLink: string | null;
  introduction: string | null;
}

export interface ProfileEducationRequestType {
  school: {
    name: string;
    schoolType: string;
    schoolGubun: string;
  };
  major: string;
  status: string;
}

export interface ProfileEducationDataType {
  id: number;
  school: {
    name: string;
    schoolType: string;
    schoolGubun: string;
  };
  major: string;
  status: string;
}

export interface ProfilePhotoDataType {
  id: string;
  path: string;
  previewPath: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileRecentPhotoDataType {
  id: string;
  photoType: "FULL_BODY" | "FRONT_FACE" | "LEFT_FACE" | "RIGHT_FACE";
  path: string;
  previewPath: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileFilmoDataType {
  id: number;
  role: {
    id: number;
    name: string;
  };
  customRole: string;
  character: string;
  featured: boolean;
  production: {
    category: {
      id: number;
      name: string;
    };
    productionYear: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
  };
  thumbnailPath: string;
  displayOrder: number;
}

export interface ProfileVideoDataType {
  id: number;
  url: string;
  displayOrder: number;
}

export interface ProfileSpecialtyType {
  id: number;
  specialty: {
    id: number;
    specialtyName: string;
  };
  imageUrl: string;
  mediaUrl: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface ProfileDraftDataType {
  id: number;
  userId: number | null;
  status: string | null;
  info: ProfileInfoDataType;
  mainPhotoPath: string | null;
  mainPhotoPreviewPath: string | null;
  education: ProfileEducationDataType[];
  photos: ProfilePhotoDataType[];
  recentPhotos: ProfileRecentPhotoDataType[];
  stillCuts: ProfilePhotoDataType[];
  filmos: ProfileFilmoDataType[];
  videos: ProfileVideoDataType[];
  specialties: ProfileSpecialtyType[];
  likesCount: number;
  likedByMe: boolean;
  viewsCount: number;
  createdAt: string;
  updatedAt: string;
}

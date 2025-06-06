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
  name: string;
  gender: string;
  bornYear: number | string;
  height: number | string;
  weight: number | string;
  email: string;
  contact: string;
  instagramLink: string;
  youtubeLink: string;
  introduction: string;
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
  photoType: string;
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
  featured: true;
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

export interface ProfileDarftDataType {
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
  createdAt: string;
  updatedAt: string;
}

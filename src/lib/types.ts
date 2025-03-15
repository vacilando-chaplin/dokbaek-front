declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

export interface sizeStyleType {
  large: string;
  medium: string;
  small: string;
  [key: string]: string;
}

export interface CompletionProgressType {
  name: boolean;
  gender: boolean;
  bornYear: boolean;
  height: boolean;
  weight: boolean;
  contact: boolean;
  email: boolean;
  specialty: boolean;
  youtube: boolean;
  instagram: boolean;
  schoolName: boolean;
  schoolMajor: boolean;
  schoolStatus: boolean;
  introduction: boolean;
  profilePhoto: boolean;
  stillcutPhoto: boolean;
  recentPhoto: boolean;
  filmography: boolean;
  video: boolean;
}

export interface ProfileResponseType {
  id: number;
  userId: number;
  status: string;
  info: {
    name: string;
    bornYear: number;
    height: number;
    weight: number;
    email: string;
    contact: string;
    instagramLink: string;
    youtubeLink: string;
    introduction: string;
  };
  mainPhotoPath: string;
  mainPhotoPreviewPath: string;
  education: [
    {
      school: {
        name: string;
        schoolType: string;
        schoolGubun: string;
      };
      major: string;
      status: string;
    }
  ];
  photos: [
    {
      id: string;
      path: string;
      previewPath: string;
      displayOrder: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
  recentPhotos: [
    {
      id: string;
      photoType: string;
      path: string;
      previewPath: string;
      createdAt: string;
      updatedAt: string;
    }
  ];
  stillCuts: [
    {
      id: string;
      path: string;
      previewPath: string;
      displayOrder: number;
      createdAt: string;
      updatedAt: string;
    }
  ];
  filmos: [
    {
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
      displayOrder: number;
    }
  ];
  videos: [
    {
      id: number;
      url: string;
      displayOrder: number;
    }
  ];
  specialties: [
    {
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
  ];
  createdAt: string;
  updatedAt: string;
}

export interface InfoResponseType {
  status: string;
  name: string;
  gender: string;
  bornYear: number;
  height: number;
  weight: number;
  email: string;
  contact: string;
  specialty: string;
  instagramLink: string;
  youtubeLink: string;
  introduction: string;
  education: [
    {
      school: {
        name: string;
        schoolType: string;
        schoolGubun: string;
      };
      major: string;
      status: string;
    }
  ];
}

export interface EducationEnumType {
  GRADUATED: string;
  PENDING: string;
  ENROLLED: string;
  LEAVE_OF_ABSENCE: string;
  COMPLETION: string;
  DROPPED_OUT: string;
}

export interface EducationInitType {
  school: {
    name: string;
    schoolType: string;
    schoolGubun: string;
  };
  major: string;
  status: string;
}

export interface EducationWithIdType {
  id: number;
  school: {
    name: string;
    schoolType: string;
    schoolGubun: string;
  };
  major: string;
  status: string;
}

export interface EducationInputsType {
  name: number;
  school: string;
  major: string;
  status: string;
}

export interface InfoRequiredType {
  name: string;
  birth: string;
  contact: string;
}

export interface PhotoResponseType {
  id: string;
  path: string;
  previewPath: string;
  displayOrder: number;
  createdAt: string;
  updatedAt: string;
}

export interface PhotoRecentResponseType {
  id: string;
  photoType: string;
  path: string;
  previewPath: string;
  createdAt: string;
  updatedAt: string;
}

export interface FilmoRoleType {
  id: number;
  name: string;
}

export interface FilmoCategoryType {
  id: number;
  name: string;
}

export interface FilmoRequestType {
  roleId: number;
  customRole: string;
  character: string;
  featured: boolean;
  production: {
    categoryId: number;
    productionYear: number;
    title: string;
    description: string;
    videoUrl: string;
    thumbnailUrl: string;
  };
  displayOrder: number;
}

export interface FilmoResponseType {
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

export interface VideoResponseType {
  id: number;
  url: string;
  displayOrder: number;
}

export interface SignUpRequestType {
  domain: string;
  accessToken: string;
}

export interface SignUpResponseType {
  token: {
    jwt: string;
    refreshToken: string;
  };
  defaultProfileId: number;
  userId: number;
}

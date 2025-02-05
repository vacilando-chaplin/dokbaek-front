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
    specialty: string;
    instagramLink: string;
    youtubeLink: string;
    introduction: string;
  };
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
      userProfileId: number;
      path: string;
      previewPath: string;
      displayOrder: number;
      isDefault: true;
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
      is_featured: true;
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
      userProfileId: number;
      url: string;
      displayOrder: number;
    }
  ];
  createdAt: string;
  updatedAt: string;
}

export interface InfoResponseType {
  status: string;
  name: string;
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

export interface EducationType {
  school: {
    name: string;
    schoolType: string;
    schoolGubun: string;
  };
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
  userProfileId: number;
  path: string;
  previewPath: string;
  displayOrder: number;
  isDefault: boolean;
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
  is_featured: boolean;
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
  is_featured: boolean;
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

export interface VideoResponseType {
  id: number;
  userProfileId: number;
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
}

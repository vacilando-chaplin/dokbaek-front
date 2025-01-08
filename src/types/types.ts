declare global {
  interface Window {
    Kakao: any;
  }
}

export interface StepperType {
  name: string;
  id: number;
  path: string;
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
    speciality: string;
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

export interface InfoRequiredType {
  name: string;
  birth: string;
  contact: string;
}

export interface InfoActiveType {
  birth: boolean;
  school: boolean;
  education: boolean;
}

export interface InfoInputType {
  name: string;
  birth: string;
  height: string;
  weight: string;
  contact: string;
  email: string;
  speciality: string;
  instagram: string;
  youtube: string;
  introduction: string;
  school: string;
  major: string;
  education: string;
}

export interface InfoRequestType {
  status: string;
  info: {
    name: string;
    bornYear: number;
    height: number;
    weight: number;
    email: string;
    contact: string;
    speciality: string;
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
}

export interface InfoResponseType {
  status: string;
  name: string;
  bornYear: number;
  height: number;
  weight: number;
  email: string;
  contact: string;
  speciality: string;
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

export interface ParameterType {
  height: string | number;
  weight: string | number;
}

export interface SchoolType {
  campusName: string;
  collegeinfourl: string;
  schoolType: string;
  link: string;
  schoolGubun: string;
  adres: string;
  schoolName: string;
  region: string;
  totalCount: string;
  estType: string;
  seq: string;
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

export interface PhotoModalType {
  id: string;
  state: string;
  active: boolean;
  name: string;
  buttonText: string;
}

export interface FilmoRoleType {
  id: number;
  name: string;
}

export interface FilmoCategoryType {
  id: number;
  name: string;
}

export interface FilmoInputType {
  classification: string;
  production: string;
  title: string;
  cast: string;
  castInput: string;
  casting: string;
  description: string;
  link: string;
  thumbnail: string;
  representative: boolean;
  id: number;
  displayOrder: number;
}

export interface FilmoActiveType {
  classification: boolean;
  production: boolean;
  cast: boolean;
}

export interface FilmoModalType {
  state: string;
  active: boolean;
  name: string;
  buttonText: string;
}

export interface FilmoDeleteType {
  id: number;
  active: boolean;
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

export interface VideoModalType {
  id: number;
  state: string;
  active: boolean;
  name: string;
  buttonText: string;
}

export interface VideoLinkType {
  url: string;
  active: boolean;
}

export interface ProfileModalType {
  state: string;
  active: boolean;
}

export interface SelectedPhotoType {
  origin: string;
  blur: string;
}

export interface KakaoDataType {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export interface NaverDataType {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
}

export interface GoogleDataType {
  access_token: string;
  expires_in: string;
  refresh_token: string;
  token_type: string;
}

export interface KakaoDataType {
  access_token: string;
  expires_in: number;
  id_token: string;
  refresh_token: string;
  refresh_token_expires_in: number;
  scope: string;
  token_type: string;
}

export interface APIResponse<T> {
  data: T;
  status: string;
}

export interface SignUpRequestType {
  domain: string;
  accessToken: string;
  deviceId: string;
}

export interface SignUpResponseType {
  token: {
    jwt: string;
    refreshToken: string;
  };
  defaultProfileId: number;
}

export interface SignOutRequestType {
  refreshToken: string;
  deviceId: string;
}
export interface RefreshRequestType {
  refreshToken: string;
  deviceId: string;
}
export interface recentProfile {
  id: number;
  name: string;
  height: number;
  weight: number;
  bornYear: number;
}

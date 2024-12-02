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

export interface infoRequiredType {
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
  specialty: string;
  instagram: string;
  youtube: string;
  introduction: string;
  school: string;
  major: string;
  education: string;
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

export interface OriginPhotoType {
  originImage: string;
  id: string;
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

export interface KakaoDataType {
  access_token: string;
  expires_in: number;
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

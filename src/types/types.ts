declare global {
  interface Window {
    Kakao: any;
  }
}

export interface StepperTypes {
  name: string;
  id: number;
}

export interface infoInputsTypes {
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

export interface infoActivesTypes {
  birth: boolean;
  school: boolean;
  education: boolean;
}

export interface ParameterTypes {
  height: string | number;
  weight: string | number;
}

export interface SchoolTypes {
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

export interface ActiveTypes {
  birth: boolean;
  education: boolean;
  school: boolean;
}

export interface PhotoTypes {
  photo: string;
  id: number;
}

export interface filmoInputsTypes {
  classification: string;
  production: string;
  title: string;
  cast: string;
  casting: string;
  description: string;
  link: string;
  thumbnail: string;
  representative: boolean;
  id: string;
}

export interface filmoActivesTypes {
  classification: boolean;
  production: boolean;
  cast: boolean;
}

export interface VideoTypes {
  link: string;
  id: number;
}

export interface KakaoDataTypes {
  data: {
    access_token: string;
    expires_in: number;
    refresh_token: string;
    refresh_token_expires_in: number;
    scope: string;
    token_type: string;
  };
}

export interface SignUpRequestTypes {
  domain: string;
  accessToken: string;
  deviceId: string;
}

export interface SignUpResponseTypes {
  token: {
    jwt: string;
    refreshToken: string;
  };
  defaultProfileId: number;
}

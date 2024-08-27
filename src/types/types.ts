export interface StepperTypes {
  name: string;
  id: number;
}

export interface InputsTypes {
  name: string;
  specialty: string;
  link: string;
  major: string;
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

export interface ImageSrcTypes {
  main: string | null;
  sub1: string | null;
  sub2: string | null;
  sub3: string | null;
  sub4: string | null;
  sub5: string | null;
}

export interface ModalOpenTypes {
  state: boolean;
  type: string;
}

export interface FilmographySelectTypes {
  classification: string;
  production: string;
  cast: string;
}

export interface FilmographyActiveTypes {
  classification: boolean;
  production: boolean;
  cast: boolean;
}

export interface FilmographyInputsTypes {
  title: string;
  casting: string;
  clarification: string;
}

export interface FilmographyItemsTypes {
  classification: string;
  production: string;
  title: string;
  cast: string;
  casting: string;
  clarification: string;
  representive: boolean;
  id: string;
}

export interface EditModalOpenTypes {
  state: boolean;
  id: string;
}

export interface InfoTypes {
  name: string;
  birth: string;
  height: string;
  weight: string;
  specialty: string;
  contact: string;
  link: string;
  school: string;
  major: string;
  education: string;

  selectLayout: string;
  mainImage: string;
  subImage1: string;
  subImage2: string;
  subImage3: string;
  subImage4: string;
  subImage5: string;

  filmography: FilmographyItemsTypes[];
}

export interface PreviewImgTypes {
  main: string;
  sub: string;
  extra: string;
}

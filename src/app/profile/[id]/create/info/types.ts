export interface InfoInputType {
  name: string;
  gender: string;
  bornYear: string;
  height: string;
  weight: string;
  contact: string;
  email: string;
  instagram: string;
  youtube: string;
  introduction: string;
}

export interface InfoActiveType {
  bornYear: boolean;
}

export interface InfoEducationType {
  school: string;
  major: string;
  education: string;
}

export interface InfoEducationActiveType {
  school: boolean;
  education: boolean;
}

export interface InfoDataType {
  name: string;
  gender: string;
  bornYear: number;
  height: number;
  weight: number;
  email: string;
  contact: string;
  instagramLink: string;
  youtubeLink: string;
  introduction: string;
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

export interface SpecialtyType {
  id: number;
  specialtyName: string;
  imageUrl?: string;
  mediaUrl?: string;
}
export interface SpecialtyItemType {
  createdAt: string | null;
  displayOrder: number | null;
  id: number | null;
  imageUrl: string | null;
  mediaUrl: string | null;
  specialty: { id: number; specialtyName: string } | null;
  updatedAt: string | null;
}

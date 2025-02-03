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

export interface InfoActiveType {
  birth: boolean;
  school: boolean;
  education: boolean;
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

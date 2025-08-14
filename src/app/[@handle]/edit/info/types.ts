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
  specialtyId: number;
  specialtyName: string;
  imageUrl?: string;
  mediaUrl?: string;
}
export interface SpecialtyItemType {
  createdAt: string | null;
  displayOrder: number | null;
  id: number;
  imageUrl: string | null;
  mediaUrl: string | null;
  specialty: { id: number; specialtyName: string };
  updatedAt: string | null;
}

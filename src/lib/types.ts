import { ProfileShowcaseResponseType } from "@/app/home/types";

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

export interface FilmoRoleType {
  id: number;
  name: string;
}

export interface FilmoCategoryType {
  id: number;
  name: string;
}

export interface TermsDataType {
  id: number;
  name: string;
  url: string;
  required: boolean;
}

export interface TermAgreementsType {
  termId: number;
  agreed: boolean;
}

export interface SignUpRequestType {
  domain: string | null;
  tempCode: string | null;
  termAgreements: TermAgreementsType[];
}

export interface SignInRequestType {
  domain: string | null;
  tempCode: string | null;
}

export type ProfilePathType = "info" | "photo" | "filmo" | "video";

export type MyProfileIdType = number | undefined | null;

export interface ProfileShowcaseType {
  profiles: ProfileShowcaseResponseType[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
  isLoading: boolean;
}

export type GenderType = "U" | "M" | "F";

import { ProfileShowcaseResponseType } from "../home/types";

export interface ProfileLikedParams {
  page?: number | null;
  size?: number | null;
}

export interface LikedProfileShowcaseType {
  profiles: ProfileShowcaseResponseType[];
  currentPage: number;
  totalElements: number;
  totalPages: number;
  hasNext: boolean;
}

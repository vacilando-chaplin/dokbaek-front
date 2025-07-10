export type CategoryKey = "photos" | "stillCuts" | "recentPhotos";

export type RecentPhotoCategory =
  | "FULL_BODY"
  | "FRONT_FACE"
  | "LEFT_FACE"
  | "RIGHT_FACE"
  | "";

export interface RecentPhotoDataType {
  photoType: RecentPhotoCategory;
  name: string;
}

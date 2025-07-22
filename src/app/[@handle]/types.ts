export type SelectedPhotoLabelType = "photos" | "stillCuts" | "recentPhotos";

export interface PhotoOriginModalType {
  active: boolean;
  path: string;
  id: string;
  index: number;
}

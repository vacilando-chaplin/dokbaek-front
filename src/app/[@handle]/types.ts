export type SelectedPhotoLabelType = "photos" | "stillCuts" | "recentPhotos";

export interface PhotoOriginModalType {
  active: boolean;
  path: string;
  id: string;
  index: number;
}

export interface YoutubeModalType {
  url: string;
  active: boolean;
}

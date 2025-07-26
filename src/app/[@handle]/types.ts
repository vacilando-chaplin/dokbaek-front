import { Coordinates } from "react-advanced-cropper";

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

export interface SelectedPhotoType {
  index: number;
  photoId: string;
  origin: string;
}

export interface PhotoModalType {
  id: string;
  state: string;
  active: boolean;
  name: string;
  buttonText: string;
  category: string;
}

export interface SelectedImagesType {
  id: number;
  origin: string;
  preview: string;
  originImage: string;
  cropData: Coordinates | null;
}

export interface CropDataType {
  top: number;
  left: number;
  width: number;
  height: number;
}

export interface ProfileModalType {
  state: "" | "deleteMainPhoto" | "profileEdit" | "photo" | "filmo";
  active: boolean;
}

export interface ProfilePhotoModalType {
  state: string;
  active: boolean;
  name: string;
  buttonText: string;
}

export type PhotoLabelType = "profilePhoto" | "stillcutPhoto" | "recentPhoto";

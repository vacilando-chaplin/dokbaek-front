export interface SelectedPhotoType {
  origin: string;
  blur: string;
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
  origin: string;
  preview: string;
  originImage: string;
  cropData: CropDataType;
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

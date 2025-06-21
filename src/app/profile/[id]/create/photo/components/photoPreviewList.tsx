import { SelectedImagesType } from "../../../types";
import { ProfilePhotoDataType } from "../../types";
import PhotoPreviewCard from "./photoPreviewCard";

interface PhotoPreviewListProps {
  previewPhotoList: ProfilePhotoDataType[];
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImagesType[]>>;
}

const PhotoPreviewList = ({
  previewPhotoList,
  setCropImage,
  setSelectImage,
  setSelectedImages
}: PhotoPreviewListProps) => {
  return (
    <div className="grid w-full grid-cols-4 gap-2">
      {previewPhotoList.map((previewPhoto: ProfilePhotoDataType) => {
        return (
          <PhotoPreviewCard
            previewPhoto={previewPhoto}
            setCropImage={setCropImage}
            setSelectImage={setSelectImage}
            setSelectedImages={setSelectedImages}
          />
        );
      })}
    </div>
  );
};

export default PhotoPreviewList;

"use client";

import { useDropzone } from "react-dropzone";
import { SelectedImagesType } from "../../../types";
import { ProfilePhotoDataType } from "../../types";
import PhotoPreviewCard from "./photoPreviewCard";
import { CategoryKey } from "../types";

interface PhotoPreviewListProps {
  category: CategoryKey;
  listSize: number;
  previewPhotoList: ProfilePhotoDataType[];
  setCropImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectImage: React.Dispatch<React.SetStateAction<string>>;
  setSelectedImages: React.Dispatch<React.SetStateAction<SelectedImagesType[]>>;
  onDrop: (images: File[], rejectedFiles: any[]) => void;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCropModalOpen: (category: string) => void;
}

const PhotoPreviewList = ({
  category,
  listSize,
  previewPhotoList,
  setCropImage,
  setSelectImage,
  setSelectedImages,
  onDrop,
  onSelectFile,
  onCropModalOpen
}: PhotoPreviewListProps) => {
  const { getRootProps, getInputProps, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": []
      },
      onDrop,
      multiple: true,
      maxFiles: 20 - listSize,
      maxSize: 10000000
    });
  return (
    <div
      className={`grid w-full cursor-pointer grid-cols-4 gap-2 rounded-xl hover:border hover:border-dotted hover:border-accent-primary-light hover:bg-accent-light-light dark:hover:border-accent-primary-dark dark:hover:bg-accent-light-dark ${isDragAccept ? "border border-dotted border-accent-primary-light bg-accent-light-light dark:border-accent-primary-dark dark:bg-accent-light-dark" : isDragReject ? "hover:border hover:border-dotted hover:border-state-negative-light hover:bg-red-50 hover:dark:border-state-negative-dark" : "border-gray-150 bg-gray-50 dark:border-border-active-light dark:bg-gray-800"}`}
      {...getRootProps()}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onClick={() => onCropModalOpen}
        onChange={onSelectFile}
        {...getInputProps()}
      />
      {previewPhotoList.map((previewPhoto: ProfilePhotoDataType) => {
        return (
          <PhotoPreviewCard
            key={previewPhoto.id}
            category={category}
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

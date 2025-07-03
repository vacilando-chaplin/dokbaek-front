"use client";

import EmptyPhotoFrame from "./emptyPhotoFrame";
import { useRecoilState, useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { cropDataInit } from "../../../data";
import PhotoInfoForm from "./photoInfoForm";
import { useImageSelector } from "@/lib/hooks";
import PhotoPreviewList from "./photoPreviewList";
import { cropModalState } from "@/lib/recoil/profile/photo/atom";
import imageCompression from "browser-image-compression";
import { imageCompressionOptions } from "@/lib/data";
import { convertToBase64 } from "@/lib/utils";
import PhotoCropModal from "./photoCropModal";
import { photoModalInit } from "../data";
import { CategoryKey } from "../types";

interface PhotoUploadSectionProps {
  category: CategoryKey;
}

const PhotoUploadSection = ({ category }: PhotoUploadSectionProps) => {
  const profileData = useRecoilValue(profileDraftData);
  const [cropModal, setCropModal] = useRecoilState(cropModalState);

  const photoList =
    profileData &&
    (category === "photos"
      ? profileData.photos
      : category === "stillCuts"
        ? profileData.stillCuts
        : []);

  const {
    cropImage,
    selectImage,
    selectedImages,
    setCropImage,
    setSelectImage,
    setSelectedImages,
    onSelectFile
  } = useImageSelector();

  // 사진 추가 모달 열기
  const onCropModalOpen = (category: string) => {
    setCropModal({
      id: "",
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category: category
    });
  };

  // 사진 추가 모달 닫기
  const onCropModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setSelectedImages([
      {
        id: 0,
        origin: "",
        preview: "",
        originImage: "",
        cropData: cropDataInit
      }
    ]);
    setCropModal(photoModalInit);
  };

  // 사진 드래그 앤 드랍
  const onPhotoDrop = async (images: File[], rejectedFiles: File[]) => {
    if (rejectedFiles.length > 0) {
      return;
    }

    let fileData: any = [];

    for (const file of images) {
      const downSizedFile = await imageCompression(
        file,
        imageCompressionOptions
      );
      const downSizedImage = await convertToBase64(downSizedFile);

      fileData = fileData.concat([
        {
          id: Math.random(),
          origin: downSizedImage,
          preview: downSizedImage,
          originImage: downSizedImage,
          cropData: cropDataInit
        }
      ]);
    }

    setCropImage(fileData[0].preview);
    setSelectImage(fileData[0].originImage);
    setSelectedImages(fileData);
    setCropModal({
      id: "",
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category: category
    });
  };

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <PhotoInfoForm
        title={
          category === "photos"
            ? "프로필 사진"
            : category === "stillCuts"
              ? "스틸컷"
              : ""
        }
        helperText={
          category === "photos"
            ? "자신의 매력을 가장 잘 보여줄 수 있는 프로필 사진을 추가해주세요."
            : category === "stillCuts"
              ? "출연할 작품 안에서의 모습이 담긴 사진을 추가해주세요."
              : ""
        }
        disabled={photoList.length >= 20}
        limitValue={photoList.length}
        onModalOpen={() => onCropModalOpen(category)}
        onSelectFile={onSelectFile}
      />
      {photoList.length >= 1 ? (
        <PhotoPreviewList
          category={category}
          listSize={photoList.length}
          previewPhotoList={photoList}
          setCropImage={setCropImage}
          setSelectImage={setSelectImage}
          setSelectedImages={setSelectedImages}
          onDrop={onPhotoDrop}
          onSelectFile={onSelectFile}
          onCropModalOpen={() => onCropModalOpen(category)}
        />
      ) : (
        <EmptyPhotoFrame
          text="추가할 사진을 끌어다 놓으세요."
          listSize={photoList.length}
          onDrop={onPhotoDrop}
          onCropModalOpen={() => onCropModalOpen(category)}
          onChange={onSelectFile}
        />
      )}
      {cropModal.active && selectedImages.length >= 1 && (
        <PhotoCropModal
          cropImage={cropImage}
          cropModal={cropModal}
          selectImage={selectImage}
          selectedImages={selectedImages}
          setCropImage={setCropImage}
          setCropModal={setCropModal}
          setSelectImage={setSelectImage}
          setSelectedImages={setSelectedImages}
          onCropModalClose={onCropModalClose}
        />
      )}
    </section>
  );
};

export default PhotoUploadSection;

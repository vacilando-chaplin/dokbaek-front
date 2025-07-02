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

const PhotoProfile = () => {
  const profileData = useRecoilValue(profileDraftData);
  const [cropModal, setCropModal] = useRecoilState(cropModalState);

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
      category: "photos"
    });
  };

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <PhotoInfoForm
        title="프로필 사진"
        helperText="자신의 매력을 가장 잘 보여줄 수 있는 프로필 사진을 추가해주세요."
        disabled={profileData?.photos && profileData.photos.length >= 20}
        limitValue={profileData?.photos && profileData.photos.length}
        onModalOpen={() => onCropModalOpen("photos")}
        onSelectFile={onSelectFile}
      />
      {profileData?.photos && profileData.photos.length >= 1 ? (
        <PhotoPreviewList
          previewPhotoList={profileData.photos}
          setCropImage={setCropImage}
          setSelectImage={setSelectImage}
          setSelectedImages={setSelectedImages}
        />
      ) : (
        <EmptyPhotoFrame
          text="추가할 사진을 끌어다 놓으세요."
          listSize={profileData?.photos && profileData.photos.length}
          onDrop={onPhotoDrop}
          onCropModalOpen={() => onCropModalOpen("photos")}
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

export default PhotoProfile;

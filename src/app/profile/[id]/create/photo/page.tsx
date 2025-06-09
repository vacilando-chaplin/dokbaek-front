"use client";

import { deletePhoto, postPhoto, patchPhoto } from "@/lib/api";
import { completionProgress, profileIdInit, toastMessage } from "@/lib/atoms";
import { PhotoRecentResponseType, PhotoResponseType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { photoModalInit } from "./data";
import PhotoModal from "./components/photoModal";
import PhotoProfile from "./components/photoProfile";
import PhotoStillCut from "./components/photoStillCut";
import PhotoRecent from "./components/photoRecent";
import imageCompression from "browser-image-compression";
import { convertToBase64, getFileMimeTypeFromUrl, isValid } from "@/lib/utils";
import { postRecentPhoto, postRecentPhotoEdit } from "./api";
import { CropDataType, PhotoModalType, SelectedImagesType } from "../../types";
import { imageCompressionOptions } from "@/lib/data";
import { cropDataInit } from "../../data";
import { getProfileDraftClient } from "../../api";
import Cookies from "js-cookie";
import {
  profileDraftData,
  profileDraftModalState
} from "@/lib/recoil/profile/common/atom";

const Photo = () => {
  const profileId = Number(Cookies.get("loginProfileId"));
  const profileDraftState = useRecoilValue(profileDraftModalState);
  const setToastMessage = useSetRecoilState(toastMessage);
  const [completion, setCompletion] = useRecoilState(completionProgress);
  const profileData = useRecoilValue(profileDraftData);

  const [photoList, setPhotoList] = useState<PhotoResponseType[]>(
    profileData.photos
  );
  const [stillCutList, setStillCutList] = useState<PhotoResponseType[]>(
    profileData.stillCuts
  );
  const [recentPhotoList, setRecentPhotoList] = useState<
    PhotoRecentResponseType[]
  >(profileData.recentPhotos);

  // 이미지 크롭할 때 사진
  const [selectImage, setSelectImage] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [selectedPhotoId, setSelectedPhotoId] = useState(0);
  const [cropData, setCropData] = useState<CropDataType>(cropDataInit);
  const [selectedImages, setSelectedImages] = useState<SelectedImagesType[]>([
    {
      origin: "",
      preview: "",
      originImage: "",
      cropData: cropDataInit
    }
  ]);

  const [photoModal, setPhotoModal] = useState<PhotoModalType>(photoModalInit);
  const [photoDeleteActive, setPhotoDeleteActive] = useState(false);

  // 사진 드래그 앤 드랍
  const onProfileDrop = async (images: File[], rejectedFiles: File[]) => {
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
    setSelectedPhotoId(0);
    setPhotoModal({
      ...photoModal,
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category: "photo"
    });
  };

  const onStillCutDrop = async (images: File[], rejectedFiles: File[]) => {
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

    setSelectImage(fileData[0].originImage);
    setCropImage(fileData[0].preview);
    setSelectedImages(fileData);
    setSelectedPhotoId(0);
    setPhotoModal({
      ...photoModal,
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category: "stillcut"
    });
  };

  // 모달에서 사진 여러개 업로드 시 사진 선택
  const onSelectImage = (index: number) => {
    const updateImages = [...selectedImages];
    updateImages[selectedPhotoId] = {
      origin: selectedImages[selectedPhotoId].origin,
      preview: cropImage,
      originImage: selectImage,
      cropData: cropData
    };
    setSelectedImages(updateImages);
    setSelectedPhotoId(index);

    const image = selectedImages[index].originImage;
    const cropedImage = selectedImages[index].preview;
    const coordinates = selectedImages[index].cropData;

    setCropData(coordinates);
    setCropImage(cropedImage);
    setSelectImage(image);
  };

  // 사진 추가 모달 저장
  const onAddPhoto = async () => {
    if (photoModal.category === "photo") {
      if (selectedImages.length > 1) {
        for (const [index, images] of selectedImages.entries()) {
          await postPhoto(
            profileId,
            images.origin,
            selectedPhotoId === index ? cropImage : images.preview,
            "photo"
          );
        }
      } else {
        await postPhoto(
          profileId,
          selectedImages[0].origin,
          cropImage,
          "photo"
        );
      }
      setCompletion({ ...completion, profilePhoto: true });
    } else if (photoModal.category === "stillcut") {
      if (selectedImages.length > 1) {
        for (const [index, images] of selectedImages.entries()) {
          await postPhoto(
            profileId,
            images.origin,
            selectedPhotoId === index ? cropImage : images.preview,
            "stillcut"
          );
        }
      } else {
        await postPhoto(
          profileId,
          selectedImages[0].origin,
          cropImage,
          "stillcut"
        );
      }
      setCompletion({ ...completion, stillcutPhoto: true });
    }
    const res = await getProfileDraftClient(profileId);
    const data = res.data;

    setPhotoList(data.photos);
    setStillCutList(data.stillCuts);
    setRecentPhotoList(data.recentPhotos);
    setPhotoModal(photoModalInit);
    setSelectedPhotoId(0);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 추가했어요.");
  };

  // 사진 편집 모달 완료
  const onEditPhoto = async () => {
    await patchPhoto(profileId, cropImage, photoModal.id, photoModal.category);

    const res = await getProfileDraftClient(profileId);
    const data = res.data;

    setPhotoList(data.photos);
    setStillCutList(data.stillCuts);
    setPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 수정했어요.");
  };

  // 최근 사진 추가 모달 저장
  const onAddRecentPhoto = async () => {
    await postRecentPhoto(
      profileId,
      selectImage,
      cropImage,
      photoModal.category
    );

    const res = await getProfileDraftClient(profileId);
    const data = res.data;

    setCompletion({ ...completion, recentPhoto: true });
    setRecentPhotoList(data.recentPhotos);
    setPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 추가했어요.");
  };

  // 최근 사진 편집 모달 완료
  const onEditRecentPhoto = async () => {
    await postRecentPhotoEdit(profileId, selectImage, cropImage, photoModal.id);

    const res = await getProfileDraftClient(profileId);
    const data = res.data;

    setRecentPhotoList(data.recentPhotos);
    setPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 수정했어요.");
  };

  // 사진 삭제 모달 버튼 클릭
  const onDeletePhoto = async (id: string, category: string) => {
    await deletePhoto(profileId, id, category);

    const res = await getProfileDraftClient(profileId);
    const data = res.data;

    isValid(data.photos)
      ? setCompletion({ ...completion, profilePhoto: true })
      : setCompletion({ ...completion, profilePhoto: false });

    isValid(data.stillCuts)
      ? setCompletion({ ...completion, stillcutPhoto: true })
      : setCompletion({ ...completion, stillcutPhoto: false });

    isValid(data.recentPhotos)
      ? setCompletion({ ...completion, recentPhoto: true })
      : setCompletion({ ...completion, recentPhoto: false });

    setPhotoList(data.photos);
    setStillCutList(data.stillCuts);
    setRecentPhotoList(data.recentPhotos);
    setPhotoDeleteActive(!photoDeleteActive);
    setToastMessage("사진을 삭제했어요.");
  };

  // 사진 추가 모달 열기
  const onPhotoModalOpen = (category: string) => {
    setSelectedPhotoId(0);
    setPhotoModal({
      ...photoModal,
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category: category
    });
  };

  // 사진 추가 모달 닫기
  const onPhotoModalClose = (e: any) => {
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
    setPhotoModal(photoModalInit);
  };

  // 사진 편집 모달 오픈
  const onPhotoEditModalOpen = async (
    photo: PhotoResponseType,
    category: string
  ) => {
    const mimeType = await getFileMimeTypeFromUrl(photo.path);
    const response = await fetch(photo.path);
    const blob = await response.blob();
    const file = new File([blob], "image", { type: mimeType });

    const downSizedFile = await imageCompression(file, imageCompressionOptions);
    const downSizedImage = await convertToBase64(downSizedFile);

    setCropImage(downSizedImage);
    setSelectImage(downSizedImage);
    setSelectedImages([
      {
        origin: downSizedImage,
        preview: downSizedImage,
        originImage: downSizedImage,
        cropData: cropDataInit
      }
    ]);
    setPhotoModal({
      id: photo.id,
      state: "edit",
      active: true,
      name: "사진 편집",
      buttonText: "완료",
      category: category
    });
  };

  // 사진 삭제 모달 액티브
  const onDeletePhotoActive = () => {
    setPhotoDeleteActive(!photoDeleteActive);
  };

  // 사진 모달에 크롭 할 이미지 선택
  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const originImage = await convertToBase64(file);
      const downSizedFile = await imageCompression(
        file,
        imageCompressionOptions
      );
      const downSizedImage = await convertToBase64(downSizedFile);

      setSelectImage(downSizedImage);
      setCropImage(downSizedImage);
      setSelectedImages([
        {
          origin: originImage,
          preview: downSizedImage,
          originImage: selectImage,
          cropData: cropDataInit
        }
      ]);
    }
    e.target.value = "";
  };

  // 사진 리스트 업데이트
  // useEffect(() => {
  //   const getProfileData = async () => {
  //     if (isDraftLoading) {
  //       const res = await getProfileDraftClient(profileId);
  //       const data = await res.data;

  //       isValid(data.photos)
  //         ? setCompletion({ ...completion, profilePhoto: true })
  //         : setCompletion({ ...completion, profilePhoto: false });

  //       isValid(data.stillCuts)
  //         ? setCompletion({ ...completion, stillcutPhoto: true })
  //         : setCompletion({ ...completion, stillcutPhoto: false });

  //       isValid(data.recentPhotos)
  //         ? setCompletion({ ...completion, recentPhoto: true })
  //         : setCompletion({ ...completion, recentPhoto: false });

  //       setPhotoList(data.photos);
  //       setStillCutList(data.stillCuts);
  //       setRecentPhotoList(data.recentPhotos);
  //     }
  //   };
  //   getProfileData();
  // }, [isDraftLoading]);

  useEffect(() => {
    if (profileDraftState !== "") {
      setPhotoList(profileData.photos);
      setStillCutList(profileData.stillCuts);
      setRecentPhotoList(profileData.recentPhotos);
    }
  }, [profileDraftState]);

  return (
    <div className="flex w-[65vw] flex-col gap-4">
      <PhotoProfile
        photoList={photoList}
        photoDeleteActive={photoDeleteActive}
        onSelectFile={onSelectFile}
        onPhotoModalOpen={onPhotoModalOpen}
        onPhotoEditModalOpen={onPhotoEditModalOpen}
        onDeletePhoto={onDeletePhoto}
        onDeletePhotoActive={onDeletePhotoActive}
        onDrop={onProfileDrop}
      />
      {photoModal.active && (
        <PhotoModal
          selectImage={selectImage}
          selectedImages={selectedImages}
          selectedPhotoId={selectedPhotoId}
          photoModal={photoModal}
          onModalActive={onPhotoModalClose}
          onAddPhoto={
            photoModal.category === "photo" ||
            photoModal.category === "stillcut"
              ? onAddPhoto
              : onAddRecentPhoto
          }
          onEditPhoto={
            photoModal.category === "photo" ||
            photoModal.category === "stillcut"
              ? onEditPhoto
              : onEditRecentPhoto
          }
          setCropData={setCropData}
          setCropImage={setCropImage}
          onSelectImage={onSelectImage}
        />
      )}
      <PhotoStillCut
        stillCutList={stillCutList}
        photoDeleteActive={photoDeleteActive}
        onSelectFile={onSelectFile}
        onPhotoModalOpen={onPhotoModalOpen}
        onPhotoEditModalOpen={onPhotoEditModalOpen}
        onDeletePhoto={onDeletePhoto}
        onDeletePhotoActive={onDeletePhotoActive}
        onDrop={onStillCutDrop}
      />
      <PhotoRecent
        recentPhotoList={recentPhotoList}
        photoDeleteActive={photoDeleteActive}
        onSelectFile={onSelectFile}
        onPhotoModalOpen={onPhotoModalOpen}
        onPhotoEditModalOpen={onPhotoEditModalOpen}
        onDeletePhoto={onDeletePhoto}
        onDeletePhotoActive={onDeletePhotoActive}
      />
    </div>
  );
};

export default Photo;

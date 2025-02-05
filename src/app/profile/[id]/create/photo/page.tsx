"use client";

import {
  convertImageToBase64,
  deletePhoto,
  getProfile,
  postPhoto,
  postPhotoEdit
} from "@/lib/api";
import { defaultId, toastMessage } from "@/lib/atoms";
import { PhotoResponseType } from "@/lib/types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { PhotoModalType } from "./types";
import { photoModalInit } from "./data";
import PhotoModal from "./components/photoModal";
import PhotoProfile from "./components/photoProfile";
import PhotoStillCut from "./components/photoStillCut";
import PhotoRecent from "./components/photoRecent";

const Photo = () => {
  const userId = useRecoilValue(defaultId);
  const setToastMessage = useSetRecoilState(toastMessage);

  const [photoList, setPhotoList] = useState<PhotoResponseType[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const onDrop = (images: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      return;
    }

    setSelectedImages(images);
    setPhotoModal({
      ...photoModal,
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가"
    });
  };

  // 이미지 크롭할 때 사진
  const [selectImage, setSelectImage] = useState("");
  const [cropImage, setCropImage] = useState("");

  const [photoModal, setPhotoModal] = useState<PhotoModalType>(photoModalInit);
  const [photoDeleteActive, setPhotoDeleteActive] = useState(false);

  // 사진 추가 모달 저장
  const onAddPhoto = async () => {
    if (cropImage) {
      const res = await postPhoto(userId, selectImage, cropImage);
      const data = res.data;

      setPhotoList([...photoList, data]);
    } else {
      const res = await postPhoto(userId, selectImage, selectImage);
      const data = res.data;

      setPhotoList([...photoList, data]);
    }

    setPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 추가했어요.");
  };

  // 사진 편집 모달 완료
  const onEditPhoto = async () => {
    await postPhotoEdit(userId, selectImage, cropImage, photoModal.id);

    const res = await getProfile(userId);
    const data = res.data;

    setPhotoList(data.photos);
    setPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 수정했어요.");
  };

  // 사진 삭제 모달 버튼 클릭
  const onDeletePhoto = async (id: string) => {
    await deletePhoto(userId, id);

    const res = await getProfile(userId);
    const data = res.data;

    setPhotoList(data.photos);
    setPhotoDeleteActive(!photoDeleteActive);
    setToastMessage("사진을 삭제했어요.");
  };

  const onPhotoModalOpen = () => {
    setPhotoModal({
      ...photoModal,
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가"
    });
  };

  // 사진 추가 모달 닫기
  const onPhotoModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setPhotoModal({ ...photoModal, active: false });
  };

  // 사진 삭제 모달 액티브
  const onDeletePhotoActive = () => {
    setPhotoDeleteActive(!photoDeleteActive);
  };

  // 사진 편집 모달 오픈
  const onPhotoEditModalOpen = async (photo: PhotoResponseType) => {
    const originPhoto = await convertImageToBase64(photo.path);

    setCropImage(originPhoto);
    setSelectImage(originPhoto);
    setPhotoModal({
      id: photo.id,
      state: "edit",
      active: true,
      name: "사진 편집",
      buttonText: "완료"
    });
  };

  // 사진 모달에 크롭 할 이미지 선택
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        setCropImage(reader.result?.toString() || "");
        setSelectImage(reader.result?.toString() || "");
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    e.currentTarget.value = "";
  };

  // 사진 리스트 업데이트
  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfile(userId);
      const data = await res.data;
      setPhotoList(data.photos);
    };
    getProfileData();
  }, []);

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
        onDrop={onDrop}
      />
      {photoModal.active && (
        <PhotoModal
          selectImage={selectImage}
          photoModal={photoModal}
          onModalActive={onPhotoModalClose}
          onAddPhoto={onAddPhoto}
          onEditPhoto={onEditPhoto}
          setCropImage={setCropImage}
        />
      )}
      <PhotoStillCut
        photoList={photoList}
        photoDeleteActive={photoDeleteActive}
        onSelectFile={onSelectFile}
        onPhotoModalOpen={onPhotoModalOpen}
        onPhotoEditModalOpen={onPhotoEditModalOpen}
        onDeletePhoto={onDeletePhoto}
        onDeletePhotoActive={onDeletePhotoActive}
        onDrop={onDrop}
      />
      <PhotoRecent />
    </div>
  );
};

export default Photo;

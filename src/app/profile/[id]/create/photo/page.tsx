"use client";

import {
  deletePhoto,
  patchPhotoDefault,
  postPhoto,
  postPhotoEdit
} from "@/api/api";
import PhotoEditModal from "@/components/organisms/photoEditModal";
import PhotoMain from "@/components/organisms/photoMain";
import PhotoModal from "@/components/organisms/photoModal";
import { defaultId, jwt, toastMessage } from "@/data/atom";
import { photoResponseInit } from "@/data/data";
import { OriginPhotoType, PhotoResponseType } from "@/types/types";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Photo = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const setToastMessage = useSetRecoilState(toastMessage);

  const [photoList, setPhotoList] = useState<PhotoResponseType[]>([]);
  const [originPhotoList, setOriginPhotoList] = useState<OriginPhotoType[]>([]);
  const [selectImage, setSelectImage] = useState("");
  const [cropImage, setCropImage] = useState("");
  const [photoModalActive, setPhotoModalActive] = useState(false);
  const [photoEditModalActive, setPhotoEditModalActive] = useState(false);
  const [photoDeleteActive, setPhotoDeleteActive] = useState(false);
  const [photoRepresentativeActive, setPhotoRepresentativeActive] =
    useState(false);
  const [editPhoto, setEditPhoto] =
    useState<PhotoResponseType>(photoResponseInit);
  const [repPhoto, setRepPhoto] =
    useState<PhotoResponseType>(photoResponseInit);
  const [editRepPhoto, setEditRepPhoto] =
    useState<PhotoResponseType>(photoResponseInit);

  // 사진 추가 모달 저장
  const onAddPhoto = async () => {
    try {
      if (cropImage) {
        const res = await postPhoto(userId, selectImage, cropImage, token);
        const data = res.data;

        const originPhoto = { originImage: selectImage, id: data.id };
        setOriginPhotoList([...originPhotoList, originPhoto]);

        if (photoList.length === 0) {
          data.isDefault = true;
          setRepPhoto(data);
        }
        setPhotoList([...photoList, data]);
      } else {
        const res = await postPhoto(userId, selectImage, selectImage, token);
        const data = res.data;

        const originPhoto = { originImage: selectImage, id: data.id };
        setOriginPhotoList([...originPhotoList, originPhoto]);

        if (photoList.length === 0) {
          data.isDefault = true;
          setRepPhoto(data);
        }
        setPhotoList([...photoList, data]);
      }
    } catch (error) {
      throw error;
    }
    setPhotoModalActive(!photoModalActive);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 추가했어요.");
  };

  // 사진 편집 모달 완료
  const onEditPhoto = async () => {
    try {
      const res = await postPhotoEdit(
        userId,
        selectImage,
        cropImage,
        token,
        editPhoto.id
      );
      const data = res.data;
      setPhotoList([...photoList, data]);
    } catch (error) {
      throw error;
    }
    setPhotoEditModalActive(!photoEditModalActive);
    setSelectImage("");
    setCropImage("");
    setEditPhoto(photoResponseInit);
    setToastMessage("사진을 수정했어요.");
  };

  // 사진 삭제 모달 삭제 버튼 클릭
  const onDeletePhoto = async (id: string) => {
    try {
      await deletePhoto(userId, id, token);
      setPhotoList((prev: PhotoResponseType[]) =>
        prev.filter((photo: PhotoResponseType) => photo.id !== id)
      );
    } catch (error) {
      throw error;
    }
    setPhotoDeleteActive(!photoDeleteActive);
    setToastMessage("사진을 삭제했어요.");
  };

  // 사진 추가 모달 액티브
  const onPhotoModalActive = () => {
    setCropImage("");
    setSelectImage("");
    setPhotoModalActive(!photoModalActive);
  };

  // 사진 삭제 모달 액티브
  const onDeletePhotoActive = () => {
    setPhotoDeleteActive(!photoDeleteActive);
  };

  // 사진 편집 모달 오픈
  const onPhotoEditModalOpen = (photo: PhotoResponseType) => {
    const index = originPhotoList.findIndex(
      (origin: OriginPhotoType) => origin.id === photo.id
    );

    setEditPhoto(photo);
    setCropImage(originPhotoList[index].originImage);
    setSelectImage(originPhotoList[index].originImage);
    setPhotoEditModalActive(!photoEditModalActive);
  };

  // 사진 편집 모달 닫기(취소)
  const onPhotoEditModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setEditPhoto(photoResponseInit);
    setPhotoEditModalActive(!photoEditModalActive);
  };

  // 사진 대표작 선택 액티브
  const onPhotoRepresentativeActive = () => {
    setEditRepPhoto(repPhoto);
    setPhotoRepresentativeActive(!photoRepresentativeActive);
  };

  // 사진 대표작 선택 취소
  const onPhotoRepresentativeClose = () => {
    setRepPhoto(editRepPhoto);
    setEditRepPhoto(photoResponseInit);
    setPhotoRepresentativeActive(!photoRepresentativeActive);
  };

  // 사진 대표작 체크
  const onPhotoRepCheck = (photo: PhotoResponseType) => {
    setRepPhoto((prev: PhotoResponseType) =>
      prev.id === photo.id ? prev : photo
    );
  };

  // 사진 대표작 설정 완료
  const onPhotoRepSave = async () => {
    try {
      await patchPhotoDefault(userId, repPhoto.id, token);
    } catch (error) {
      throw error;
    }
    setRepPhoto(photoResponseInit);
  };

  // 사진 모달에 크롭 할 이미지 선택
  const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        setCropImage(reader.result?.toString() || "");
        setSelectImage(reader.result?.toString() || "");
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    e.currentTarget.value = "";
  };

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <PhotoMain
        photoList={photoList}
        photoDeleteActive={photoDeleteActive}
        photoRepresentativeActive={photoRepresentativeActive}
        repPhoto={repPhoto}
        onSelectFile={onSelectFile}
        onPhotoModalActive={onPhotoModalActive}
        onPhotoEditModalOpen={onPhotoEditModalOpen}
        onDeletePhoto={onDeletePhoto}
        onDeletePhotoActive={onDeletePhotoActive}
        onPhotoRepresentativeActive={onPhotoRepresentativeActive}
        onPhotoRepSave={onPhotoRepSave}
        onPhotoRepCheck={onPhotoRepCheck}
        onPhotoRepresentativeClose={onPhotoRepresentativeClose}
      />
      {photoModalActive && (
        <PhotoModal
          selectImage={selectImage}
          onModalActive={onPhotoModalActive}
          onAddPhoto={onAddPhoto}
          setCropImage={setCropImage}
        />
      )}
      {photoEditModalActive && (
        <PhotoEditModal
          selectImage={editPhoto.path}
          onModalActive={onPhotoEditModalClose}
          onEditPhoto={onEditPhoto}
          setCropImage={setCropImage}
        />
      )}
    </div>
  );
};

export default Photo;

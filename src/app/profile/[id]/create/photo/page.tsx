"use client";

import {
  convertImageToBase64,
  deletePhoto,
  getProfile,
  patchPhotoDefault,
  postPhoto,
  postPhotoEdit
} from "@/app/api/route";
import PhotoMain from "@/components/organisms/photoMain";
import PhotoModal from "@/components/organisms/photoModal";
import { defaultId, jwt, toastMessage } from "@/data/atom";
import { photoModalInit, photoResponseInit } from "@/data/data";
import { PhotoModalType, PhotoResponseType } from "@/types/types";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Photo = () => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const setToastMessage = useSetRecoilState(toastMessage);

  const [photoList, setPhotoList] = useState<PhotoResponseType[]>([]);

  // 이미지 크롭할 때 사진
  const [selectImage, setSelectImage] = useState("");
  const [cropImage, setCropImage] = useState("");

  const [photoModal, setPhotoModal] = useState<PhotoModalType>(photoModalInit);

  const [photoDeleteActive, setPhotoDeleteActive] = useState(false);
  const [photoRepActive, setPhotoRepActive] = useState(false);

  // 대표작 설정
  const [repPhoto, setRepPhoto] =
    useState<PhotoResponseType>(photoResponseInit);

  // 대표작 취소 시 대표작 원본
  const [editRepPhoto, setEditRepPhoto] =
    useState<PhotoResponseType>(photoResponseInit);

  // 사진 추가 모달 저장
  const onAddPhoto = async () => {
    if (cropImage) {
      const res = await postPhoto(userId, selectImage, cropImage, token);
      const data = res.data;

      if (photoList.length === 0) {
        data.isDefault = true;
        setRepPhoto(data);
      }

      setPhotoList([...photoList, data]);
    } else {
      const res = await postPhoto(userId, selectImage, selectImage, token);
      const data = res.data;

      if (photoList.length === 0) {
        data.isDefault = true;
        setRepPhoto(data);
      }
      setPhotoList([...photoList, data]);
    }

    setPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 추가했어요.");
  };

  // 사진 편집 모달 완료
  const onEditPhoto = async () => {
    await postPhotoEdit(userId, selectImage, cropImage, token, photoModal.id);

    const res = await getProfile(userId, token);
    const data = await res.data;

    setPhotoList(data.photos);
    setPhotoModal(photoModalInit);
    setSelectImage("");
    setCropImage("");
    setToastMessage("사진을 수정했어요.");
  };

  // 사진 삭제 모달 버튼 클릭
  const onDeletePhoto = async (id: string) => {
    await deletePhoto(userId, id, token);

    const res = await getProfile(userId, token);
    const data = await res.data;

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

  // 사진 편집 모달 닫기(취소)
  const onPhotoEditModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setPhotoModal(photoModalInit);
  };

  // 사진 대표작 선택 액티브
  const onPhotoRepActive = () => {
    setEditRepPhoto(repPhoto);
    setPhotoRepActive(!photoRepActive);
  };

  // 사진 대표작 선택 취소
  const onPhotoRepClose = () => {
    setRepPhoto(editRepPhoto);
    setEditRepPhoto(photoResponseInit);
    setPhotoRepActive(!photoRepActive);
  };

  // 사진 대표작 체크
  const onPhotoRepCheck = (photo: PhotoResponseType) => {
    setRepPhoto((prev: PhotoResponseType) =>
      prev.id === photo.id ? prev : photo
    );
  };

  // 사진 대표작 설정 완료
  const onPhotoRepSave = async () => {
    await patchPhotoDefault(userId, repPhoto.id, token);

    const res = await getProfile(userId, token);
    const data = await res.data;

    setPhotoList(data.photos);

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

  // 사진 리스트 업데이트
  useEffect(() => {
    const getProfileData = async () => {
      const res = await getProfile(userId, token);
      const data = await res.data;

      setPhotoList(data.photos);
    };
    getProfileData();
  }, []);

  return (
    <div className="flex w-[65vw] flex-col gap-3">
      <PhotoMain
        photoList={photoList}
        photoDeleteActive={photoDeleteActive}
        photoRepActive={photoRepActive}
        repPhoto={repPhoto}
        onSelectFile={onSelectFile}
        onPhotoModalOpen={onPhotoModalOpen}
        onPhotoEditModalOpen={onPhotoEditModalOpen}
        onDeletePhoto={onDeletePhoto}
        onDeletePhotoActive={onDeletePhotoActive}
        onPhotoRepActive={onPhotoRepActive}
        onPhotoRepSave={onPhotoRepSave}
        onPhotoRepCheck={onPhotoRepCheck}
        onPhotoRepClose={onPhotoRepClose}
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
    </div>
  );
};

export default Photo;

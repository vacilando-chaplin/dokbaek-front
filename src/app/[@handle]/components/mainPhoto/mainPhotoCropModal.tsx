"use client";

import {
  deleteProfilePhotoMain,
  patchProfilePhotoMain,
  postProfilePhotoMain
} from "@/app/profile/[id]/api";
import { photoModalInit } from "@/app/profile/[id]/create/photo/data";
import { cropDataInit } from "@/app/profile/[id]/data";
import ImageCropper from "@/components/molecules/imageCropper";
import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import { toastMessage } from "@/lib/atoms";
import {
  mainPhotoCropImageState,
  mainPhotoImageState,
  mainPhotoModalState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";

const MainPhotoCropModal = () => {
  const loginProfileId = Number(Cookies.get("loginProfileId"));

  const [photoModal, setPhotoModal] = useRecoilState(mainPhotoModalState);
  const [cropImage, setCropImage] = useRecoilState(mainPhotoCropImageState);
  const [selectImage, setSelectImage] = useRecoilState(mainPhotoImageState);

  const setProfileData = useSetRecoilState(profileViewState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const [cropData, setCropData] = useState(cropDataInit);

  const onModalClose = () => {
    setCropImage("");
    setSelectImage("");
    setCropData(cropDataInit);
    setPhotoModal(photoModalInit);
  };

  // 대표 사진 추가 Mutation
  const useAddPhoto = () => {
    return useMutation({
      mutationFn: async ({
        loginProfileId,
        selectImage,
        cropImage
      }: {
        loginProfileId: number;
        selectImage: string;
        cropImage: string;
      }) => {
        const res = await postProfilePhotoMain(
          loginProfileId,
          selectImage,
          cropImage
        );
        const data = res.data;
        return { path: data.path, previewPath: data.previewPath };
      },
      onSuccess: ({ path, previewPath }) => {
        setProfileData((prev) => ({
          ...prev,
          mainPhotoPath: path,
          mainPhotoPreviewPath: previewPath
        }));
        onModalClose();
        setToastMessage("대표 사진을 추가했어요.");
      },
      onError: () => {
        setToastMessage("사진 추가에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  // 대표 사진 편집 Mutation
  const useEditPhoto = () => {
    return useMutation({
      mutationFn: async ({
        loginProfileId,
        cropImage
      }: {
        loginProfileId: number;
        cropImage: string;
      }) => {
        const res = await patchProfilePhotoMain(loginProfileId, cropImage);
        const data = res.data;
        return { path: data.path, previewPath: data.previewPath };
      },
      onSuccess: ({ path, previewPath }) => {
        setProfileData((prev) => ({
          ...prev,
          mainPhotoPath: path,
          mainPhotoPreviewPath: previewPath
        }));
        onModalClose();
        setToastMessage("대표 사진을 수정했어요.");
      },
      onError: () => {
        setToastMessage("사진 수정에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  // 대표 사진 변경 Mutation
  const useChangePhoto = () => {
    return useMutation({
      mutationFn: async ({
        loginProfileId,
        selectImage,
        cropImage
      }: {
        loginProfileId: number;
        selectImage: string;
        cropImage: string;
      }) => {
        await deleteProfilePhotoMain(loginProfileId);
        const res = await postProfilePhotoMain(
          loginProfileId,
          selectImage,
          cropImage
        );
        const data = res.data;
        return { path: data.path, previewPath: data.previewPath };
      },
      onSuccess: ({ path, previewPath }) => {
        setProfileData((prev) => ({
          ...prev,
          mainPhotoPath: path,
          mainPhotoPreviewPath: previewPath
        }));
        onModalClose();
        setToastMessage("대표 사진을 변경했어요.");
      },
      onError: () => {
        setToastMessage("사진 변경에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  const addPhotoMutation = useAddPhoto();
  const editPhotoMutation = useEditPhoto();
  const changePhotoMutation = useChangePhoto();

  const isAddingPhoto = addPhotoMutation.isPending;
  const isEditingPhoto = editPhotoMutation.isPending;
  const isChangingPhoto = changePhotoMutation.isPending;

  // 대표 사진 추가
  const onAddPhoto = () => {
    addPhotoMutation.mutate({
      loginProfileId: loginProfileId,
      selectImage: selectImage,
      cropImage: cropImage
    });
  };

  // 대표 사진 편집
  const onEditPhoto = () => {
    editPhotoMutation.mutate({
      loginProfileId: loginProfileId,
      cropImage: cropImage
    });
  };

  // 대표 사진 변경
  const onChangePhoto = () => {
    changePhotoMutation.mutate({
      loginProfileId: loginProfileId,
      selectImage: selectImage,
      cropImage: cropImage
    });
  };

  return (
    photoModal.active && (
      <section className="fixed inset-0 z-[50] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div className="interaction-default relative flex h-auto max-h-[88vh] w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader name={photoModal.name} onClick={onModalClose} />
          <div className="flex h-[70vh] max-h-[70vh] w-full flex-col items-center justify-center">
            <ImageCropper
              cropType="mainPhoto"
              cropData={cropData}
              setCropData={setCropData}
              selectImage={selectImage}
              setCropImage={setCropImage}
            />
          </div>
          <ModalFooter
            text={photoModal.buttonText}
            disabled={
              !selectImage || isAddingPhoto || isEditingPhoto || isChangingPhoto
            }
            onCloseClick={onModalClose}
            onSaveClick={
              photoModal.state === "add"
                ? onAddPhoto
                : photoModal.state === "edit"
                  ? onEditPhoto
                  : onChangePhoto
            }
          />
        </div>
      </section>
    )
  );
};

export default MainPhotoCropModal;

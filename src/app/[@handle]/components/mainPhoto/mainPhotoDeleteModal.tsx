"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import {
  mainPhotoCropImageState,
  mainPhotoDeleteModalActiveState,
  mainPhotoImageState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import Cookies from "js-cookie";
import { deleteProfilePhotoMain } from "@/app/profile/[id]/api";
import { useMutation } from "@tanstack/react-query";

const MainPhotoDeleteModal = () => {
  const loginProfileId = Number(Cookies.get("loginProfileId"));

  const [deleteModal, setDeleteModal] = useRecoilState(
    mainPhotoDeleteModalActiveState
  );

  const setProfileData = useSetRecoilState(profileViewState);
  const setCropImage = useSetRecoilState(mainPhotoCropImageState);
  const setSelectImage = useSetRecoilState(mainPhotoImageState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onMainPhotoDeleteModalActive = () => {
    setCropImage("");
    setSelectImage("");
    setDeleteModal((prev) => !prev);
  };

  // 대표 사진 삭제 Mutation
  const useDeleteMainPhoto = () => {
    return useMutation({
      mutationFn: async ({ loginProfileId }: { loginProfileId: number }) => {
        await deleteProfilePhotoMain(loginProfileId);
        return loginProfileId;
      },
      onSuccess: () => {
        setProfileData((prev) => ({
          ...prev,
          mainPhotoPath: null,
          mainPhotoPreviewPath: null
        }));
        onMainPhotoDeleteModalActive();
        setToastMessage("대표 사진을 삭제했어요.");
      },
      onError: () => {
        setToastMessage("대표 사진 삭제에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  const deleteMainPhotoMutation = useDeleteMainPhoto();

  // 대표 사진 삭제
  const onDeleteMainPhoto = () => {
    deleteMainPhotoMutation.mutate({
      loginProfileId: loginProfileId
    });
  };

  return (
    deleteModal && (
      <ConfirmModal
        dense
        resizing="fixed"
        titleText="대표 사진을 삭제할까요?"
        cancelText="취소"
        confirmText="삭제"
        cancelButtonType="secondaryOutlined"
        confirmButtonType="negative"
        onCancel={onMainPhotoDeleteModalActive}
        onConfirm={onDeleteMainPhoto}
      />
    )
  );
};

export default MainPhotoDeleteModal;

"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import {
  mainPhotoCropImageState,
  mainPhotoDeleteModalActiveState,
  mainPhotoImageState
} from "@/lib/recoil/handle/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { deleteProfilePhotoMain } from "../../profile/[id]/api";
import { toastMessage } from "@/lib/atoms";
import Cookies from "js-cookie";

const MainPhotoDeleteModal = () => {
  const loginProfileId = Number(Cookies.get("loginProfileId"));

  const [deleteModal, setDeleteModal] = useRecoilState(
    mainPhotoDeleteModalActiveState
  );

  const setCropImage = useSetRecoilState(mainPhotoCropImageState);
  const setSelectImage = useSetRecoilState(mainPhotoImageState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const onMainPhotoDeleteModalActive = () => {
    setCropImage("");
    setSelectImage("");
    setDeleteModal((prev) => !prev);
  };

  const onDeleteMainPhoto = async () => {
    await deleteProfilePhotoMain(loginProfileId);

    onMainPhotoDeleteModalActive();
    setToastMessage("대표 사진을 삭제했어요.");
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

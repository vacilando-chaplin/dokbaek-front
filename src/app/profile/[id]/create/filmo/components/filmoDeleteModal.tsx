"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import Cookies from "js-cookie";
import { filmoDeleteModalState } from "@/lib/recoil/profile/filmo/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { deleteFilmography, deleteFilmographyThumbnail } from "../api";
import { filmoDeleteModalInit } from "../data";
import { toastMessage } from "@/lib/atoms";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { useMutation } from "@tanstack/react-query";

const FilmoDeleteModal = () => {
  const profileId = Number(Cookies.get("loginProfileId"));

  const [filmoDeleteModal, setFilmoDeleteModal] = useRecoilState(
    filmoDeleteModalState
  );
  const setProfileData = useSetRecoilState(profileDraftData);
  const setToastMessage = useSetRecoilState(toastMessage);

  // 필모그래피 삭제 모달 닫기
  const onFilmoDeleteModalClose = () => {
    setFilmoDeleteModal({ ...filmoDeleteModal, active: false });
  };

  // 필모그래피 삭제 Mutation
  const useFilmoDeleteMutaion = () => {
    return useMutation({
      mutationFn: async ({
        profileId,
        filmoId
      }: {
        profileId: number;
        filmoId: number;
      }) => {
        await deleteFilmographyThumbnail(profileId, filmoId);
        await deleteFilmography(profileId, filmoId);

        return filmoId;
      },
      onSuccess: (filmoId) => {
        setProfileData((prev) => ({
          ...prev,
          filmos: prev.filmos.filter((filmo) => filmo.id !== filmoId)
        }));
        setFilmoDeleteModal(filmoDeleteModalInit);
        setToastMessage("작품 활동을 삭제했어요.");
      },
      onError: () => {
        setToastMessage("작품 삭제에 실패했어요. 다시 시도해 주세요.");
      }
    });
  };

  const deleteFilmographyMutation = useFilmoDeleteMutaion();

  // 필모그래피 삭제
  const onFilmoDeleteClick = () => {
    deleteFilmographyMutation.mutate({
      profileId,
      filmoId: filmoDeleteModal.id
    });
  };

  return (
    <>
      {filmoDeleteModal.active && (
        <ConfirmModal
          dense={false}
          resizing="fixed"
          titleText="작품 활동을 삭제할까요?"
          cancelText="취소"
          confirmText="삭제"
          cancelButtonType="secondaryOutlined"
          confirmButtonType="negative"
          onCancel={onFilmoDeleteModalClose}
          onConfirm={onFilmoDeleteClick}
        />
      )}
    </>
  );
};

export default FilmoDeleteModal;

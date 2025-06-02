"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import { useState } from "react";
import { deleteProfileDraft, postProfileDraft } from "../../api";

interface DraftModalProps {
  profileId: number;
  draftModalState: boolean;
}

const DraftModal = ({ profileId, draftModalState }: DraftModalProps) => {
  const [modalState, setModalState] = useState(draftModalState);

  const onReject = async () => {
    await deleteProfileDraft(profileId);
    await postProfileDraft(profileId);

    setModalState(false);
  };

  const onConfirm = async () => {
    setModalState(false);
  };

  return (
    <>
      {modalState && (
        <ConfirmModal
          dense={false}
          resizing="fixed"
          titleText="작성 중인 프로필이 있습니다. 불러올까요?"
          cancelText="새로 작성"
          confirmText="불러오기"
          cancelButtonType="secondaryOutlined"
          confirmButtonType="primary"
          onCancel={onReject}
          onConfirm={onConfirm}
        />
      )}
    </>
  );
};

export default DraftModal;

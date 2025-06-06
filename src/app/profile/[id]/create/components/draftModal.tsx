"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import { useEffect, useState } from "react";
import { deleteProfileDraft, postProfileDraft } from "../../api";
import { useRecoilValue } from "recoil";
import { draftStatus } from "@/lib/recoil/profile/common/atom";

interface DraftModalProps {
  profileId: number;
}

const DraftModal = ({ profileId }: DraftModalProps) => {
  const draftState = useRecoilValue(draftStatus);
  const [modalState, setModalState] = useState(true);

  const onReject = async () => {
    await deleteProfileDraft(profileId);
    await postProfileDraft(profileId);

    setModalState(false);
  };

  const onConfirm = async () => {
    setModalState(false);
  };

  useEffect(() => {
    if (draftState === 200) {
      setModalState(true);
    }
  }, []);

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

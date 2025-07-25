"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  profileDraftData,
  profileDraftModalState
} from "@/lib/recoil/handle/edit/common/atom";
import { deleteProfileDraftClient, postProfileDraftClient } from "../../api";

interface DraftModalProps {
  profileId: number;
}

const DraftModal = ({ profileId }: DraftModalProps) => {
  const [modalState, setModalState] = useState(true);
  const setData = useSetRecoilState(profileDraftData);
  const setDraftModalState = useSetRecoilState(profileDraftModalState);

  const onReject = async () => {
    await deleteProfileDraftClient(profileId);
    const res = await postProfileDraftClient(profileId);
    const data = await res.data.data;

    setData(data);
    setDraftModalState("rejected");
    setModalState(false);
  };

  const onConfirm = async () => {
    const res = await postProfileDraftClient(profileId);
    const data = await res.data.data;

    setData(data);
    setDraftModalState("confirmed");
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

"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import {
  profileDraftData,
  profiledraftModalState
} from "@/lib/recoil/profile/common/atom";
import { deleteProfileDraftClient, postProfileDraftClient } from "../../api";
import { ProfileDarftDataType } from "../types";

interface DraftModalProps {
  profileId: number;
  draftData: ProfileDarftDataType;
}

const DraftModal = ({ profileId, draftData }: DraftModalProps) => {
  const [modalState, setModalState] = useState(true);
  const setData = useSetRecoilState(profileDraftData);
  const setDraftModalState = useSetRecoilState(profiledraftModalState);

  const onReject = async () => {
    await deleteProfileDraftClient(profileId);
    await postProfileDraftClient(profileId);

    setData(draftData);
    setDraftModalState("rejected");
    setModalState(false);
  };

  const onConfirm = () => {
    setData(draftData);
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

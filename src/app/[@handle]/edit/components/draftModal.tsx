"use client";

import ConfirmModal from "@/components/organisms/confirmModal";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  draftModalState,
  profileDraftData
} from "@/lib/recoil/handle/edit/common/atom";
import {
  deleteProfileDraftClient,
  getProfileDraftClient,
  postProfileDraftClient
} from "../../api";

interface DraftModalProps {
  profileId: number;
}

const DraftModal = ({ profileId }: DraftModalProps) => {
  const [draftModal, setDraftModal] = useRecoilState(draftModalState);
  const setData = useSetRecoilState(profileDraftData);

  const onCreateDraft = async () => {
    await deleteProfileDraftClient(profileId);
    const res = await postProfileDraftClient(profileId);
    const data = await res.data.data;

    setData(data);
    setDraftModal(false);
  };

  const onLoadDraft = async () => {
    const res = await getProfileDraftClient(profileId);
    const data = await res?.data.data;

    setData(data);
    setDraftModal(false);
  };

  return (
    draftModal && (
      <ConfirmModal
        dense={false}
        resizing="fixed"
        titleText="작성 중인 프로필이 있습니다. 불러올까요?"
        cancelText="새로 작성"
        confirmText="불러오기"
        cancelButtonType="secondaryOutlined"
        confirmButtonType="primary"
        onCancel={onCreateDraft}
        onConfirm={onLoadDraft}
      />
    )
  );
};

export default DraftModal;

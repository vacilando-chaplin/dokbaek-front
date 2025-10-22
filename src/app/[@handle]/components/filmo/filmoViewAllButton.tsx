"use client";

import TextButton from "@/components/atoms/textButton";
import {
  filmoViewAllModalState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";

const FilmoViewAllButton = () => {
  const profileData = useRecoilValue(profileViewState);
  const setFilmoModal = useSetRecoilState(filmoViewAllModalState);

  const onModalOpen = () => {
    setFilmoModal((prev) => !prev);
  };

  return (
    profileData?.filmos.length >= 1 && (
      <TextButton type="secondary" size="large" onClick={onModalOpen}>
        <span className="typography-body2">모두 보기</span>
      </TextButton>
    )
  );
};

export default FilmoViewAllButton;

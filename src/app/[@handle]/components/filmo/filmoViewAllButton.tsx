"use client";

import TextButton from "@/components/atoms/textButton";
import { filmoViewAllModalState } from "@/lib/recoil/handle/atom";
import { useSetRecoilState } from "recoil";

const FilmoViewAllButton = () => {
  const setFilmoModal = useSetRecoilState(filmoViewAllModalState);

  const onModalOpen = () => {
    setFilmoModal((prev) => !prev);
  };

  return (
    <TextButton type="secondary" size="large" onClick={onModalOpen}>
      <span className="typography-body2">모두 보기</span>
    </TextButton>
  );
};

export default FilmoViewAllButton;

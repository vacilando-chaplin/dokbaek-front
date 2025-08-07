"use client";

import UploadButton from "@/components/atoms/uploadButton";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { useImageSelector } from "@/lib/hooks";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { cropModalState } from "@/lib/recoil/handle/edit/photo/atom";
import { CategoryKey } from "../../types";

interface UploadButtonContainerProps {
  category: CategoryKey;
}

const UploadButtonContainer = ({ category }: UploadButtonContainerProps) => {
  const profileData = useRecoilValue(profileDraftData);
  const setCropModal = useSetRecoilState(cropModalState);

  const { onSelectFile } = useImageSelector();

  const photos = profileData?.photos ?? [];
  const stillCuts = profileData?.stillCuts ?? [];

  const photoListLength =
    category === "photos"
      ? photos.length
      : category === "stillCuts"
        ? stillCuts.length
        : 0;

  // 사진 추가 모달 열기
  const onCropModalOpen = (category: string) => {
    setCropModal({
      id: "",
      state: "add",
      active: true,
      name: "사진 추가",
      buttonText: "추가",
      category: category
    });
  };

  return (
    <UploadButton
      type="primaryOutlined"
      size="small"
      disabled={photoListLength >= 20}
      onClick={() => onCropModalOpen(category)}
      onChange={onSelectFile}
    >
      <Plus
        width="12"
        height="12"
        className="fill-current text-accent-primary-light dark:text-accent-primary-dark"
      />
      추가
    </UploadButton>
  );
};

export default UploadButtonContainer;

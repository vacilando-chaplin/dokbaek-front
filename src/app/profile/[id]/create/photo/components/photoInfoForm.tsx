"use client";

import Title from "@/components/atoms/title";
import LimitLabel from "./limitLabel";
import TitleHelperText from "./titleHelperText";
import UploadButton from "@/components/atoms/uploadButton";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { cropModalState } from "@/lib/recoil/profile/photo/atom";
import { CategoryKey } from "../types";
import { useImageSelector } from "@/lib/hooks";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { categoryDetails } from "../data";

interface PhotoInfoFormProps {
  category: CategoryKey;
}

const PhotoInfoForm = ({ category }: PhotoInfoFormProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const setCropModal = useSetRecoilState(cropModalState);

  const { onSelectFile } = useImageSelector();

  const photoList =
    profileData &&
    (category === "photos"
      ? profileData.photos
      : category === "stillCuts"
        ? profileData.stillCuts
        : []);

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

  const { title, helperText } = categoryDetails[category] || {
    title: "",
    helperText: ""
  };

  return (
    <div className="flex w-full flex-row items-start justify-between">
      <div className="flex flex-col gap-1">
        <div className="flex flex-row items-center gap-2">
          <Title name={title} />
          <LimitLabel value={photoList.length} limit={20} />
        </div>
        <TitleHelperText text={helperText} />
      </div>
      <UploadButton
        type="primaryOutlined"
        size="small"
        disabled={photoList.length >= 20}
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
    </div>
  );
};

export default PhotoInfoForm;

"use client";

import HumanMale from "../../../../../../../public/icons/HumanMale.svg";
import FaceRecognition from "../../../../../../../public/icons/FaceRecognition.svg";
import FaceManProfile from "../../../../../../../public/icons/FaceManProfile.svg";
import Plus from "../../../../../../../public/icons/Plus.svg";
import UploadButton from "@/components/atoms/uploadButton";
import { useSetRecoilState } from "recoil";
import {
  cropModalState,
  recentPhotoTypeState
} from "@/lib/recoil/handle/edit/photo/atom";
import { useImageSelector } from "@/lib/hooks";
import { RecentPhotoCategory } from "../../types";

interface RecentPhotoFrameProps {
  name: string;
  photoType: RecentPhotoCategory;
}

const RecentPhotoFrame = ({ name, photoType }: RecentPhotoFrameProps) => {
  const setCropModal = useSetRecoilState(cropModalState);
  const setRecentPhotoType = useSetRecoilState(recentPhotoTypeState);

  const { onSelectFile } = useImageSelector();

  // 사진 추가 모달 열기
  const onCropModalOpen = (category: string) => {
    setRecentPhotoType(photoType);
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
    <div className="flex aspect-[160/204] h-[204px] w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-gray-150 bg-gray-50">
      {name === "전신 사진" && (
        <HumanMale
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      {name === "얼굴 정면 사진" && (
        <FaceRecognition
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      {name === "얼굴 좌측 사진" && (
        <FaceManProfile
          width="16"
          height="16"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      {name === "얼굴 우측 사진" && (
        <FaceManProfile
          width="16"
          height="16"
          className="fill-current rotate-[-45deg] text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      )}
      <label className="typography-caption1 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
        {name}
      </label>
      <UploadButton
        type="secondaryOutlined"
        size="small"
        onClick={(e) => {
          e.stopPropagation();
          onCropModalOpen("recentPhotos");
        }}
        onChange={(e) => {
          e.stopPropagation();
          onSelectFile(e);
        }}
      >
        <Plus
          width="12"
          height="12"
          className="fill-current text-content-primary-light dark:text-content-primary-dark"
        />
        추가
      </UploadButton>
    </div>
  );
};

export default RecentPhotoFrame;

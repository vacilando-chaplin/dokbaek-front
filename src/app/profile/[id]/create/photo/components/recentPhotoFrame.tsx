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
} from "@/lib/recoil/profile/photo/atom";
import { useImageSelector, usePhotoDrop } from "@/lib/hooks";
import { useDropzone } from "react-dropzone";
import { RecentPhotoCategory } from "../types";
import { toastMessage } from "@/lib/atoms";

interface RecentPhotoFrameProps {
  name: string;
  photoType: RecentPhotoCategory;
}

const RecentPhotoFrame = ({ name, photoType }: RecentPhotoFrameProps) => {
  const setCropModal = useSetRecoilState(cropModalState);
  const setRecentPhotoType = useSetRecoilState(recentPhotoTypeState);
  const setToastMessage = useSetRecoilState(toastMessage);

  const { onDrop } = usePhotoDrop("recentPhotos", photoType);
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

  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    accept: {
      "image/*": []
    },
    onDrop,
    onDropRejected: () => {
      setToastMessage("지원하지 않는 파일 형식이거나 파일 개수가 너무 많아요.");
    },
    noClick: true,
    maxFiles: 1,
    maxSize: 10000000
  });

  return (
    <div
      className={`flex aspect-[160/204] h-full w-full flex-col items-center justify-center gap-2 rounded-xl border border-dotted border-gray-150 bg-gray-50 dark:border-border-active-light dark:bg-gray-800 ${isDragAccept && "border-accent-primary-light bg-accent-light-light dark:border-accent-primary-dark dark:bg-accent-light-dark"}`}
      {...getRootProps()}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          e.stopPropagation();
          onSelectFile(e);
        }}
        {...getInputProps()}
      />
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

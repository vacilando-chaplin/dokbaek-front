"use client";

import { imageCompressionOptions } from "@/lib/data";
import {
  mainPhotoCropImageState,
  mainPhotoDeleteModalActiveState,
  mainPhotoImageState,
  mainPhotoModalState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { convertToBase64, getFileMimeTypeFromUrl } from "@/lib/utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import imageCompression from "browser-image-compression";

interface MainPhotoMenuProps {
  active: boolean;
  onActive: () => void;
  onSelectFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const MainPhotoMenu = ({
  active,
  onActive,
  onSelectFile
}: MainPhotoMenuProps) => {
  const profileData = useRecoilValue(profileViewState);

  const setMainPhotoModal = useSetRecoilState(mainPhotoModalState);
  const setMainPhotoDeleteModalActive = useSetRecoilState(
    mainPhotoDeleteModalActiveState
  );
  const setCropImage = useSetRecoilState(mainPhotoCropImageState);
  const setSelectImage = useSetRecoilState(mainPhotoImageState);

  const mainPhotoOrigin = profileData?.mainPhotoPath ?? "";

  const onMainPhotoChangeModalOpen = () => {
    setMainPhotoModal({
      state: "change",
      active: true,
      name: "대표 사진 변경",
      buttonText: "변경"
    });
  };

  const onMainPhotoEditModalOpen = async () => {
    const mimeType = await getFileMimeTypeFromUrl(mainPhotoOrigin);
    const response = await fetch(mainPhotoOrigin);
    const blob = await response.blob();
    const file = new File([blob], "image", { type: mimeType });

    const downSizedFile = await imageCompression(file, imageCompressionOptions);
    const downSizedImage = await convertToBase64(downSizedFile);

    setCropImage(downSizedImage);
    setSelectImage(downSizedImage);
    onActive();
    setMainPhotoModal({
      state: "edit",
      active: true,
      name: "대표 사진 편집",
      buttonText: "완료"
    });
  };

  const onMainPhotoDeleteModalOpen = () => {
    setMainPhotoDeleteModalActive((prev) => !prev);
  };

  const buttonStyle =
    "typography-body3 flex h-[38px] w-full gap-2 cursor-pointer rounded-md px-3 py-2 font-regular text-content-primary-light hover:bg-gray-50 active:bg-gray-150 dark:text-content-primary-dark dark:hover:bg-background-surface-dark dark:active:bg-background-surface-dark";

  return (
    active && (
      <div className="interaction-default absolute right-2 top-[52px] flex h-auto w-20 animate-enter flex-col rounded-xl bg-background-elevated-light p-2 shadow-low dark:bg-background-elevated-dark">
        <label className={buttonStyle}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              onMainPhotoChangeModalOpen();
              onActive();
              onSelectFile(e);
            }}
          />
          변경
        </label>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            onActive();
            onMainPhotoEditModalOpen();
          }}
        >
          편집
        </button>
        <button
          type="button"
          className={buttonStyle}
          onClick={() => {
            onActive();
            onMainPhotoDeleteModalOpen();
          }}
        >
          삭제
        </button>
      </div>
    )
  );
};

export default MainPhotoMenu;

"use client";

import { useActive } from "@/lib/hooks";
import {
  mainPhotoCropImageState,
  mainPhotoImageState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { convertToBase64 } from "@/lib/utils";
import { imageCompressionOptions } from "@/lib/data";
import imageCompression from "browser-image-compression";
import MainPhotoMenuButton from "./mainPhotoMenuButton";
import MainPhotoMenu from "./mainPhotoMenu";
import MainPhotoEmpty from "./mainPhotoEmpty";

const MainPhoto = () => {
  const profileData = useRecoilValue(profileViewState);

  const setCropImage = useSetRecoilState(mainPhotoCropImageState);
  const setSelectImage = useSetRecoilState(mainPhotoImageState);

  const mainPhotoPreview = profileData?.mainPhotoPreviewPath ?? "";

  const { active, onActive } = useActive();

  const onSelectFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const downSizedFile = await imageCompression(
        file,
        imageCompressionOptions
      );
      const downSizedImage = await convertToBase64(downSizedFile);

      setSelectImage(downSizedImage);
      setCropImage(downSizedImage);
    }
    e.target.value = "";
  };

  return mainPhotoPreview ? (
    <div
      className="relative w-full"
      style={{ paddingBottom: `${(532 / 416) * 100}%` }}
    >
      <Image
        src={mainPhotoPreview}
        alt="대표 사진"
        sizes="100vw"
        fill
        priority
        className="h-full w-full rounded-2xl"
      />
      <MainPhotoMenuButton onActive={onActive} />
      <MainPhotoMenu
        active={active}
        onActive={onActive}
        onSelectFile={onSelectFile}
      />
    </div>
  ) : (
    <MainPhotoEmpty onSelectFile={onSelectFile} />
  );
};

export default MainPhoto;

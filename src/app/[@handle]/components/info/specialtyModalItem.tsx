"use client";

import { useActive } from "@/lib/hooks";
import Image from "next/image";
import { ProfileSpecialtyType } from "../../edit/types";
import { getVideoId } from "@/lib/utils";
import { useSetRecoilState } from "recoil";
import {
  specialtyImageModalState,
  specialtyYoutubeModalState
} from "@/lib/recoil/handle/atom";

interface SpecialtyModalItemProps {
  specialty: ProfileSpecialtyType;
}

const SpecialtyModalItem = ({ specialty }: SpecialtyModalItemProps) => {
  const { active, onActive } = useActive(false);
  const { imageUrl, mediaUrl } = specialty;

  const setImageModal = useSetRecoilState(specialtyImageModalState);
  const setYoutubeModal = useSetRecoilState(specialtyYoutubeModalState);

  const onImageModalOpen = (imageUrl: string) => {
    setImageModal({ imageUrl: imageUrl, active: true });
  };

  const onYoutubeModalOpen = (mediaUrl: string) => {
    setYoutubeModal({ url: mediaUrl, active: true });
  };

  return (
    <div className="flex h-auto w-full flex-col gap-3 rounded-xl bg-gray-100 p-3">
      <button
        type="button"
        className="typography-body3 flex w-auto font-medium text-content-primary-light dark:text-content-primary-dark"
        disabled={!imageUrl && !mediaUrl}
        onClick={onActive}
      >
        {specialty.specialty.specialtyName}
      </button>
      {active && (
        <div className="flex h-auto w-auto animate-enter flex-row gap-2 transition-all duration-300 ease-linear">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt="특기 이미지"
              width={80}
              height={80}
              loading="lazy"
              unoptimized={true}
              className="cursor-pointer rounded-lg bg-background-surface-light shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:bg-background-surface-dark"
              onClick={() => onImageModalOpen(imageUrl)}
            />
          )}
          {mediaUrl && (
            <div
              className="pointer-events-auto relative h-20 w-[142px] cursor-pointer rounded-lg bg-cover bg-center"
              style={{
                backgroundImage: `url(${`https://img.youtube.com/vi/${getVideoId(mediaUrl)}/hqdefault.jpg`})`
              }}
              onClick={() => onYoutubeModalOpen(mediaUrl)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SpecialtyModalItem;

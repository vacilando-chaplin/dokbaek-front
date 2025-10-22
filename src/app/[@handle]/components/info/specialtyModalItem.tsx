"use client";

import { useActive } from "@/lib/hooks";
import Image from "next/image";
import { ProfileSpecialtyType } from "../../edit/types";
import { getVideoId } from "@/lib/utils";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  specialtyImageModalState,
  specialtyItemIdState,
  specialtyYoutubeModalState
} from "@/lib/recoil/handle/atom";
import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import CollapseMotion from "@/components/atoms/collapseMotion";

interface SpecialtyModalItemProps {
  specialty: ProfileSpecialtyType;
}

const SpecialtyModalItem = ({ specialty }: SpecialtyModalItemProps) => {
  const { active, onOpen, onActive } = useActive(false);
  const { imageUrl, mediaUrl } = specialty;

  const specialtyId = useRecoilValue(specialtyItemIdState);

  const setImageModal = useSetRecoilState(specialtyImageModalState);
  const setYoutubeModal = useSetRecoilState(specialtyYoutubeModalState);

  const onImageModalOpen = (imageUrl: string) => {
    setImageModal({ imageUrl: imageUrl, active: true });
  };

  const onYoutubeModalOpen = (mediaUrl: string) => {
    setYoutubeModal({ url: mediaUrl, active: true });
  };

  useEffect(() => {
    if (specialty.specialty.id === specialtyId && (imageUrl || mediaUrl)) {
      onOpen();
    }
  }, [specialtyId]);

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
      <AnimatePresence initial={false}>
        {active && (
          <CollapseMotion
            transition={{ duration: 0.15, ease: "easeInOut" }}
            className="flex w-auto flex-row gap-2"
          >
            {imageUrl && (
              <Image
                src={imageUrl}
                alt="특기 이미지"
                width={0}
                height={120}
                loading="lazy"
                unoptimized={true}
                className="h-[120px] w-auto cursor-pointer rounded-lg bg-background-surface-light shadow-[0_0_0_1px_rgba(0,0,0,0.1)] dark:bg-background-surface-dark"
                onClick={() => onImageModalOpen(imageUrl)}
              />
            )}
            {mediaUrl && (
              <div
                className="pointer-events-auto relative h-[120px] w-[142px] cursor-pointer rounded-lg bg-cover bg-center"
                style={{
                  backgroundImage: `url(${`https://img.youtube.com/vi/${getVideoId(mediaUrl)}/hqdefault.jpg`})`
                }}
                onClick={() => onYoutubeModalOpen(mediaUrl)}
              />
            )}
          </CollapseMotion>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpecialtyModalItem;

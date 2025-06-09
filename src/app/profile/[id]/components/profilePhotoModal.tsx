"use client";

import Image from "next/image";
import X from "../../../../../public/icons/X.svg";
import ArrowChevronLeft from "../../../../../public/icons/ArrowChevronLeft.svg";
import ArrowChevronRight from "../../../../../public/icons/ArrowChevronRight.svg";
import { PhotoLabelType, SelectedPhotoType } from "../types";
import { PhotoResponseType } from "@/lib/types";
import { useState } from "react";

interface ProfilePhotoModalProps {
  photoLabel: PhotoLabelType;
  blurPhotoList: string[];
  selectedPhoto: SelectedPhotoType;
  selectedPhotoList: PhotoResponseType[];
  onPhotoModalClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfilePhotoModal = ({
  photoLabel,
  blurPhotoList,
  selectedPhoto,
  selectedPhotoList,
  onPhotoModalClose
}: ProfilePhotoModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(selectedPhoto.index);

  const onPrevButton = async () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedPhotoList.length) % selectedPhotoList.length
    );
  };

  const onNextButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedPhotoList.length);
  };

  return (
    <section
      className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-hidden bg-background-scrim-light bg-opacity-50 backdrop-blur-[20px] dark:bg-background-scrim-dark md:inset-0"
      onClick={onPhotoModalClose}
    >
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-content-primary-light p-1.5 dark:bg-content-primary-dark ${currentIndex === 0 && "opacity-40"}`}
        type="button"
        disabled={currentIndex === 0}
        onClick={(e) => {
          onPrevButton();
          e.stopPropagation();
        }}
      >
        <ArrowChevronLeft
          width="16"
          height="16"
          className="fill-current text-content-on_color-light dark:text-static-black"
        />
      </button>
      <div
        className={`flex h-full max-h-[80vh] w-full max-w-7xl animate-enter flex-col items-center justify-center gap-6`}
      >
        <Image
          src={
            photoLabel === "profilePhoto"
              ? selectedPhotoList[currentIndex].path
              : selectedPhotoList[currentIndex].previewPath
          }
          alt="photo"
          width={0}
          height={0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={blurPhotoList[currentIndex]}
          priority
          className={`max-h-[80vh] rounded-2xl ${photoLabel === "stillcutPhoto" ? "w-[100vh] min-w-[100vh]" : "w-[60vh] max-w-[80vh]"}`}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      <button
        className={`flex h-12 w-12 items-center justify-center rounded-full bg-content-primary-light p-1.5 dark:bg-content-primary-dark ${currentIndex === selectedPhotoList.length - 1 && "opacity-40"}`}
        type="button"
        disabled={currentIndex === selectedPhotoList.length - 1}
        onClick={(e) => {
          onNextButton();
          e.stopPropagation();
        }}
      >
        <ArrowChevronRight
          width="16"
          height="16"
          className="fill-current text-content-on_color-light dark:text-static-black"
        />
      </button>
      <button
        type="button"
        className="absolute right-12 top-12 rounded-full bg-static-black p-2 dark:bg-static-white"
        onClick={onPhotoModalClose}
      >
        <X
          width="20"
          height="20"
          className="fill-current text-content-on_color-light dark:text-static-black"
        />
      </button>
    </section>
  );
};

export default ProfilePhotoModal;

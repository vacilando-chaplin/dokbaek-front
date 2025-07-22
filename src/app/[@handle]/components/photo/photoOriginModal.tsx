"use client";

import {
  photoOriginModalState,
  profileViewState,
  selectedPhotoLabelState
} from "@/lib/recoil/handle/atom";
import Image from "next/image";
import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { photoOriginModalInit } from "../../data";
import ArrowChevronLeft from "../../../../../public/icons/ArrowChevronLeft.svg";
import ArrowChevronRight from "../../../../../public/icons/ArrowChevronRight.svg";
import X from "../../../../../public/icons/X.svg";
import LoadingSpinner from "../../../../../public/icons/LoadingSpinner.svg";
import EmptyImage from "@/components/atoms/emptyImage";

const PhotoOriginModal = () => {
  const profileData = useRecoilValue(profileViewState);
  const photoLabel = useRecoilValue(selectedPhotoLabelState);

  const [photoModal, setPhotoModal] = useRecoilState(photoOriginModalState);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(photoModal.index);

  const selectedPhotoList = profileData ? profileData[photoLabel] : [];

  const onPrevButton = async () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + selectedPhotoList.length) % selectedPhotoList.length
    );
  };

  const onNextButton = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % selectedPhotoList.length);
  };

  const onPhotoModalClose = () => {
    setPhotoModal(photoOriginModalInit);
  };

  return (
    photoModal.active && (
      <div
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
          {!isLoaded && !isError && (
            <LoadingSpinner
              width="24"
              height="24"
              className="fill-current absolute left-1/2 top-1/2 animate-spin text-content-primary-light dark:text-content-primary-dark"
            />
          )}
          <Image
            src={
              photoLabel === "photos"
                ? selectedPhotoList[currentIndex].path
                : selectedPhotoList[currentIndex].previewPath
            }
            alt="photo"
            width={0}
            height={0}
            sizes="100vw"
            priority
            className={`max-h-[80vh] rounded-2xl ${photoLabel === "stillCuts" ? "w-[100vh] min-w-[100vh]" : "w-[60vh] max-w-[80vh]"}`}
            onLoad={() => setIsLoaded(true)}
            onError={() => {
              setIsError(true);
              setIsLoaded(true);
            }}
          />
          {isError && <EmptyImage />}
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
      </div>
    )
  );
};

export default PhotoOriginModal;

"use client";

import {
  photoOriginModalState,
  profileViewState,
  selectedPhotoLabelState
} from "@/lib/recoil/handle/atom";
import { useEffect, useMemo, useState } from "react";
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

  const selectedPhotoList = useMemo(() => {
    if (profileData && profileData[photoLabel]) {
      return profileData[photoLabel];
    }
    return [];
  }, [profileData, photoLabel]);

  const onPrevButton = () => {
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

  const onResetImageState = () => {
    setIsLoaded(false);
    setIsError(false);
  };

  useEffect(() => {
    if (photoModal.active) {
      setCurrentIndex(photoModal.index || 0);
      onResetImageState();
    }
  }, [photoModal.active, photoModal.index]);

  useEffect(() => {
    setCurrentIndex(0);
    onResetImageState();
  }, [photoLabel]);

  useEffect(() => {
    onResetImageState();
  }, [currentIndex]);

  return (
    photoModal.active && (
      <div
        className="fixed inset-0 z-[50] flex items-center justify-center bg-background-scrim-light bg-opacity-50 backdrop-blur-[20px] dark:bg-background-scrim-dark"
        onClick={onPhotoModalClose}
      >
        {/* X Button */}
        <button
          type="button"
          className="absolute right-12 top-12 rounded-full bg-static-black p-2.5 dark:bg-static-white"
          onClick={onPhotoModalClose}
        >
          <X
            width="20"
            height="20"
            className="fill-current text-content-on_color-light dark:text-static-black"
          />
        </button>
        {/* Prev Button */}
        <button
          className={`fixed left-48 top-1/2 z-10 flex h-12 w-12 flex-shrink-0 -translate-y-1/2 items-center justify-center rounded-full bg-content-primary-light p-1.5 dark:bg-content-primary-dark ${
            currentIndex === 0 && "opacity-40"
          }`}
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
        <div className="flex h-full w-full items-center justify-center">
          <div
            className={`flex items-center ${photoLabel === "stillCuts" ? "gap-20" : "gap-40"}`}
          >
            <div className="relative flex h-full max-h-[70vh] w-full animate-enter flex-col items-center justify-center overflow-hidden md:max-w-lg xl:max-w-2xl 2xl:max-w-5xl">
              {!isLoaded && !isError && (
                <LoadingSpinner
                  width="24"
                  height="24"
                  className="fill-current absolute left-1/2 top-1/2 animate-spin text-content-primary-dark dark:text-content-primary-dark"
                />
              )}
              {!isError && (
                <img
                  src={selectedPhotoList[currentIndex].path}
                  alt="photo"
                  className={`max-h-[70vh] w-full rounded-2xl ${
                    photoLabel === "stillCuts" ? "min-w-[40vw]" : "min-w-[20vw]"
                  }`}
                  onLoad={() => setIsLoaded(true)}
                  onError={() => {
                    setIsError(true);
                    setIsLoaded(true);
                  }}
                />
              )}
              {isError && <EmptyImage />}
            </div>
          </div>
        </div>
        {/* Next Button */}
        <button
          className={`fixed right-48 top-1/2 z-10 flex h-12 w-12 flex-shrink-0 -translate-y-1/2 items-center justify-center rounded-full bg-content-primary-light p-1.5 dark:bg-content-primary-dark ${
            currentIndex === selectedPhotoList.length - 1 && "opacity-40"
          }`}
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
      </div>
    )
  );
};

export default PhotoOriginModal;

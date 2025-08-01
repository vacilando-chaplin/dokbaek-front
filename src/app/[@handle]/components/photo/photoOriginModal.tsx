"use client";

import {
  photoOriginModalState,
  profileViewState,
  selectedPhotoLabelState
} from "@/lib/recoil/handle/atom";
import Image from "next/image";
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
        <div
          className={`flex h-full w-full items-center justify-center ${photoLabel === "stillCuts" ? "gap-8" : "gap-4"}`}
        >
          {/* Prev Button */}
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-content-primary-light p-1.5 dark:bg-content-primary-dark ${
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
          <div className="relative flex h-full max-h-[80vh] w-full max-w-7xl animate-enter flex-col items-center justify-center">
            {!isLoaded && !isError && (
              <LoadingSpinner
                width="24"
                height="24"
                className="fill-current absolute left-1/2 top-1/2 animate-spin text-content-primary-light dark:text-content-primary-dark"
              />
            )}
            {!isError && (
              <div
                className={`relative max-h-[75vh] overflow-hidden rounded-2xl ${
                  photoLabel === "stillCuts"
                    ? "aspect-video min-w-[50vw]"
                    : "aspect-[3/4] min-w-[30vw]"
                }`}
              >
                <Image
                  src={selectedPhotoList[currentIndex].path}
                  alt="photo"
                  fill
                  quality={95}
                  sizes="100vw"
                  priority
                  className="rounded-2xl object-cover"
                  onLoad={() => setIsLoaded(true)}
                  onError={() => {
                    setIsError(true);
                    setIsLoaded(true);
                  }}
                />
              </div>
            )}
            {isError && <EmptyImage />}
          </div>
          {/* Next Button */}
          <button
            className={`flex h-12 w-12 items-center justify-center rounded-full bg-content-primary-light p-1.5 dark:bg-content-primary-dark ${
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
      </div>
    )
  );
};

export default PhotoOriginModal;

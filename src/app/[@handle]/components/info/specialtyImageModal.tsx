"use client";

import { specialtyImageModalState } from "@/lib/recoil/handle/atom";
import { useRecoilState } from "recoil";
import { imageModalInit } from "../../data";
import X from "../../../../../public/icons/X.svg";
import LoadingSpinner from "../../../../../public/icons/LoadingSpinner.svg";
import { useState } from "react";
import Image from "next/image";
import EmptyImage from "@/components/atoms/emptyImage";

const SpecialtyImageModal = () => {
  const [imageModal, setImageModal] = useRecoilState(specialtyImageModalState);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const onImageModalClose = () => {
    setImageModal(imageModalInit);
  };

  return (
    imageModal.active && (
      <div className="fixed inset-0 z-[50] flex items-center justify-center bg-background-scrim-light bg-opacity-50 backdrop-blur-[20px] dark:bg-background-scrim-dark">
        {/* X Button */}
        <button
          type="button"
          className="absolute right-12 top-12 rounded-full bg-static-black p-2.5 dark:bg-static-white"
          onClick={onImageModalClose}
        >
          <X
            width="20"
            height="20"
            className="fill-current text-content-on_color-light dark:text-static-black"
          />
        </button>
        <div className="flex h-full w-full items-center justify-center gap-4">
          <div className="relative flex h-full max-h-[80vh] w-full max-w-7xl animate-enter flex-col items-center justify-center">
            {!isLoaded && !isError && (
              <LoadingSpinner
                width="24"
                height="24"
                className="fill-current absolute left-1/2 top-1/2 animate-spin text-content-primary-dark dark:text-content-primary-dark"
              />
            )}
            {!isError && (
              <div className="relative h-[70vh] w-[50vw] overflow-hidden rounded-2xl">
                <Image
                  src={imageModal.imageUrl}
                  alt="specialtyImage"
                  fill
                  quality={95}
                  sizes="100vw"
                  priority
                  className="rounded-2xl object-contain"
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
        </div>
      </div>
    )
  );
};

export default SpecialtyImageModal;

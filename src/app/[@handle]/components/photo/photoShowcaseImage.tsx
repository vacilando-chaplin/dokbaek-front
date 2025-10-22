"use client";

import {
  photoOriginModalState,
  selectedPhotoLabelState
} from "@/lib/recoil/handle/atom";
import Image from "next/image";
import { useRecoilValue, useSetRecoilState } from "recoil";
import PlusCircle from "../../../../../public/icons/PlusCircle.svg";
import LoadingSpinner from "../../../../../public/icons/LoadingSpinner.svg";
import { useState } from "react";
import EmptyImage from "@/components/atoms/emptyImage";
import {
  ProfilePhotoDataType,
  ProfileRecentPhotoDataType
} from "../../edit/types";

interface PhotoShowcaseImageProps {
  photo: ProfilePhotoDataType | ProfileRecentPhotoDataType;
  index: number;
}

const PhotoShowcaseImage = ({ photo, index }: PhotoShowcaseImageProps) => {
  const photoLabel = useRecoilValue(selectedPhotoLabelState);

  const setPhotoModal = useSetRecoilState(photoOriginModalState);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  const onPhotoModalOpen = (path: string, id: string, index: number) => {
    setPhotoModal({
      active: true,
      path: path,
      id: id,
      index: index
    });
  };

  return (
    <div
      className="relative flex h-auto w-full cursor-pointer items-center justify-center rounded-[18px]"
      onClick={() => onPhotoModalOpen(photo.path, photo.id, index)}
    >
      <div
        className={`relative flex w-full items-center justify-center ${
          photoLabel === "stillCuts" ? "aspect-video" : "aspect-[258/330]"
        }`}
      >
        {!isLoaded && !isError && (
          <LoadingSpinner
            width="24"
            height="24"
            className="fill-current animate-spin text-content-primary-light dark:text-content-primary-dark"
          />
        )}
        <Image
          src={photo.previewPath}
          alt={photo.id}
          sizes="100vw, 80vw"
          fill
          quality={50}
          loading="lazy"
          unoptimized={true}
          className="rounded-2xl object-cover opacity-100 hover:opacity-30"
          onLoad={() => setIsLoaded(true)}
          onError={() => {
            setIsError(true);
            setIsLoaded(true);
          }}
        />
        {isError && <EmptyImage />}
        {!isError && (
          <div className="absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center gap-1 rounded-[14.8px] bg-static-black text-static-white opacity-0 transition-opacity hover:bg-[rgba(0,0,0,0.8)] hover:opacity-100">
            <PlusCircle
              width="20"
              height="20"
              className="fill-current text-content-on_color-light dark:text-content-on_color-dark"
            />
            <span className="typography-body2 font-semibold">크게 보기</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoShowcaseImage;

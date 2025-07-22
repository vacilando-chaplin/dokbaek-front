"use client";

import {
  ProfilePhotoDataType,
  ProfileRecentPhotoDataType
} from "@/app/profile/[id]/create/types";
import {
  photoListSliderState,
  profileViewState,
  selectedPhotoLabelState
} from "@/lib/recoil/handle/atom";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ArrowChevronLeft from "../../../../../public/icons/ArrowChevronLeft.svg";
import ArrowChevronRight from "../../../../../public/icons/ArrowChevronRight.svg";

const PhotoArrowButtons = () => {
  const profileData = useRecoilValue(profileViewState);
  const photoLabel = useRecoilValue(selectedPhotoLabelState);
  const [photoSlider, setPhotoSlider] = useRecoilState(photoListSliderState);

  const [selectedPhotoList, setSelectedPhotoList] = useState<
    ProfilePhotoDataType[] | ProfileRecentPhotoDataType[]
  >(profileData.photos);

  const onSliderPrev = () => {
    setPhotoSlider((prev) => (prev !== 0 ? prev - 1 : 0));
  };

  const onSliderNext = (slides: number) => {
    setPhotoSlider((prev) =>
      prev <= Math.floor(slides / 4) - 1 ? prev + 1 : prev
    );
  };

  useEffect(() => {
    setPhotoSlider(0);
    setSelectedPhotoList(profileData[photoLabel]);
  }, [photoLabel]);

  return (
    selectedPhotoList.length > 4 && (
      <div className="flex gap-1">
        {/* PrevButton */}
        <button
          className={`rounded-full bg-gray-150 p-1.5 ${photoSlider === 0 && "opacity-40"}`}
          type="button"
          disabled={photoSlider === 0}
          onClick={onSliderPrev}
        >
          <ArrowChevronLeft
            width="16"
            height="16"
            className="fill-current text-content-secondary-light dark:text-content-secondary-dark"
          />
        </button>
        {/* NextButton */}
        <button
          className={`rounded-full bg-gray-150 p-1.5 ${photoSlider === Math.floor(selectedPhotoList.length / 5) && "opacity-40"}`}
          type="button"
          disabled={photoSlider === Math.floor(selectedPhotoList.length / 5)}
          onClick={() => onSliderNext(selectedPhotoList.length)}
        >
          <ArrowChevronRight
            width="16"
            height="16"
            className="fill-current text-content-secondary-light dark:text-content-secondary-dark"
          />
        </button>
      </div>
    )
  );
};

export default PhotoArrowButtons;

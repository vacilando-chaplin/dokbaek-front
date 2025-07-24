"use client";

import {
  photoListSliderState,
  profileViewState,
  selectedPhotoLabelState
} from "@/lib/recoil/handle/atom";
import { useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ArrowChevronLeft from "../../../../../public/icons/ArrowChevronLeft.svg";
import ArrowChevronRight from "../../../../../public/icons/ArrowChevronRight.svg";

const PhotoArrowButtons = () => {
  const profileData = useRecoilValue(profileViewState);
  const photoLabel = useRecoilValue(selectedPhotoLabelState);
  const [photoSlider, setPhotoSlider] = useRecoilState(photoListSliderState);

  const selectedPhotoList = useMemo(() => {
    if (profileData && profileData[photoLabel]) {
      return profileData[photoLabel];
    }
    return [];
  }, [profileData, photoLabel]);

  useEffect(() => {
    setPhotoSlider(0);
  }, [photoLabel]);

  const itemsVisible = 4;
  const maxSlider = Math.max(0, selectedPhotoList.length - itemsVisible);

  const onSliderPrev = () => {
    setPhotoSlider((prev) => Math.max(prev - 1, 0));
  };

  const onSliderNext = () => {
    setPhotoSlider((prev) => Math.min(prev + 1, maxSlider));
  };

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
          className={`rounded-full bg-gray-150 p-1.5 ${photoSlider === Math.max(0, selectedPhotoList.length - 4) && "opacity-40"}`}
          type="button"
          disabled={photoSlider === Math.max(0, selectedPhotoList.length - 4)}
          onClick={() => onSliderNext()}
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

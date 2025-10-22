"use client";

import Title from "@/components/atoms/title";
import PhotoSelectChips from "./photoSelectChips";
import PhotoArrowButtons from "./photoArrowButtons";
import { profileViewState } from "@/lib/recoil/handle/atom";
import { useRecoilValue } from "recoil";

const PhotoShowcaseHeader = () => {
  const profileData = useRecoilValue(profileViewState);

  const hasPhoto =
    profileData?.photos.length >= 1 ||
    profileData?.stillCuts.length >= 1 ||
    profileData?.recentPhotos.length >= 1;

  return (
    <div className="flex flex-col gap-3">
      <Title name="사진" />
      {hasPhoto && (
        <div className="flex h-auto w-full flex-row items-center justify-between">
          <PhotoSelectChips />
          <PhotoArrowButtons />
        </div>
      )}
    </div>
  );
};

export default PhotoShowcaseHeader;

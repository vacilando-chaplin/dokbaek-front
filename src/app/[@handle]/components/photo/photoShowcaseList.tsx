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
import { useMemo } from "react";
import { useRecoilValue } from "recoil";
import ProfileShowcaseEmptyFrame from "../container/profileShowcaseEmptyFrame";
import PhotoShowcaseImage from "./photoShowcaseImage";

const PhotoShowcaseList = () => {
  const profileData = useRecoilValue(profileViewState);
  const photoLabel = useRecoilValue(selectedPhotoLabelState);
  const photoSlider = useRecoilValue(photoListSliderState);

  const selectedPhotoList = useMemo(() => {
    if (profileData && profileData[photoLabel]) {
      return profileData[photoLabel];
    }
    return [];
  }, [profileData, photoLabel]);

  return selectedPhotoList.length >= 1 ? (
    <div className="relative overflow-hidden">
      <div
        className="flex h-auto w-full flex-row transition-all duration-300 ease-out"
        style={{
          transform: `translateX(-${photoSlider * 25}%)`
        }}
      >
        {selectedPhotoList.map(
          (
            photo: ProfilePhotoDataType | ProfileRecentPhotoDataType,
            index: number
          ) => {
            return (
              <div key={photo.id} className="w-1/4 flex-shrink-0 pr-2">
                <PhotoShowcaseImage photo={photo} index={index} />
              </div>
            );
          }
        )}
      </div>
    </div>
  ) : (
    <ProfileShowcaseEmptyFrame text="사진이 없어요." />
  );
};

export default PhotoShowcaseList;

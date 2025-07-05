"use client";

import Title from "@/components/atoms/title";
import TitleHelperText from "./titleHelperText";
import RecentPhotoFrame from "./recentPhotoFrame";
import { recentPhotoData } from "../data";
import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { ProfileRecentPhotoDataType } from "../../types";
import PhotoPreviewCard from "./photoPreviewCard";
import { RecentPhotoDataType } from "../types";

const PhotoRecent = () => {
  const profileData = useRecoilValue(profileDraftData);

  const recentPhotoList: ProfileRecentPhotoDataType[] = profileData
    ? profileData.recentPhotos
    : [];

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <div className="flex flex-col gap-1">
        <Title name="최근 사진" />
        <TitleHelperText text="최근 3개월 내에 보정 없이 촬영한 사진을 추가해주세요." />
      </div>
      <div className="grid w-full grid-cols-4 gap-2">
        {recentPhotoData.map(
          (photoData: RecentPhotoDataType, index: number) => {
            const recentPhoto = recentPhotoList.find(
              (recentPhoto) => recentPhoto.photoType === photoData.photoType
            );
            return (
              <div className="flex h-auto w-full flex-row gap-2" key={index}>
                {recentPhoto ? (
                  <PhotoPreviewCard
                    category="recentPhotos"
                    previewPhoto={recentPhoto}
                  />
                ) : (
                  <RecentPhotoFrame
                    name={photoData.name}
                    photoType={photoData.photoType}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default PhotoRecent;

"use client";

import RecentPhotoFrame from "../frame/recentPhotoFrame";
import { recentPhotoData } from "../../data";
import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { ProfileRecentPhotoDataType } from "../../../types";
import { CategoryKey, RecentPhotoDataType } from "../../types";
import PhotoInfoForm from "../form/photoInfoForm";
import PhotoPreviewCard from "../contents/photoPreviewCard";

interface PhotoRecentProps {
  category: CategoryKey;
}

const PhotoRecent = ({ category }: PhotoRecentProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const recentPhotoList: ProfileRecentPhotoDataType[] =
    profileData?.recentPhotos || [];

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <PhotoInfoForm hasLimit={false} hasButton={false} category={category} />
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

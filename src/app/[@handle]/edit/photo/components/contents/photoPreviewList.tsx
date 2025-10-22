"use client";

import PhotoPreviewCard from "./photoPreviewCard";
import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { CategoryKey } from "../../types";
import { ProfilePhotoDataType } from "../../../types";

interface PhotoPreviewListProps {
  category: CategoryKey;
}

const PhotoPreviewList = ({ category }: PhotoPreviewListProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const photoList: ProfilePhotoDataType[] =
    category === "photos"
      ? (profileData?.photos ?? [])
      : category === "stillCuts"
        ? (profileData?.stillCuts ?? [])
        : [];

  return (
    photoList?.length >= 1 && (
      <div className="grid w-full grid-cols-4 gap-2 rounded-xl">
        {photoList.map((previewPhoto: ProfilePhotoDataType) => {
          return (
            <PhotoPreviewCard
              key={previewPhoto.id}
              category={category}
              previewPhoto={previewPhoto}
            />
          );
        })}
      </div>
    )
  );
};

export default PhotoPreviewList;

"use client";

import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { CategoryKey } from "../../types";

interface PhotoLimitLabelProps {
  limit: number;
  category: CategoryKey;
}

const PhotoLimitLabel = ({ limit, category }: PhotoLimitLabelProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const photos = profileData?.photos ?? [];
  const stillCuts = profileData?.stillCuts ?? [];

  const photoListLength =
    category === "photos"
      ? photos.length
      : category === "stillCuts"
        ? stillCuts.length
        : 0;

  return (
    <div className="typography-caption1 flex h-fit w-fit flex-row gap-0.5 rounded-[100px] bg-gray-100 px-2 py-[1px] font-medium">
      <label className="text-accent-primary-light dark:text-accent-primary-dark">
        {photoListLength}
      </label>
      <label className="text-content-tertiary-light dark:text-content-tertiary-dark">
        /
      </label>
      <label className="text-content-tertiary-light dark:text-content-tertiary-dark">
        {limit}
      </label>
    </div>
  );
};

export default PhotoLimitLabel;

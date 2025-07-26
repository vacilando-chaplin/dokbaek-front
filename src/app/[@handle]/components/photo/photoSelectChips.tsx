"use client";

import ChipItem from "@/components/atoms/chipItem";
import { selectedPhotoLabelState } from "@/lib/recoil/handle/atom";
import { useRecoilState } from "recoil";
import { SelectedPhotoLabelType } from "../../types";

const PhotoSelectChips = () => {
  const [photoLabel, setPhotoLabel] = useRecoilState(selectedPhotoLabelState);

  const onSwitchPhotoLabel = (label: SelectedPhotoLabelType) => {
    setPhotoLabel(label);
  };

  return (
    <div className="flex flex-row gap-2">
      <ChipItem
        state={photoLabel === "photos" ? "selected" : "default"}
        onClick={() => onSwitchPhotoLabel("photos")}
      >
        프로필 사진
      </ChipItem>
      <ChipItem
        state={photoLabel === "stillCuts" ? "selected" : "default"}
        onClick={() => onSwitchPhotoLabel("stillCuts")}
      >
        스틸컷
      </ChipItem>
      <ChipItem
        state={photoLabel === "recentPhotos" ? "selected" : "default"}
        onClick={() => onSwitchPhotoLabel("recentPhotos")}
      >
        최근 사진
      </ChipItem>
    </div>
  );
};

export default PhotoSelectChips;

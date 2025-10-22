"use client";

import EmptyFrame from "@/components/atoms/emptyFrame";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { useRecoilValue } from "recoil";

const FilmoEmptyFrame = () => {
  const profileData = useRecoilValue(profileDraftData);

  const filmoList = profileData?.filmos ?? [];
  return (
    filmoList.length === 0 && <EmptyFrame text="작품 활동을 추가해주세요." />
  );
};

export default FilmoEmptyFrame;

"use client";

import { profileViewState } from "@/lib/recoil/handle/atom";
import { useRecoilValue } from "recoil";
import FilmoShowcaseItem from "./filmoShowcaseItem";
import ProfileShowcaseEmptyFrame from "../container/profileShowcaseEmptyFrame";

const FilmoShowcaseList = () => {
  const profileData = useRecoilValue(profileViewState);
  const filmoList = profileData.filmos || [];

  const maxVisible = 6;

  const featured = filmoList
    .filter((filmo) => filmo.featured)
    .slice(0, maxVisible);
  const nonFeatured = filmoList.filter((filmo) => !filmo.featured);

  const visibleFilmoList = [...featured, ...nonFeatured].slice(0, maxVisible);

  return visibleFilmoList.length >= 1 ? (
    <div className="grid h-auto w-full grid-cols-[repeat(auto-fill,_minmax(224px,_1fr))] gap-2 [@media(min-width:1140px)]:grid-cols-3">
      {visibleFilmoList.map((filmo) => {
        return <FilmoShowcaseItem key={filmo.id} filmo={filmo} />;
      })}
    </div>
  ) : (
    <ProfileShowcaseEmptyFrame text="작품 활동이 없어요." type="filmo" />
  );
};

export default FilmoShowcaseList;

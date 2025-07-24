"use client";

import { profileViewState } from "@/lib/recoil/handle/atom";
import { useRecoilValue } from "recoil";
import FilmoShowcaseItem from "./filmoShowcaseItem";

const FilmoShowcaseList = () => {
  const profileData = useRecoilValue(profileViewState);
  const filmoList = profileData.filmos || [];

  const maxVisible = 6;

  const featured = filmoList
    .filter((filmo) => filmo.featured)
    .slice(0, maxVisible);
  const nonFeatured = filmoList.filter((filmo) => !filmo.featured);

  const visibleFilmoList = [...featured, ...nonFeatured].slice(0, maxVisible);

  return (
    <div className="grid h-auto w-full grid-cols-3 gap-2">
      {visibleFilmoList.map((filmo) => {
        return <FilmoShowcaseItem key={filmo.id} filmo={filmo} />;
      })}
    </div>
  );
};

export default FilmoShowcaseList;

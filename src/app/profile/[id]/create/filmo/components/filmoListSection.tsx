"use client";

import { useRecoilValue } from "recoil";
import { ProfileFilmoDataType } from "../../types";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { classificationList } from "@/lib/data";
import FilmoList from "./filmoList";

const FilmoListSection = () => {
  const profileData = useRecoilValue(profileDraftData);

  const filmoList = profileData?.filmos ?? [];
  const repFilmoList = filmoList.filter(
    (filmo: ProfileFilmoDataType) => filmo.featured === true
  );

  const existingCategories = new Set(
    filmoList.map(
      (filmo: ProfileFilmoDataType) => filmo.production.category.name
    )
  );

  const categoryList = classificationList.filter((category) =>
    existingCategories.has(category)
  );

  return (
    <section className="flex flex-col gap-6">
      {repFilmoList.length >= 1 && (
        <FilmoList category="대표작" filmoList={repFilmoList} />
      )}
      {categoryList.map((category) => (
        <FilmoList
          key={category}
          category={category}
          filmoList={filmoList.filter(
            (filmo: ProfileFilmoDataType) =>
              filmo.production.category.name === category &&
              filmo.featured === false
          )}
        />
      ))}
    </section>
  );
};

export default FilmoListSection;

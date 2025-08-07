"use client";

import { useRecoilValue } from "recoil";
import { ProfileFilmoDataType } from "../../../types";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import FilmoList from "./filmoList";
import { filmoCategoryListState } from "@/lib/recoil/handle/edit/filmo/atom";

const FilmoListSection = () => {
  const profileData = useRecoilValue(profileDraftData);
  const filmoCategoryList = useRecoilValue(filmoCategoryListState);

  const filmoList = profileData?.filmos ?? [];
  const repFilmoList = filmoList.filter(
    (filmo: ProfileFilmoDataType) => filmo.featured === true
  );

  const categoriesWithNonFeatured = new Set(
    filmoList
      .filter((filmo: ProfileFilmoDataType) => filmo.featured === false)
      .map((filmo: ProfileFilmoDataType) => filmo.production.category.name)
  );

  const existingCategories = new Set(
    filmoList.map(
      (filmo: ProfileFilmoDataType) => filmo.production.category.name
    )
  );

  const categoryList = filmoCategoryList.filter(
    (category) =>
      existingCategories.has(category.name) &&
      categoriesWithNonFeatured.has(category.name)
  );

  return (
    filmoList.length >= 1 && (
      <section className="flex flex-col gap-6">
        {repFilmoList.length >= 1 && (
          <FilmoList category="대표작" filmoList={repFilmoList} />
        )}
        {categoryList.map((category) => (
          <FilmoList
            key={category.id}
            category={category.name}
            filmoList={filmoList.filter(
              (filmo: ProfileFilmoDataType) =>
                filmo.production.category.name === category.name &&
                filmo.featured === false
            )}
          />
        ))}
      </section>
    )
  );
};

export default FilmoListSection;

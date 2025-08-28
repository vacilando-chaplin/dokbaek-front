"use client";

import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { filmoCategoryListState } from "@/lib/recoil/handle/edit/filmo/atom";
import { useRecoilValue } from "recoil";
import { ProfileFilmoDataType } from "../../../types";
import FilmoRepModalList from "./filmoRepModalList";

const FilmoRepModalContents = () => {
  const profileData = useRecoilValue(profileDraftData);
  const filmoCategoryList = useRecoilValue(filmoCategoryListState);

  const filmoList = profileData?.filmos ?? [];

  const existingCategories = new Set(
    filmoList.map(
      (filmo: ProfileFilmoDataType) => filmo.production.category.name
    )
  );

  const categoryList = filmoCategoryList.filter((category) =>
    existingCategories.has(category.name)
  );

  return (
    filmoList.length >= 1 && (
      <div className="scrollbar dark:dark-scrollbar flex h-full w-full flex-col gap-6 overscroll-contain bg-background-surface-light p-6 dark:bg-background-surface-dark">
        {categoryList.map((category) => (
          <FilmoRepModalList
            key={category.id}
            category={category.name}
            filmoList={filmoList.filter(
              (filmo: ProfileFilmoDataType) =>
                filmo.production.category.name === category.name
            )}
          />
        ))}
      </div>
    )
  );
};

export default FilmoRepModalContents;

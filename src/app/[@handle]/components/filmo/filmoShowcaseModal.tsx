"use client";

import Title from "@/components/atoms/title";
import ModalHeader from "@/components/molecules/modalHeader";
import FilmoShowcaseItem from "./filmoShowcaseItem";
import { ProfileFilmoDataType } from "@/app/profile/[id]/create/types";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filmoViewAllModalState,
  profileFilmoCategoryState,
  profileViewState
} from "@/lib/recoil/handle/atom";
import { FilmoCategoryType } from "@/lib/types";

const FilmoShowcaseModal = () => {
  const profileData = useRecoilValue(profileViewState);
  const filmoCategories = useRecoilValue(profileFilmoCategoryState);

  const [filmoModal, setFilmoModal] = useRecoilState(filmoViewAllModalState);

  const filmoList = profileData?.filmos || [];
  const categories = filmoCategories || [];

  const existingCategories = new Set(
    filmoList.map(
      (filmo: ProfileFilmoDataType) => filmo.production.category.name
    )
  );

  const categoryList = categories.filter((category) =>
    existingCategories.has(category.name)
  );

  const onFilmoModalClose = () => {
    setFilmoModal((prev) => !prev);
  };

  return (
    filmoModal && (
      <section className="fixed inset-0 z-[50] flex h-auto w-full items-center justify-center overflow-auto bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark">
        <div className="interaction-default relative my-20 flex h-auto w-full max-w-[1024px] animate-enter flex-col items-center justify-center rounded-3xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
          <ModalHeader name="작품 활동" onClick={onFilmoModalClose} />
          <div className="scrollbar dark:dark-scrollbar flex h-full max-h-[80vh] w-full flex-col overflow-auto overscroll-contain rounded-3xl">
            {categoryList.map((category: FilmoCategoryType) => {
              const filmo = filmoList.filter(
                (filmo: ProfileFilmoDataType) =>
                  filmo.production.category.name === category.name
              );
              return (
                <div
                  key={category.id}
                  className="flex h-full w-full flex-col gap-4 p-6"
                >
                  <Title name={category.name} />
                  <div className="grid h-auto w-full grid-flow-row grid-cols-3 gap-2">
                    {filmo.map((item: ProfileFilmoDataType) => {
                      return <FilmoShowcaseItem filmo={item} key={item.id} />;
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    )
  );
};

export default FilmoShowcaseModal;

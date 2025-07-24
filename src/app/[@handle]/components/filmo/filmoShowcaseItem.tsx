"use client";

import Image from "next/image";
import PlayCircle from "../../../../../public/icons/PlayCircle.svg";
import LogoHorizontalSmall from "../../../../../public/icons/LogoHorizontalSmall.svg";
import { ProfileFilmoDataType } from "@/app/profile/[id]/create/types";
import { useSetRecoilState } from "recoil";
import { filmoYoutubeModalState } from "@/lib/recoil/handle/atom";

interface FilmoShowcaseItemProps {
  filmo: ProfileFilmoDataType;
}

const FilmoShowcaseItem = ({ filmo }: FilmoShowcaseItemProps) => {
  const { role, customRole, character, production } = filmo;
  const setYoutubeModal = useSetRecoilState(filmoYoutubeModalState);

  // 필모그래피 링크 모달 오픈
  const onYoutubeModalOpen = (link: string) => {
    setYoutubeModal({ url: link, active: true });
  };

  return (
    <div className="flex h-auto w-full gap-4 rounded-2xl border border-border-default-light p-5 dark:border-border-default-dark">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-auto w-full flex-col gap-1.5">
          <div className="flex h-auto w-full flex-col gap-1">
            <label className="typography-caption1 hidden font-medium text-content-tertiary-light dark:text-content-tertiary-dark md:block">
              {production.productionYear >= 1
                ? `${production.productionYear + " | " + production.category.name}`
                : production.category.name}
            </label>
            <label className="typography-body1 font-semibold text-content-primary-light dark:text-content-primary-dark">
              {production.title}
            </label>
          </div>
          <div className="typography-caption1 flex h-auto w-full flex-col gap-0.5 font-normal text-content-secondary-light dark:text-content-secondary-dark">
            <label className="hidden md:block">
              {role && (role.id === 4 ? customRole : role.name)}
              {character && `'${character}'`}
            </label>
            <label className="hidden md:block">{production.description}</label>
          </div>
        </div>
        {/* link */}
        <button
          type="button"
          className="hidden w-fit md:block"
          disabled={!production.videoUrl}
          onClick={() => onYoutubeModalOpen(production.videoUrl)}
        >
          <PlayCircle
            width="16"
            height="16"
            className={`fill-current ${production.videoUrl ? "text-content-primary-light dark:text-content-primary-dark" : "text-content-alternative-light dark:text-content-alternative-dark"}`}
          />
        </button>
      </div>
      <div className="hidden min-h-[114px] min-w-[76px] items-center justify-center rounded-lg bg-gray-100 md:flex">
        {filmo.thumbnailPath === null ||
        filmo.thumbnailPath.endsWith("null") ? (
          <LogoHorizontalSmall
            width="20"
            height="20"
            className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
          />
        ) : (
          <div className="relative h-[114px] w-[76px] overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={filmo.thumbnailPath}
              alt={production.title}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmoShowcaseItem;

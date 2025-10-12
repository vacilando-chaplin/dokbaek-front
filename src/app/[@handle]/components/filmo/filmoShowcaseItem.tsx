"use client";

import Image from "next/image";
import PlayCircle from "../../../../../public/icons/PlayCircle.svg";
import PlayFill from "../../../../../public/icons/PlayFill.svg";
import LogoHorizontalSmall from "../../../../../public/icons/LogoHorizontalSmall.svg";
import { useSetRecoilState } from "recoil";
import { filmoYoutubeModalState } from "@/lib/recoil/handle/atom";
import { ProfileFilmoDataType } from "../../edit/types";
import { useState } from "react";
import LoadingSpinner from "../../../../../public/icons/LoadingSpinner.svg";
import EmptyImage from "@/components/atoms/emptyImage";

interface FilmoShowcaseItemProps {
  filmo: ProfileFilmoDataType;
}

const FilmoShowcaseItem = ({ filmo }: FilmoShowcaseItemProps) => {
  const { role, customRole, character, featured, production } = filmo;
  const setYoutubeModal = useSetRecoilState(filmoYoutubeModalState);

  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // 필모그래피 링크 모달 오픈
  const onYoutubeModalOpen = (link: string) => {
    setYoutubeModal({ url: link, active: true });
  };

  return (
    <div className="flex h-auto w-full gap-4 rounded-2xl border border-border-default-light p-5 dark:border-border-default-dark max-lg:flex-col">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-auto w-full flex-col gap-1s">
          <div className="flex h-auto w-full flex-col gap-1">
            <label className="typography-caption1 hidden font-medium text-content-tertiary-light dark:text-content-tertiary-dark md:block">
              { featured
                ?
                  <span>
                    <b className="font-semibold text-accent-primary-light dark:text-accent-primary-light">대표작</b>
                    <b className="text-gray-200"> | </b>
                  </span>
                : ''
              }
              {production.productionYear >= 1
                ? <>{production.productionYear} <b className="text-gray-200"> | </b> {production.category.name}</>
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
        {
          production.videoUrl &&
            <>
              <button
                type="button"
                className="hidden md:flex items-center justify-center gap-0.5 py-[3px] px-[8px] pl-[6px] bg-[#EAF2FE] w-fit h-[20px] rounded-[100px] max-lg:mt-1.5 typography-caption2 text-accent-primary-light dark:text-accent-primary-light"
                disabled={!production.videoUrl}
                onClick={() => onYoutubeModalOpen(production.videoUrl)}
              >
                <PlayFill
                  width="12"
                  height="12"
                  className={`fill-current flex-shrink-0 align-middle ${production.videoUrl ? "text-accent-primary-light dark:text-accent-primary-light" : "text-accent-primary-light dark:text-accent-primary-light"}`}
                />
                재생
              </button>
            </>
        }
      </div>
      <div className="hidden min-h-[114px] min-w-[76px] items-center justify-center rounded-lg bg-gray-100 md:flex max-lg:min-w-full">
        {filmo.thumbnailPath === null ||
        filmo.thumbnailPath.endsWith("null") || isError ? (
          <LogoHorizontalSmall
            width="20"
            height="20"
            className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
          />
        ) : (
          <div className="relative flex h-[114px] w-[76px] items-center justify-center overflow-hidden rounded-lg bg-gray-100 max-lg:w-full">
            {!isLoaded && !isError && (
              <LoadingSpinner
                width="24"
                height="24"
                className="fill-current animate-spin text-content-primary-light dark:text-content-primary-dark"
              />
            )}
            <Image
              src={filmo.thumbnailPath}
              alt={production.title}
              fill
              className="object-cover"
              unoptimized={true}
              onLoad={() => setIsLoaded(true)}
              onError={() => {
                setIsError(true);
                setIsLoaded(true);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default FilmoShowcaseItem;

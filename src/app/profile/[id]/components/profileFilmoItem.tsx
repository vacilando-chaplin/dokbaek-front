"use client";

import { FilmoResponseType } from "@/lib/types";
import Image from "next/image";
import Edit from "../../../../../public/icons/Edit.svg";
import X from "../../../../../public/icons/X.svg";
import PlayCircle from "../../../../../public/icons/PlayCircle.svg";
import LogoHorizontalSmall from "../../../../../public/icons/LogoHorizontalSmall.svg";
import Checkbox from "@/components/atoms/checkbox";

interface ProfileFilmoItemProps {
  filmo: FilmoResponseType;
  onLink: any;
}

const ProfileFilmoItem = ({ filmo, onLink }: ProfileFilmoItemProps) => {
  const { id, role, customRole, character, production } = filmo;

  return (
    <div className="flex h-[154px] w-full gap-4 rounded-2xl border border-border-default-light p-5 dark:border-border-default-dark">
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-auto w-full flex-col gap-1.5">
          <div className="flex h-auto w-full flex-col gap-1">
            <label className="typography-caption1 hidden font-medium text-content-tertiary-light dark:text-content-tertiary-dark sm:block">
              {production.productionYear >= 1
                ? `${production.productionYear + " | " + production.category.name}`
                : production.category.name}
            </label>
            <label className="typography-body1 hidden font-semibold text-content-primary-light dark:text-content-primary-dark sm:block">
              {production.title}
            </label>
          </div>
          <div className="typography-caption1 flex h-auto w-full flex-col gap-0.5 font-normal text-content-secondary-light dark:text-content-secondary-dark">
            <label className="hidden sm:block">
              {role !== null && customRole && role.id === 4 && customRole}
              {role !== null && role.name}
              {character && `'${character}'`}
            </label>
            <label className="hidden sm:block">{production.description}</label>
          </div>
        </div>
        {/* link */}
        <button
          type="button"
          className="hidden w-fit sm:block"
          disabled={!production.videoUrl}
          onClick={() => onLink(production.videoUrl)}
        >
          <PlayCircle
            width="16"
            height="16"
            className={`fill-current ${production.videoUrl ? "text-content-primary-light dark:text-content-primary-dark" : "text-content-alternative-light dark:text-content-alternative-dark"}`}
          />
        </button>
      </div>
      <div className="flex min-h-[114px] min-w-[76px] items-center justify-center rounded-lg bg-gray-100">
        {filmo.thumbnailPath === null ||
        filmo.thumbnailPath.endsWith("null") ? (
          <LogoHorizontalSmall
            width="20"
            height="20"
            className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
          />
        ) : (
          <div className="relative aspect-[76/114] w-[76px] overflow-hidden rounded-lg bg-gray-100">
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

export default ProfileFilmoItem;

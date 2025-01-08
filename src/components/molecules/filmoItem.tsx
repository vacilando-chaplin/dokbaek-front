"use client";

import { FilmoResponseType } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import Check from "../../../public/icons/Check.svg";
import Edit from "../../../public/icons/Edit.svg";
import X from "../../../public/icons/X.svg";
import PlayCircle from "../../../public/icons/PlayCircle.svg";
import LogoHorizontalSmall from "../../../public/icons/LogoHorizontalSmall.svg";
import Checkbox from "../atoms/checkbox";

interface FilmoItemProps {
  filmo: FilmoResponseType;
  filmoRepresentActive?: boolean;
  representativeCount?: number;
  canEdit: boolean;
  onEdit?: any;
  onDelete?: any;
  onCheck?: any;
  onLink?: any;
}

const FilmoItem = ({
  filmo,
  filmoRepresentActive,
  representativeCount,
  canEdit,
  onEdit,
  onDelete,
  onCheck,
  onLink
}: FilmoItemProps) => {
  const { id, role, customRole, character, is_featured, production } = filmo;

  const checkYoutube =
    (production.videoUrl &&
      production.videoUrl.includes("https://www.youtube.com")) ||
    production.videoUrl.includes("https://youtu.be/");

  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (representativeCount && representativeCount >= 6) {
      if (is_featured) {
        setDisabled(false);
      }
      if (is_featured === false) {
        setDisabled(true);
      }
    } else {
      setDisabled(false);
    }
  }, [representativeCount]);

  return (
    <div className="flex h-[154px] w-full animate-enter gap-4 rounded-2xl border border-border-default-light p-5">
      {filmoRepresentActive && (
        <Checkbox
          type="checkboxInput"
          size="medium"
          onChange={() => onCheck(id)}
        />
      )}
      {!filmoRepresentActive && canEdit && (
        <div className="flex flex-col gap-1">
          {/* edit */}
          <button
            className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
            type="button"
            onClick={() => onEdit(filmo)}
          >
            <Edit width="12" height="12" fill="#212529" />
          </button>
          {/* delete */}
          <button
            className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
            type="button"
            onClick={() => onDelete(id)}
          >
            <X width="12" height="12" fill="#FB3E34" />
          </button>
        </div>
      )}
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-auto w-full flex-col gap-1.5">
          <div className="flex h-auto w-full flex-col gap-1">
            <label className="text-caption1 font-medium leading-caption1 tracking-caption1 text-content-tertiary-light">
              {production.productionYear >= 1
                ? `${production.productionYear + " | " + production.category.name}`
                : production.category.name}
            </label>
            <label className="text-body1 font-semibold leading-body1 tracking-body1 text-content-primary-light">
              {production.title}
            </label>
          </div>
          <div className="flex h-auto w-full flex-col gap-0.5 text-caption1 font-normal leading-caption1 tracking-caption1 text-content-secondary-light">
            <label>
              {customRole && role.id === 4 ? customRole : role.name}{" "}
              {character && `'${character}'`}
            </label>
            <label>{production.description}</label>
          </div>
        </div>
        {/* link */}
        {checkYoutube && (
          <button
            type="button"
            className="w-fit"
            onClick={() => onLink(production.videoUrl)}
          >
            <PlayCircle
              width="16"
              height="16"
              fill={checkYoutube ? "#212529" : "#ADB5BD"}
            />
          </button>
        )}
      </div>
      <div className="flex min-h-[114px] min-w-[76px] items-center justify-center rounded-lg bg-gray-100">
        {production.thumbnailUrl ? (
          <Image
            src={production.thumbnailUrl}
            alt={production.title}
            width={76}
            height={114}
            className="h-[114px] w-[76px] rounded-lg bg-gray-100"
          />
        ) : (
          <LogoHorizontalSmall width="20" height="20" fill="#ADB5BD" />
        )}
      </div>
    </div>
  );
};

export default FilmoItem;

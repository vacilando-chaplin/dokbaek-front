"use client";

import { FilmoResponseType } from "@/lib/types";
import Image from "next/image";
import Edit from "../../../../../public/icons/Edit.svg";
import X from "../../../../../public/icons/X.svg";
import PlayCircle from "../../../../../public/icons/PlayCircle.svg";
import LogoHorizontalSmall from "../../../../../public/icons/LogoHorizontalSmall.svg";
import Checkbox from "@/components/atoms/checkbox";

interface FilmoItemProps {
  filmo: FilmoResponseType;
  checked?: boolean;
  checkDisabled?: boolean;
  filmoRepresentActive?: boolean;
  canEdit: boolean;
  onEdit?: any;
  onDelete?: any;
  onCheck?: any;
  onLink?: any;
}

const FilmoItem = ({
  filmo,
  checked,
  checkDisabled,
  filmoRepresentActive,
  canEdit,
  onEdit,
  onDelete,
  onCheck,
  onLink
}: FilmoItemProps) => {
  const { id, role, customRole, character, production } = filmo;

  const checkYoutube =
    (production.videoUrl &&
      production.videoUrl.includes("https://www.youtube.com")) ||
    production.videoUrl.includes("https://youtu.be/");

  return (
    <div className="flex h-[154px] w-full gap-4 rounded-2xl border border-border-default-light p-5">
      {filmoRepresentActive && (
        <Checkbox
          type="checkboxInput"
          size="medium"
          checked={checked}
          disabled={checkDisabled && !checked}
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
            <label className="typography-caption1 font-medium text-content-tertiary-light">
              {production.productionYear >= 1
                ? `${production.productionYear + " | " + production.category.name}`
                : production.category.name}
            </label>
            <label className="typography-body1 font-semibold text-content-primary-light">
              {production.title}
            </label>
          </div>
          <div className="typography-caption1 flex h-auto w-full flex-col gap-0.5 font-normal text-content-secondary-light">
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
        {filmo.thumbnailPath === null ||
        filmo.thumbnailPath.endsWith("null") ? (
          <LogoHorizontalSmall width="20" height="20" fill="#ADB5BD" />
        ) : (
          <Image
            src={filmo.thumbnailPath}
            alt={production.title}
            width={76}
            height={114}
            className="h-[114px] w-[76px] rounded-lg bg-gray-100"
          />
        )}
      </div>
    </div>
  );
};

export default FilmoItem;

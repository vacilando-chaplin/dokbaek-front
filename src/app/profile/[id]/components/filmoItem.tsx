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
  filmoRepActive?: boolean;
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
  filmoRepActive,
  canEdit,
  onEdit,
  onDelete,
  onCheck,
  onLink
}: FilmoItemProps) => {
  const { id, role, customRole, character, production } = filmo;

  return (
    <div className="flex h-[154px] w-full gap-4 rounded-2xl border border-border-default-light p-5 dark:border-border-default-dark">
      {filmoRepActive && (
        <Checkbox
          type="checkboxInput"
          size="medium"
          checked={checked}
          disabled={checkDisabled && !checked}
          onChange={() => onCheck(id)}
        />
      )}
      {!filmoRepActive && canEdit && (
        <div className="flex flex-col gap-1">
          {/* edit */}
          <button
            className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
            type="button"
            onClick={() => onEdit(filmo)}
          >
            <Edit
              width="12"
              height="12"
              className="fill-current text-content-primary-light dark:text-content-primary-dark"
            />
          </button>
          {/* delete */}
          <button
            className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
            type="button"
            onClick={() => onDelete(id)}
          >
            <X
              width="12"
              height="12"
              className="fill-current text-state-negative-light dark:text-state-negative-dark"
            />
          </button>
        </div>
      )}
      <div className="flex h-full w-full flex-col justify-between">
        <div className="flex h-auto w-full flex-col gap-1.5">
          <div className="flex h-auto w-full flex-col gap-1">
            <label className="typography-caption1 font-medium text-content-tertiary-light dark:text-content-tertiary-dark">
              {production.productionYear >= 1
                ? `${production.productionYear + " | " + production.category.name}`
                : production.category.name}
            </label>
            <label className="typography-body1 font-semibold text-content-primary-light dark:text-content-primary-dark">
              {production.title}
            </label>
          </div>
          <div className="typography-caption1 flex h-auto w-full flex-col gap-0.5 font-normal text-content-secondary-light dark:text-content-secondary-dark">
            <label>
              {role !== null && customRole && role.id === 4 && customRole}
              {role !== null && role.name}
              {character && `'${character}'`}
            </label>
            <label>{production.description}</label>
          </div>
        </div>
        {/* link */}
        <button
          type="button"
          className="w-fit"
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
          <Image
            src={filmo.thumbnailPath}
            alt={production.title}
            width={76}
            height={114}
            className="aspect-[76/114] rounded-lg bg-gray-100"
          />
        )}
      </div>
    </div>
  );
};

export default FilmoItem;

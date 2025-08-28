"use client";

import Checkbox from "@/components/atoms/checkbox";
import Image from "next/image";
import LogoHorizontalSmall from "../../../../../../../public/icons/LogoHorizontalSmall.svg";
import { useRecoilState, useRecoilValue } from "recoil";
import { filmoRepEditListState } from "@/lib/recoil/handle/edit/filmo/atom";
import { profileDraftData } from "@/lib/recoil/handle/edit/common/atom";
import { ProfileFilmoDataType } from "../../../types";
import { useState } from "react";
import Tooltip from "@/components/atoms/tooltip";

interface FilmoRepModalItemProps {
  filmo: ProfileFilmoDataType;
}

const FilmoRepModalItem = ({ filmo }: FilmoRepModalItemProps) => {
  const profileData = useRecoilValue(profileDraftData);

  const [filmoRepEditList, setFilmoRepEditList] = useRecoilState(
    filmoRepEditListState
  );

  const [showTooltip, setShowTooltip] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const { id, role, customRole, character, production } = filmo;

  const filmoList = profileData?.filmos ?? [];
  const checked = filmoRepEditList.find((rep) => rep.id === filmo.id)
    ? true
    : false;
  const checkRep = filmoRepEditList.length >= 6;
  const notAllowed = checkRep && !checked;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (notAllowed) {
      setMousePos({ x: e.clientX, y: e.clientY });
    }
  };

  const onMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (notAllowed) {
      setMousePos({ x: e.clientX, y: e.clientY });
      setShowTooltip(true);
    }
  };

  const onMouseLeave = () => {
    setShowTooltip(false);
  };

  // 필모그래피 대표작 설정 체크
  const onFilmoRepCheck = (id: number) => {
    const findFilmo = filmoList.find((item) => item.id === id);

    if (!findFilmo) {
      return;
    }

    const isAlreadySelected = filmoRepEditList.some((item) => item.id === id);

    if (isAlreadySelected) {
      setFilmoRepEditList(filmoRepEditList.filter((filmo) => filmo.id !== id));
    } else {
      setFilmoRepEditList([...filmoRepEditList, findFilmo]);
    }
  };

  return (
    <div
      className="relative"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <button
        type="button"
        className={`interaction-default flex h-[154px] w-full gap-4 rounded-2xl border p-5 ${checked ? "border-accent-primary-light dark:border-accent-primary-dark" : checkRep ? "border-border-default-light dark:border-border-default-dark" : "hover:border-accent-primary-light dark:hover:border-accent-primary-dark"} ${notAllowed ? "cursor-not-allowed" : "cursor-pointer"}`}
        onClick={() => onFilmoRepCheck(id)}
        disabled={notAllowed}
      >
        <div onClick={(e) => e.preventDefault()}>
          <Checkbox
            size="medium"
            checked={checked}
            disabled={notAllowed}
            onChange={() => {}}
          />
        </div>
        <div className="flex h-full w-full flex-col justify-between">
          <div className="flex h-auto w-fit flex-col gap-1.5">
            <div className="flex h-auto w-full flex-col items-start gap-1">
              <label className="typography-caption1 hidden cursor-[inherit] font-medium text-content-tertiary-light dark:text-content-tertiary-dark sm:block">
                {production.productionYear >= 1
                  ? `${production.productionYear + " | " + production.category.name}`
                  : production.category.name}
              </label>
              <label className="typography-body1 hidden cursor-[inherit] font-semibold text-content-primary-light dark:text-content-primary-dark sm:block">
                {production.title}
              </label>
            </div>
            <div className="typography-caption1 flex h-auto w-full flex-col items-start gap-0.5 font-normal text-content-secondary-light dark:text-content-secondary-dark">
              <label className="hidden cursor-[inherit] sm:block">
                {role && (role.id === 4 ? customRole : role.name)}
                {character && `'${character}'`}
              </label>
              <label className="hidden cursor-[inherit] sm:block">
                {production.description}
              </label>
            </div>
          </div>
        </div>
        <div className="flex min-h-[114px] min-w-[76px] cursor-[inherit] items-center justify-center rounded-lg bg-gray-100">
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
                loading="lazy"
                unoptimized={true}
                className={`object-cover ${notAllowed && "grayscale"}`}
              />
            </div>
          )}
        </div>
        {showTooltip && notAllowed && (
          <div
            className="pointer-events-none fixed z-50 transition-opacity duration-200"
            style={{
              left: mousePos.x - 100,
              top: mousePos.y - 50
            }}
          >
            <Tooltip
              placement="top"
              text="대표작은 최대 6개만 설정할 수 있어요."
              font="font-medium"
            />
          </div>
        )}
      </button>
    </div>
  );
};

export default FilmoRepModalItem;

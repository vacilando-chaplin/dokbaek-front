"use client";

import { FilmoResponseType } from "@/lib/types";
import Image from "next/image";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import PlayCircle from "../../../../../../../public/icons/PlayCircle.svg";
import LogoHorizontalSmall from "../../../../../../../public/icons/LogoHorizontalSmall.svg";
import Checkbox from "@/components/atoms/checkbox";
import { ProfileFilmoDataType } from "../../types";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  filmoDeleteModalState,
  filmoInputState,
  filmoModalState,
  filmoRepActiveState,
  filmoRepEditListState,
  filmoYoutubeLinkModalState
} from "@/lib/recoil/profile/filmo/atom";

interface FilmoItemProps {
  filmo: ProfileFilmoDataType;
  filmoList: ProfileFilmoDataType[];
}

const FilmoItem = ({ filmo, filmoList }: FilmoItemProps) => {
  const { id, role, customRole, character, production } = filmo;

  const [filmoRepEditList, setFilmoRepEditList] = useRecoilState(
    filmoRepEditListState
  );
  const filmoRepActive = useRecoilValue(filmoRepActiveState);
  const setFilmoInputs = useSetRecoilState(filmoInputState);
  const setFilmoModal = useSetRecoilState(filmoModalState);
  const setYoutubeLinkModal = useSetRecoilState(filmoYoutubeLinkModalState);
  const setFilmoDeleteModal = useSetRecoilState(filmoDeleteModalState);

  const checked = filmoRepEditList.find((rep) => rep.id === filmo.id)
    ? true
    : false;
  const checkRep = filmoRepEditList.length >= 6;

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

  // 필모그래피 편집 모달 오픈
  const onFilmoEditModalOpen = (filmo: FilmoResponseType) => {
    const filmoProduction =
      filmo.production.productionYear === 0
        ? ""
        : filmo.production.productionYear.toString();

    setFilmoInputs((prev) => ({
      ...prev,
      classification: filmo.production.category.name,
      production: filmoProduction,
      title: filmo.production.title,
      cast: filmo.role ? filmo.role.name : "",
      castInput: filmo.customRole,
      casting: filmo.character,
      description: filmo.production.description,
      link: filmo.production.videoUrl,
      thumbnail: filmo.thumbnailPath,
      representative: filmo.featured,
      id: filmo.id
    }));
    setFilmoModal({
      state: "edit",
      active: true,
      name: "작품 활동 수정",
      buttonText: "저장"
    });
  };

  // 필모그래피 링크 모달 오픈
  const onLinkModalOpen = (link: string) => {
    setYoutubeLinkModal({ url: link, active: true });
  };

  // 필모그래피 삭제 모달 오픈
  const onFilmoDeleteModalOpen = (id: number) => {
    setFilmoDeleteModal({ id: id, active: true });
  };

  return (
    <div className="flex h-[154px] w-full gap-4 rounded-2xl border border-border-default-light p-5 dark:border-border-default-dark">
      {filmoRepActive && (
        <Checkbox
          type="checkboxInput"
          size="medium"
          checked={checked}
          disabled={checkRep && !checked}
          onChange={() => onFilmoRepCheck(id)}
        />
      )}
      {!filmoRepActive && (
        <div className="flex flex-col gap-1">
          {/* edit */}
          <button
            className="h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
            type="button"
            onClick={() => onFilmoEditModalOpen(filmo)}
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
            onClick={() => onFilmoDeleteModalOpen(id)}
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
              {role && (role.id === 4 ? customRole : role.name)}
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
          onClick={() => onLinkModalOpen(production.videoUrl)}
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

export default FilmoItem;

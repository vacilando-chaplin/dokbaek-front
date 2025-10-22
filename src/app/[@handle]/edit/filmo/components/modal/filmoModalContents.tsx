"use client";

import HelperText from "@/components/atoms/helperText";
import Label from "@/components/atoms/label";
import TextInput from "@/components/atoms/textInput";
import SearchDropdown from "@/components/molecules/searchDropdown";
import SelectDropdown from "@/components/molecules/selectDropdown";
import ThumbnailFrame from "../frame/thumbnailFrame";
import { yearList } from "@/lib/data";
import Image from "next/image";
import Plus from "../../../../../../../public/icons/Plus.svg";
import { useState } from "react";
import { filmoActiveInit } from "../../data";
import { setOnlyNumber } from "@/lib/utils";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  filmoCategoryListState,
  filmoInputState,
  filmoRoleListState
} from "@/lib/recoil/handle/edit/filmo/atom";
import X from "../../../../../../../public/icons/X.svg";

const FilmoModalContents = () => {
  const filmoCategoryList = useRecoilValue(filmoCategoryListState);
  const filmoRoleList = useRecoilValue(filmoRoleListState);

  const [filmoInputs, setFilmoInputs] = useRecoilState(filmoInputState);
  const [filmoActives, setFilmoActives] = useState(filmoActiveInit);

  const {
    classification,
    production,
    title,
    cast,
    castInput,
    casting,
    description,
    link,
    thumbnail
  } = filmoInputs || {};

  const categoryList = filmoCategoryList.map((category) => category.name);
  const roleList = filmoRoleList.map((role) => role.name);
  const noThumbnail =
    !thumbnail ||
    thumbnail === "" ||
    thumbnail === null ||
    thumbnail.endsWith("null");

  // 필모그래피 모달 입력
  const onFilmoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilmoInputs({
      ...filmoInputs,
      [name]: value
    });
  };

  // 필모그래피 모달 제작연도 입력
  const onFilmoProductionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const changeNumber = setOnlyNumber(value);
    setFilmoInputs({ ...filmoInputs, [name]: changeNumber });
    if (value && !filmoActives.production) {
      setFilmoActives({ ...filmoActives, [name]: true });
    } else if (value.length === 4) {
      setFilmoActives({ ...filmoActives, [name]: false });
    }
  };

  // 필모그래피 드랍다운 액티브
  const onFilmoDropdownActive = (name: string, state: boolean) => {
    setFilmoActives({ ...filmoActives, [name]: !state });
  };

  // 필모그래피 드랍다운 클릭
  const onFilmoDropdownClick = (name: string, item: string) => {
    setFilmoInputs({ ...filmoInputs, [name]: item });
  };

  // 썸네일 이미지 업로드
  const onSelectThumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageElement = new window.Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;

        setFilmoInputs({ ...filmoInputs, thumbnail: imageUrl });
      };

      reader.readAsDataURL(e.target.files[0]);
      e.currentTarget.value = "";
    }
  };

  // 썸네일 삭제
  const onDeleteThumbnail = () => {
    setFilmoInputs({ ...filmoInputs, thumbnail: "" });
  };

  return (
    <div className="scrollbar dark:dark-scrollbar flex h-full max-h-[80vh] w-full gap-4 overflow-auto overscroll-contain bg-background-surface-light p-6 dark:bg-background-surface-dark">
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="분류" required />
            <SelectDropdown
              name="classification"
              list={categoryList}
              size="medium"
              value={filmoInputs.classification}
              active={filmoActives.classification}
              selected={classification}
              onClick={onFilmoDropdownClick}
              onActive={onFilmoDropdownActive}
            />
          </div>
          <div className="flex w-full flex-col">
            <Label label="제작연도" />
            <SearchDropdown
              size="medium"
              name="production"
              list={yearList}
              value={production}
              active={filmoActives.production}
              selected={production}
              maxLength={4}
              onClick={onFilmoDropdownClick}
              onActive={onFilmoDropdownActive}
              onChange={onFilmoProductionChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="작품명" required />
            <TextInput
              type="text"
              size="medium"
              name="title"
              value={title}
              maxLength={30}
              onChange={onFilmoInputChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex h-auto w-full flex-col">
            <Label label="출연 형태" />
            <div className="flex flex-row gap-1">
              <SelectDropdown
                name="cast"
                list={roleList}
                size="medium"
                value={filmoInputs.cast}
                active={filmoActives.cast}
                selected={cast}
                maxLength={10}
                onClick={onFilmoDropdownClick}
                onActive={() =>
                  onFilmoDropdownActive("cast", filmoActives.cast)
                }
              />
              {cast === "직접 입력" && (
                <TextInput
                  type="text"
                  size="medium"
                  name="castInput"
                  value={castInput}
                  maxLength={10}
                  onChange={onFilmoInputChange}
                />
              )}
            </div>
          </div>
          <div className="flex w-full flex-col">
            <Label label="배역" />
            <TextInput
              type="text"
              size="medium"
              name="casting"
              value={casting}
              maxLength={20}
              onChange={onFilmoInputChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="부가 설명 (수상 등)" />
          <div className="flex flex-col gap-1">
            <TextInput
              type="text"
              size="medium"
              name="description"
              value={description}
              limit
              maxLength={20}
              onChange={onFilmoInputChange}
            />
            <HelperText type="info" text="20자 이내로 작성해주세요." />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="flex w-full flex-col">
            <Label label="영상 링크" />
            <TextInput
              type="link"
              size="medium"
              name="link"
              value={link}
              icon="youtube"
              maxLength={300}
              onChange={onFilmoInputChange}
            />
          </div>
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="썸네일 이미지" />
          <ThumbnailFrame image={noThumbnail} onChange={onSelectThumbnail}>
            {noThumbnail ? (
              <>
                <Plus width="16" height="16" fill="#868E96" />
                추가
              </>
            ) : (
              <div className="relative aspect-[100/150] w-full overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={thumbnail}
                  alt="thumbnail"
                  fill
                  loading="lazy"
                  unoptimized={true}
                  className="object-cover"
                />
                <button
                  className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onDeleteThumbnail();
                  }}
                >
                  <X
                    width="12"
                    height="12"
                    className="fill-current text-state-negative-light dark:text-state-negative-dark"
                  />
                </button>
              </div>
            )}
          </ThumbnailFrame>
        </div>
      </div>
    </div>
  );
};

export default FilmoModalContents;

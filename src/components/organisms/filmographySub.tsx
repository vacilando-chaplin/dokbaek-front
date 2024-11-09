import { castList, classificationList, yearList } from "@/data/data";
import { filmoActivesTypes, filmoInputsTypes } from "@/types/types";
import Image from "next/image";
import HelperText from "../atoms/helperText";
import Input from "../atoms/input";
import Label from "../atoms/label";
import Dropdown from "../molecules/dropdown";
import InputWithLabel from "../molecules/inputWithLabel";
import PhotoFrame from "../molecules/photoFrame";

interface FilmographySubProps {
  filmoInputs: filmoInputsTypes;
  filmoActives: filmoActivesTypes;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoActiveClick: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
  onSelectThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilmographySub = ({
  filmoInputs,
  filmoActives,
  onFilmoInputChange,
  onFilmoActiveClick,
  onFilmoDropdownClick,
  onSelectThumbnail
}: FilmographySubProps) => {
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
  } = filmoInputs;

  return (
    <div className="flex h-auto w-full gap-4 bg-background-surface-light p-6 overflow-auto">
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="relative flex w-full">
            <InputWithLabel
              label="분류"
              type="text"
              required={true}
              placeholder="선택해주세요."
              dropdown={true}
              maxLength={10}
              name="classification"
              value={classification}
              readOnly={true}
              active={filmoActives.classification}
              onActive={onFilmoActiveClick}
            />
            {filmoActives.classification && (
              <div className="absolute top-[72px] z-40 w-full">
                <Dropdown
                  name="classification"
                  content={classificationList}
                  active={filmoActives.classification}
                  selected={classification}
                  onClick={onFilmoDropdownClick}
                  onActive={onFilmoActiveClick}
                />
              </div>
            )}
          </div>
          <div className="relative flex w-full">
            <InputWithLabel
              label="제작연도"
              type="text"
              placeholder="선택해주세요."
              dropdown={true}
              maxLength={4}
              name="production"
              value={production}
              active={filmoActives.production}
              onChange={onFilmoInputChange}
              onActive={onFilmoActiveClick}
            />
            {filmoActives.production && (
              <div className="absolute top-[72px] z-40 w-full">
                <Dropdown
                  name="production"
                  content={yearList}
                  active={filmoActives.production}
                  selected={production}
                  onClick={onFilmoDropdownClick}
                  onActive={onFilmoActiveClick}
                />
              </div>
            )}
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            label="작품명"
            type="text"
            required={true}
            maxLength={30}
            name="title"
            value={title}
            onChange={onFilmoInputChange}
          />
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <div className="relative flex w-full h-auto flex-col">
            <Label label="출연 형태" />
            <div className="flex gap-1 flex-row">
              <div className="flex w-full">
                <Input
                  type="text"
                  placeholder="선택해주세요."
                  dropdown={true}
                  maxLength={10}
                  name="cast"
                  value={cast}
                  readOnly={true}
                  active={filmoActives.cast}
                  onActive={onFilmoActiveClick}
                />
              </div>
              {cast === "직접 입력" && (
                <Input
                  type="text"
                  maxLength={10}
                  name="castInput"
                  value={castInput}
                  onChange={onFilmoInputChange}
                />
              )}
            </div>
            {filmoActives.cast && (
              <div className="absolute top-[72px] z-40 w-full">
                <Dropdown
                  name="cast"
                  content={castList}
                  active={filmoActives.cast}
                  selected={cast}
                  onClick={onFilmoDropdownClick}
                  onActive={onFilmoActiveClick}
                />
              </div>
            )}
          </div>
          <InputWithLabel
            label="배역"
            type="text"
            maxLength={10}
            name="casting"
            value={casting}
            onChange={onFilmoInputChange}
          />
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="부가 설명 (수상 등)" />
          <div className="flex flex-col gap-1">
            <Input
              type="text"
              maxLength={20}
              name="description"
              value={description}
              limit={true}
              onChange={onFilmoInputChange}
            />
            <HelperText text="20자 이내로 작성해주세요." />
          </div>
        </div>
        <div className="flex h-auto w-full flex-row gap-4">
          <InputWithLabel
            label="영상 링크"
            type="link"
            maxLength={300}
            name="link"
            value={link}
            icon="youtube"
            onChange={onFilmoInputChange}
          />
        </div>
        <div className="flex h-auto w-full flex-col">
          <Label label="썸네일 이미지" />
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt="thumbnail"
              width={100}
              height={150}
              priority
              className="h-[150px] w-[100px] rounded-lg bg-gray-100"
            />
          ) : (
            <PhotoFrame
              style="w-[100px] h-[150px]"
              onChange={onSelectThumbnail}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default FilmographySub;

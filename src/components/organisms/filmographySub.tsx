import { castList, classificationList, yearList } from "@/data/data";
import { FilmoActiveType, FilmoInputType } from "@/types/types";
import Image from "next/image";
import HelperText from "../atoms/helperText";
import Label from "../atoms/label";
import PhotoFrame from "../molecules/photoFrame";
import SelectDropdown from "../molecules/selectDropdown";
import SearchDropdown from "../molecules/searchDropdown";
import TextInput from "../atoms/textInput";

interface FilmographySubProps {
  filmoInputs: FilmoInputType;
  filmoActives: FilmoActiveType;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoProductionChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoDropdownActive: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
  onSelectThumbnail: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FilmographySub = ({
  filmoInputs,
  filmoActives,
  onFilmoInputChange,
  onFilmoProductionChange,
  onFilmoDropdownActive,
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
    <div className="no-scrollbar flex h-auto w-full gap-4 overflow-auto bg-background-surface-light p-6">
      <div className="flex h-auto w-full flex-col gap-4">
        <div className="flex w-full flex-col">
          <Label label="분류" required />
          <div className="flex flex-row gap-4">
            <SelectDropdown
              name="classification"
              list={classificationList}
              size="medium"
              value={filmoInputs.classification}
              active={filmoActives.classification}
              selected={classification}
              onClick={onFilmoDropdownClick}
              onActive={onFilmoDropdownActive}
            />
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
                list={castList}
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
        <div className="flex h-auto w-full flex-col pb-6">
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

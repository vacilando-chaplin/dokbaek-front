import { filmoActivesTypes, filmoInputsTypes } from "@/types/types";
import InputWithLabel from "../molecules/inputWithLabel";
import Dropdown from "../molecules/dropdown";
import { castList, classificationList, yearList } from "@/data/data";
import Label from "../atoms/label";

interface FilmographySubProps {
  filmoInputs: filmoInputsTypes;
  filmoActives: filmoActivesTypes;
  onFilmoInputChange: React.ChangeEventHandler<HTMLInputElement>;
  onFilmoActiveClick: (name: string, state: boolean) => void;
  onFilmoDropdownClick: (name: string, item: string) => void;
}

const FilmographySub = ({
  filmoInputs,
  filmoActives,
  onFilmoInputChange,
  onFilmoActiveClick,
  onFilmoDropdownClick
}: FilmographySubProps) => {
  const {
    classification,
    production,
    title,
    cast,
    casting,
    description,
    link,
    thumbnail
  } = filmoInputs;

  return (
    <div className="flex h-auto w-full gap-4 bg-background-surface-light p-6">
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
              active={filmoActives.classification}
              onActive={onFilmoActiveClick}
            />
            {filmoActives.classification && (
              <div className="absolute top-[72px] w-full">
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
              <div className="absolute top-[72px] w-full">
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
          <div className="relative flex w-full">
            <InputWithLabel
              label="출연 형태"
              type="text"
              placeholder="선택해주세요."
              dropdown={true}
              maxLength={10}
              name="cast"
              value={cast}
              active={filmoActives.cast}
              onChange={onFilmoInputChange}
              onActive={onFilmoActiveClick}
            />
            {filmoActives.cast && (
              <div className="absolute top-[72px] w-full">
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
        <div className="flex h-auto w-full flex-row gap-4">
          <Label label="부가 설명 (수상 등)" />
        </div>
      </div>
    </div>
  );
};

export default FilmographySub;

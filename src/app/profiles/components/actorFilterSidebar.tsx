import BoxButton from "@/components/atoms/boxButton";
import React, { useEffect, useState } from "react";

import TextInput from "@/components/atoms/textInput";
import ArrowChevronDownGray from "../../../../public/icons/ArrowChevronDownGray.svg";

import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/landing/types";
import RangeSlider from "@/components/molecules/rangeSlider";
import SearchInput from "./searchInput";

interface ActorFilterSidebarProps {
  profiles: ProfileShowcaseResponseType[];
  profilesData: ProfilesResponseType | undefined;
  currKeyword?: string;
  currMinBornYear: number;
  currMaxBornYear: number;
  currMinHeight: number;
  currMaxHeight: number;
  currMinWeight: number;
  currMaxWeight: number;
  handleSubmit: (data: {
    keyword: string;
    minBornYear: number;
    maxBornYear: number;
    minHeight: number;
    maxHeight: number;
    minWeight: number;
    maxWeight: number;
  }) => void;
}

const ActorFilterSidebar = (props: ActorFilterSidebarProps) => {
  const {
    profiles: [],
    profilesData,
    currKeyword,
    currMinBornYear,
    currMaxBornYear,
    currMinHeight,
    currMaxHeight,
    currMinWeight,
    currMaxWeight,
    handleSubmit
  } = props;

  const [keyword, setKeyword] = useState("");
  const [minBornYear, setMinBornYear] = useState(0);
  const [maxBornYear, setMaxBornYear] = useState(0);
  const [bornYearRange, setBornYearRange] = useState<[number, number]>([
    minBornYear,
    maxBornYear
  ]);
  const [minHeight, setMinHeight] = useState(0);
  const [maxHeight, setMaxHeight] = useState(0);
  const [heightRange, setHeightRange] = useState<[number, number]>([
    minHeight,
    maxHeight
  ]);
  const [minWeight, setMinWeight] = useState(0);
  const [maxWeight, setMaxWeight] = useState(0);
  const [WeightRange, setWeightRange] = useState<[number, number]>([
    minWeight,
    maxWeight
  ]);

  useEffect(() => {
    if (currKeyword) setKeyword(currKeyword);
    if (currMinBornYear) setMinBornYear(currMinBornYear);
    if (currMaxBornYear) setMaxBornYear(currMaxBornYear);
    if (currMinHeight) setMinHeight(currMinHeight);
    if (currMaxHeight) setMaxHeight(currMaxHeight);
    if (currMinWeight) setMinWeight(currMinWeight);
    if (currMaxWeight) setMaxWeight(currMaxWeight);
  }, [
    currKeyword,
    currMinBornYear,
    currMaxBornYear,
    currMinHeight,
    currMaxHeight,
    currMinWeight,
    currMaxWeight
  ]);

  const onSubmit = () => {
    handleSubmit({
      keyword,
      minBornYear,
      maxBornYear,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight
    });
  };

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword.trim());
  };

  const handleMinBornYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinBornYear(Number(event.target.value));
  };
  const handleMaxBornYearChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxBornYear(Number(event.target.value));
  };

  const handleMinHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinHeight(Number(event.target.value));
  };
  const handleMaxHeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxHeight(Number(event.target.value));
  };

  const handleMinWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMinWeight(Number(event.target.value));
  };
  const handleMaxWeightChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setMaxWeight(Number(event.target.value));
  };

  const onClickFilterReset = () => {
    setKeyword("");
    setMinBornYear(0);
    setMaxBornYear(0);
    setMinHeight(0);
    setMaxHeight(0);
    setMinWeight(0);
    setMaxWeight(0);
    onSubmit();
  };

  const handleBornYearRangeChange = (newRange: [number, number]) => {
    setBornYearRange(newRange);
    setMinBornYear(newRange[0]);
    setMaxBornYear(newRange[1]);
  };

  const handleHeightRangeChange = (newRange: [number, number]) => {
    setHeightRange(newRange);
    setMinHeight(newRange[0]);
    setMaxHeight(newRange[1]);
  };

  const handleWeightRangeChange = (newRange: [number, number]) => {
    setWeightRange(newRange);
    setMinWeight(newRange[0]);
    setMaxWeight(newRange[1]);
  };

  const getTypeRange = (type: string) => {
    switch (type) {
      case "bornYear":
        if (minBornYear === 0 && maxBornYear === 0) {
          return "전체";
        } else {
          return `${minBornYear} - ${maxBornYear} 년생`;
        }
      case "height":
        if (minHeight === 0 && maxHeight === 0) {
          return "전체";
        } else {
          return `${minHeight} - ${maxHeight} cm`;
        }
      case "weight":
        if (minWeight === 0 && maxWeight === 0) {
          return "전체";
        } else {
          return `${minWeight} - ${maxWeight} kg`;
        }
    }
  };

  useEffect(() => {
    setBornYearRange([minBornYear, maxBornYear]);
  }, [minBornYear, maxBornYear]);

  useEffect(() => {
    setHeightRange([minHeight, maxHeight]);
  }, [minHeight, maxHeight]);

  useEffect(() => {
    setWeightRange([minWeight, maxWeight]);
  }, [minWeight, maxWeight]);

  return (
    <aside className="h-fit w-[320px] rounded-2xl border bg-background-surface-light">
      <div className="border-b py-4">
        <div className="flex items-center justify-between px-5">
          <div>{profilesData?.numberOfElements}명</div>
          <BoxButton
            type="secondaryOutlined"
            size="small"
            onClick={onClickFilterReset}
          >
            필터 초기화
          </BoxButton>
        </div>
      </div>
      <div className="border-b-[1px] border-border-default-light py-4">
        <div className="px-5">
          <div className="typography-body3 mb-2">키워드</div>
          <div className="flex items-center gap-2">
            <SearchInput
              text={keyword}
              onChange={handleKeywordChange}
              onSubmit={onSubmit}
            />
            <BoxButton
              type="secondaryOutlined"
              size="medium"
              onClick={onSubmit}
            >
              검색
            </BoxButton>
          </div>
        </div>
      </div>
      <div className="border-b-[1px] border-border-default-light px-5 py-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="typography-body3">
            나이(년생)
            <span className="ml-2 text-accent-primary-light">
              {getTypeRange("bornYear")}
            </span>
          </div>
          <ArrowChevronDownGray width="20" height="20" />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <TextInput
            type="number"
            size="medium"
            name="minBornYear"
            value={minBornYear}
            placeholder="0"
            maxLength={200}
            onChange={handleMinBornYearChange}
          />
          ~
          <TextInput
            type="number"
            size="medium"
            name="maxBornYear"
            value={maxBornYear}
            placeholder="0"
            maxLength={200}
            onChange={handleMaxBornYearChange}
          />
        </div>
        <div>
          <RangeSlider
            value={bornYearRange}
            setValue={handleBornYearRangeChange}
            min={1900}
            max={2025}
          />
        </div>
      </div>
      <div className="border-b-[1px] border-border-default-light px-5 py-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="typography-body3">
            키
            <span className="ml-2 text-accent-primary-light">
              {getTypeRange("height")}
            </span>
          </div>
          <ArrowChevronDownGray width="20" height="20" />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <TextInput
            type="number"
            size="medium"
            name="minHeight"
            value={minHeight}
            parameter={"cm"}
            placeholder="0"
            maxLength={200}
            onChange={handleMinHeightChange}
          />
          ~
          <TextInput
            type="number"
            size="medium"
            name="maxHeight"
            value={maxHeight}
            parameter={"cm"}
            placeholder="0"
            maxLength={200}
            onChange={handleMaxHeightChange}
          />
        </div>
        <div>
          <RangeSlider
            value={heightRange}
            setValue={handleHeightRangeChange}
            min={0}
            max={200}
          />
        </div>
      </div>
      <div className="px-5 py-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="typography-body3">
            몸무게
            <span className="ml-2 text-accent-primary-light">
              {getTypeRange("weight")}
            </span>
          </div>
          <ArrowChevronDownGray width="20" height="20" />
        </div>
        <div className="mb-4 flex items-center gap-2">
          <TextInput
            type="number"
            size="medium"
            name="minWeight"
            value={minWeight}
            parameter={"kg"}
            placeholder="0"
            maxLength={200}
            onChange={handleMinWeightChange}
          />
          ~
          <TextInput
            type="number"
            size="medium"
            name="maxWeight"
            value={maxWeight}
            parameter={"kg"}
            placeholder="0"
            maxLength={200}
            onChange={handleMaxWeightChange}
          />
        </div>
        <div>
          <RangeSlider
            value={WeightRange}
            setValue={handleWeightRangeChange}
            min={0}
            max={200}
          />
        </div>
      </div>
    </aside>
  );
};

export default ActorFilterSidebar;

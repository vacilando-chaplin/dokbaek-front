import BoxButton from "@/components/atoms/boxButton";
import React, { useEffect, useState } from "react";
import {
  DEFAULT_MIN_HEIGHT,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_MIN_WEIGHT,
  DEFAULT_MAX_WEIGHT,
  DEFAULT_MIN_AGE,
  DEFAULT_MAX_AGE,
  DEFAULT_MIN_BORN_YEAR,
  DEFAULT_MAX_BORN_YEAR
} from "@/constants/constants";
import Reset from "../../../../public/icons/Reset.svg";

import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/home/types";
import SearchInput from "./searchInput";
import FilterGender from "./filter/filterGender";
import FilterRangeInput from "./filter/filterRangeInput";
import { useRange } from "@/lib/hooks";
import FilterSpecialty from "./filter/filterSpecialty";
import { SpecialtyType } from "@/components/molecules/addableSearchDropdown";
import { SortType } from "@/constants/sort";

interface ActorFilterSidebarProps {
  profiles: ProfileShowcaseResponseType[];
  profilesData: ProfilesResponseType | undefined;
  currSort: SortType;
  currKeyword?: string;
  currGender?: string | null;
  currMinBornYear: number;
  currMaxBornYear: number;
  currMinHeight: number;
  currMaxHeight: number;
  currMinWeight: number;
  currMaxWeight: number;
  handleSubmit: (data: {
    sort: SortType;
    keyword: string;
    gender: string | null;
    minBornYear: number;
    maxBornYear: number;
    minHeight: number;
    maxHeight: number;
    minWeight: number;
    maxWeight: number;
    specialties: number[];
  }) => void;
}

const ActorFilterSidebar = (props: ActorFilterSidebarProps) => {
  const {
    profiles: [],
    profilesData,
    currSort,
    currKeyword,
    currGender,
    currMinBornYear,
    currMaxBornYear,
    currMinHeight,
    currMaxHeight,
    currMinWeight,
    currMaxWeight,
    handleSubmit
  } = props;
  const [keyword, setKeyword] = useState("");
  const [gender, setGender] = useState<string | null>(null);

  const age = useRange(DEFAULT_MIN_AGE, DEFAULT_MAX_AGE);
  const height = useRange(DEFAULT_MIN_HEIGHT, DEFAULT_MAX_HEIGHT);
  const weight = useRange(DEFAULT_MIN_WEIGHT, DEFAULT_MAX_WEIGHT);

  const [specialties, setSpecialties] = useState<SpecialtyType[]>([]);

  useEffect(() => {
    const bornYearMax = new Date().getFullYear();
    const yearToAge = (year: number) => bornYearMax - year;

    setKeyword(currKeyword || "");
    if (currGender) setGender(currGender);
    if (currMinBornYear && currMaxBornYear) {
      age.onRangeChange([
        yearToAge(currMaxBornYear),
        yearToAge(currMinBornYear)
      ]);
    }
    if (currMinHeight && currMaxHeight) {
      height.onRangeChange([currMinHeight, currMaxHeight]);
    }
    if (currMinWeight && currMaxWeight) {
      weight.onRangeChange([currMinWeight, currMaxWeight]);
    }
  }, [
    currKeyword,
    currGender,
    currMinBornYear,
    currMaxBornYear,
    currMinHeight,
    currMaxHeight,
    currMinWeight,
    currMaxWeight
  ]);

  const onSubmit = () => {
    const bornYearMax = new Date().getFullYear();
    const ageToYear = (age: number) => bornYearMax - age;

    handleSubmit({
      sort: currSort,
      keyword,
      gender,
      minBornYear: ageToYear(age.max),
      maxBornYear: ageToYear(age.min),
      minHeight: height.min,
      maxHeight: height.max,
      minWeight: weight.min,
      maxWeight: weight.max,
      specialties: specialties.map((item) => item.id)
    });
  };

  const handleKeywordChange = (keyword: string) => {
    setKeyword(keyword.trim());
  };

  const handleGenderChange = (gender: string | null) => {
    setGender(gender);
  };

  const onSelectSpecialty = (specialty: SpecialtyType) => {
    setSpecialties((prev) => {
      // 이미 선택된 경우 추가 X
      if (prev.some((s) => s.id === specialty.id)) return prev;
      // 최대 5개 제한
      if (prev.length >= 5) return prev;
      return [...prev, specialty];
    });
  };

  const onRemoveSpecialty = (id: number) => {
    setSpecialties((prev) => prev.filter((s) => s.id !== id));
  };

  const onResetSpecialty = () => {
    setSpecialties([]);
  };

  const onClickFilterReset = () => {
    setKeyword("");
    setGender(null);
    age.onRangeChange([DEFAULT_MIN_AGE, DEFAULT_MAX_AGE]);
    height.onRangeChange([DEFAULT_MIN_HEIGHT, DEFAULT_MAX_HEIGHT]);
    weight.onRangeChange([DEFAULT_MIN_WEIGHT, DEFAULT_MAX_WEIGHT]);
    setSpecialties([]);

    handleSubmit({
      sort: currSort,
      keyword: "",
      gender: null,
      minBornYear: DEFAULT_MIN_BORN_YEAR,
      maxBornYear: DEFAULT_MAX_BORN_YEAR,
      minHeight: DEFAULT_MIN_HEIGHT,
      maxHeight: DEFAULT_MAX_HEIGHT,
      minWeight: DEFAULT_MIN_WEIGHT,
      maxWeight: DEFAULT_MAX_WEIGHT,
      specialties: []
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onSubmit();
    }, 700);
    return () => clearTimeout(timer);
  }, [
    gender,
    age.min,
    age.max,
    height.min,
    height.max,
    weight.min,
    weight.max,
    specialties
  ]);

  return (
    <aside className="flex h-fit w-80 flex-col gap-4 rounded-2xl border border-border-default-light bg-background-surface-light py-5 dark:border-border-default-dark dark:bg-background-surface-dark">
      <div className="border-b border-border-default-light pb-4 dark:border-border-default-dark">
        <div className="flex items-center justify-between px-5">
          <div className="typography-body2 font-semibold text-content-primary-light dark:text-content-primary-dark">
            {profilesData?.totalElements?.toLocaleString()}명
          </div>
          <BoxButton
            type="secondaryOutlined"
            size="small"
            onClick={onClickFilterReset}
          >
            <Reset
              width="14"
              height="14"
              className="fill-current text-content-primary-light dark:text-content-primary-dark"
            />
            <span className="typography-body3 font-medium text-content-primary-light dark:text-content-primary-dark">
              필터 초기화
            </span>
          </BoxButton>
        </div>
      </div>
      <div className="flex w-full flex-col gap-2 border-b border-border-default-light px-5 pb-4 dark:border-border-default-dark">
        <div className="typography-body3 font-medium text-content-primary-light dark:text-content-primary-dark">
          키워드
        </div>
        <div className="flex h-10 w-full flex-row items-center gap-1">
          <SearchInput
            text={keyword}
            onChange={handleKeywordChange}
            onSubmit={onSubmit}
          />
          <BoxButton type="secondaryOutlined" size="medium" onClick={onSubmit}>
            검색
          </BoxButton>
        </div>
      </div>
      <FilterGender
        gender={gender}
        onReset={() => setGender(null)}
        onChange={handleGenderChange}
      />
      <FilterRangeInput
        min={DEFAULT_MIN_AGE}
        max={DEFAULT_MAX_AGE}
        step={1}
        name="age"
        unit="세"
        title="나이"
        value={age.value}
        minValue={age.min}
        maxValue={age.max}
        onReset={age.onReset}
        onMinChange={age.onMinChange}
        onMaxChange={age.onMaxChange}
        onRangeChange={age.onRangeChange}
      />
      <FilterRangeInput
        min={DEFAULT_MIN_HEIGHT}
        max={DEFAULT_MAX_HEIGHT}
        step={1}
        name="height"
        unit="cm"
        title="키"
        value={height.value}
        minValue={height.min}
        maxValue={height.max}
        onReset={height.onReset}
        onMinChange={height.onMinChange}
        onMaxChange={height.onMaxChange}
        onRangeChange={height.onRangeChange}
      />
      <FilterRangeInput
        min={DEFAULT_MIN_WEIGHT}
        max={DEFAULT_MAX_WEIGHT}
        step={1}
        name="weight"
        unit="kg"
        title="몸무게"
        value={weight.value}
        minValue={weight.min}
        maxValue={weight.max}
        onReset={weight.onReset}
        onMinChange={weight.onMinChange}
        onMaxChange={weight.onMaxChange}
        onRangeChange={weight.onRangeChange}
      />
      <FilterSpecialty
        specialties={specialties}
        onReset={onResetSpecialty}
        onSelect={onSelectSpecialty}
        onRemove={onRemoveSpecialty}
      />
    </aside>
  );
};

export default ActorFilterSidebar;

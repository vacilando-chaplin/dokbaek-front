import BoxButton from "@/components/atoms/boxButton";
import React, { useEffect, useState } from "react";
import {
  DEFAULT_MIN_HEIGHT,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_MIN_WEIGHT,
  DEFAULT_MAX_WEIGHT,
  DEFAULT_MIN_AGE,
  DEFAULT_MAX_AGE
} from "@/constants/constants";
import Reset from "../../../../public/icons/Reset.svg";

import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/home/types";
import SearchInput from "./searchInput";
import FilterGender from "./filter/filterGender";
import FilterRangeInput from "./filter/filterRangeInput";

interface ActorFilterSidebarProps {
  profiles: ProfileShowcaseResponseType[];
  profilesData: ProfilesResponseType | undefined;
  currKeyword?: string;
  currGender?: string | null;
  currMinBornYear: number;
  currMaxBornYear: number;
  currMinHeight: number;
  currMaxHeight: number;
  currMinWeight: number;
  currMaxWeight: number;
  handleSubmit: (data: {
    keyword: string;
    gender: string | null;
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
    currGender,
    currMinBornYear,
    currMaxBornYear,
    currMinHeight,
    currMaxHeight,
    currMinWeight,
    currMaxWeight,
    handleSubmit
  } = props;
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const [keyword, setKeyword] = useState("");

  type RadioOption = {
    label: string;
    value: string | null;
  };

  const genderOptions: RadioOption[] = [
    { label: "전체", value: null },
    { label: "여성", value: "F" },
    { label: "남성", value: "M" }
  ];

  const [minAge, setMinAge] = useState(DEFAULT_MIN_AGE);
  const [maxAge, setMaxAge] = useState(DEFAULT_MAX_AGE);
  const [ageRange, setAgeRange] = useState<[number, number]>([minAge, maxAge]);
  const [minHeight, setMinHeight] = useState(DEFAULT_MIN_HEIGHT);
  const [maxHeight, setMaxHeight] = useState(DEFAULT_MAX_HEIGHT);
  const [heightRange, setHeightRange] = useState<[number, number]>([
    minHeight,
    maxHeight
  ]);
  const [minWeight, setMinWeight] = useState(DEFAULT_MIN_WEIGHT);
  const [maxWeight, setMaxWeight] = useState(DEFAULT_MAX_WEIGHT);
  const [WeightRange, setWeightRange] = useState<[number, number]>([
    minWeight,
    maxWeight
  ]);

  const [gender, setGender] = useState<string | null>(null);

  useEffect(() => {
    const yearToAge = (year: number) => maxBornYear - year;

    setKeyword(currKeyword || "");
    if (currGender) setGender(currGender);
    if (currMinBornYear) setMinAge(yearToAge(currMaxBornYear));
    if (currMaxBornYear) setMaxAge(yearToAge(currMinBornYear));
    if (currMinHeight) setMinHeight(currMinHeight);
    if (currMaxHeight) setMaxHeight(currMaxHeight);
    if (currMinWeight) setMinWeight(currMinWeight);
    if (currMaxWeight) setMaxWeight(currMaxWeight);
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

  const bornYearMax = new Date().getFullYear();

  const ageToYear = (age: number) => bornYearMax - age;

  const minBornYear = ageToYear(DEFAULT_MAX_AGE);
  const maxBornYear = ageToYear(DEFAULT_MIN_AGE);

  const onSubmit = () => {
    handleSubmit({
      keyword,
      gender,
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

  const handleGenderChange = (gender: string | null) => {
    setGender(gender);
  };

  const handleMinAgeChange = (value: number) => {
    const newMin = Math.max(DEFAULT_MIN_AGE, Math.min(value, DEFAULT_MAX_AGE));
    setMinAge(newMin);
    if (maxAge <= newMin) {
      setMaxAge(Math.min(newMin + 1, DEFAULT_MAX_AGE));
    }
  };
  const handleMaxAgeChange = (value: number) => {
    const newMax = Math.min(Math.max(value, DEFAULT_MIN_AGE), DEFAULT_MAX_AGE);
    if (newMax <= minAge) {
      setMaxAge(Math.min(minAge + 1, DEFAULT_MAX_AGE));
    } else {
      setMaxAge(newMax);
    }
  };

  const handleMinHeightChange = (value: number) => {
    setMinHeight(value);
  };
  const handleMaxHeightChange = (value: number) => {
    setMaxHeight(value);
  };

  const handleMinWeightChange = (value: number) => {
    setMinWeight(value);
  };
  const handleMaxWeightChange = (value: number) => {
    setMaxWeight(value);
  };

  const onClickFilterReset = () => {
    setKeyword("");
    setGender(null);
    setMinAge(DEFAULT_MIN_AGE);
    setMaxAge(DEFAULT_MAX_AGE);
    setMinHeight(DEFAULT_MIN_HEIGHT);
    setMaxHeight(DEFAULT_MAX_HEIGHT);
    setMinWeight(DEFAULT_MIN_WEIGHT);
    setMaxWeight(DEFAULT_MAX_WEIGHT);

    handleSubmit({
      keyword: "",
      gender: null,
      minBornYear: DEFAULT_MIN_AGE,
      maxBornYear: DEFAULT_MAX_AGE,
      minHeight: DEFAULT_MIN_HEIGHT,
      maxHeight: DEFAULT_MAX_HEIGHT,
      minWeight: DEFAULT_MIN_WEIGHT,
      maxWeight: DEFAULT_MAX_WEIGHT
    });
  };

  const handleageRangeChange = (newRange: [number, number]) => {
    setAgeRange(newRange);
    setMinAge(newRange[0]);
    setMaxAge(newRange[1]);
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "gender":
        return (
          genderOptions.find((option) => option.value === gender)?.label ||
          "전체"
        );
      case "bornYear":
        if (minBornYear == DEFAULT_MIN_AGE && maxBornYear == DEFAULT_MAX_AGE) {
          return "전체";
        } else {
          return `${minBornYear} - ${maxBornYear} 년생`;
        }
      case "height":
        if (
          minHeight == DEFAULT_MIN_HEIGHT &&
          maxHeight == DEFAULT_MAX_HEIGHT
        ) {
          return "전체";
        } else {
          return `${minHeight} - ${maxHeight} cm`;
        }
      case "weight":
        if (
          minWeight == DEFAULT_MIN_WEIGHT &&
          maxWeight == DEFAULT_MAX_WEIGHT
        ) {
          return "전체";
        } else {
          return `${minWeight} - ${maxWeight} kg`;
        }
    }
  };

  useEffect(() => {
    onSubmit();
  }, [gender]);

  useEffect(() => {
    setAgeRange([minBornYear, maxBornYear]);
    const timer = setTimeout(() => {
      onSubmit();
    }, 1000);
    return () => clearTimeout(timer);
  }, [minBornYear, maxBornYear]);

  useEffect(() => {
    setHeightRange([minHeight, maxHeight]);
    const timer = setTimeout(() => {
      onSubmit();
    }, 1000);
    return () => clearTimeout(timer);
  }, [minHeight, maxHeight]);

  useEffect(() => {
    setWeightRange([minWeight, maxWeight]);
    const timer = setTimeout(() => {
      onSubmit();
    }, 1000);
    return () => clearTimeout(timer);
  }, [minWeight, maxWeight]);

  useEffect(() => {
    if (shouldSubmit) {
      onSubmit();
      setShouldSubmit(false);
    }
  }, [
    minBornYear,
    maxBornYear,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    shouldSubmit
  ]);

  const onGenderReset = () => {
    setGender(null);
  };

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
        onReset={onGenderReset}
        onChange={handleGenderChange}
      />
      <FilterRangeInput
        min={0}
        max={100}
        step={1}
        name="age"
        unit="세"
        title="나이"
        range={[minAge, maxAge]}
        minValue={minAge}
        maxValue={maxAge}
        onReset={() => {
          setMinAge(DEFAULT_MIN_AGE);
          setMaxAge(DEFAULT_MAX_AGE);
        }}
        onMinChange={handleMinAgeChange}
        onMaxChange={handleMaxAgeChange}
        onRangeChange={handleageRangeChange}
      />
      <FilterRangeInput
        min={0}
        max={220}
        step={1}
        name="height"
        unit="cm"
        title="키"
        range={[minHeight, maxHeight]}
        minValue={minHeight}
        maxValue={maxHeight}
        onReset={() => {
          setMinHeight(DEFAULT_MIN_HEIGHT);
          setMaxHeight(DEFAULT_MAX_HEIGHT);
        }}
        onMinChange={handleMinHeightChange}
        onMaxChange={handleMaxHeightChange}
        onRangeChange={handleHeightRangeChange}
      />
      <FilterRangeInput
        min={0}
        max={120}
        step={1}
        name="weight"
        unit="kg"
        title="몸무게"
        range={[minWeight, maxWeight]}
        minValue={minWeight}
        maxValue={maxWeight}
        onReset={() => {
          setMinWeight(DEFAULT_MIN_WEIGHT);
          setMaxWeight(DEFAULT_MAX_WEIGHT);
        }}
        onMinChange={handleMinWeightChange}
        onMaxChange={handleMaxWeightChange}
        onRangeChange={handleWeightRangeChange}
      />
    </aside>
  );
};

export default ActorFilterSidebar;

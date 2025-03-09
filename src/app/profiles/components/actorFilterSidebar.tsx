import BoxButton from "@/components/atoms/boxButton";
import React, { useEffect, useState } from "react";

import TextInput from "@/components/atoms/textInput";
import ArrowChevronDownGray from "../../../../public/icons/ArrowChevronDownGray.svg";
import Reset from "../../../../public/icons/Reset.svg";

import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/landing/types";
import RangeSlider from "@/components/molecules/rangeSlider";
import SearchInput from "./searchInput";
import { useRouter } from "next/navigation";
import RadioGroup from "@/components/organisms/radioGroup";

interface ActorFilterSidebarProps {
  profiles: ProfileShowcaseResponseType[];
  profilesData: ProfilesResponseType | undefined;
  currKeyword?: string;
  currGender?: string;
  currMinBornYear: number;
  currMaxBornYear: number;
  currMinHeight: number;
  currMaxHeight: number;
  currMinWeight: number;
  currMaxWeight: number;
  handleSubmit: (data: {
    keyword: string;
    gender: string;
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
  const router = useRouter();
  const [shouldSubmit, setShouldSubmit] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [gender, setGender] = useState("U");

  const genderOptions = [
    { label: "전체", value: "U" },
    { label: "여성", value: "F" },
    { label: "남성", value: "M" }
  ];

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

  const [isGenderOpen, setIsGenderOpen] = useState(true);
  const [isBornYearOpen, setIsBornYearOpen] = useState(true);
  const [isHeightOpen, setIsHeightOpen] = useState(true);
  const [isWeightOpen, setIsWeightOpen] = useState(true);

  useEffect(() => {
    if (currKeyword) setKeyword(currKeyword);
    if (currGender) setGender(currGender);
    if (currMinBornYear) setMinBornYear(currMinBornYear);
    if (currMaxBornYear) setMaxBornYear(currMaxBornYear);
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

  const handleGenderChange = (gender: string) => {
    setGender(gender);
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
    setGender("U");
    setMinBornYear(0);
    setMaxBornYear(0);
    setMinHeight(0);
    setMaxHeight(0);
    setMinWeight(0);
    setMaxWeight(0);
    onSubmit();
    router.push(`/profiles`);
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "gender":
        return (
          genderOptions.find((option) => option.value === gender)?.label ||
          "전체"
        );
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
    onSubmit();
  }, [gender]);

  useEffect(() => {
    setBornYearRange([minBornYear, maxBornYear]);
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
            <Reset width="14" height="14" fill="#212529" />
            <label>필터 초기화</label>
          </BoxButton>
        </div>
      </div>
      <div className="border-b-[1px] border-border-default-light py-4">
        <div className="px-5">
          <div className="typography-body3 mb-2 text-content-secondary-light">
            키워드
          </div>
          <div className="flex items-center gap-2">
            <SearchInput
              text={keyword}
              onChange={handleKeywordChange}
              onSubmit={onSubmit}
            ></SearchInput>
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
        <div className="flex items-center justify-between">
          <div className="typography-body3 text-content-secondary-light">
            성별
            <span className="ml-2 text-accent-primary-light">
              {getTypeLabel("gender")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setGender("U");
              }}
              className="flex items-center gap-1"
            >
              <Reset width="12" height="12" fill="#ADB5BD" />
              <label
                style={{ wordBreak: "keep-all" }}
                className="typography-caption1 text-content-tertiary-light hover:text-content-primary-light"
              >
                초기화
              </label>
            </button>
            <button
              onClick={() => setIsGenderOpen((prev) => !prev)}
              className="transition-transform duration-200"
            >
              <ArrowChevronDownGray
                width="20"
                height="20"
                className={isGenderOpen ? "rotate-180" : "rotate-0"}
              />
            </button>
          </div>
        </div>
        {isGenderOpen && (
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <RadioGroup
                name="example"
                options={genderOptions}
                value={gender}
                onChange={handleGenderChange}
              />
            </div>
          </div>
        )}
      </div>
      <div className="border-b-[1px] border-border-default-light px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="typography-body3 text-content-secondary-light">
            나이(년생)
            <span className="ml-2 text-accent-primary-light">
              {getTypeLabel("bornYear")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMinBornYear(0);
                setMaxBornYear(0);
                setShouldSubmit(true);
              }}
              className="flex items-center gap-1"
            >
              <Reset width="12" height="12" fill="#ADB5BD" />
              <label
                style={{ wordBreak: "keep-all" }}
                className="typography-caption1 text-content-tertiary-light hover:text-content-primary-light"
              >
                초기화
              </label>
            </button>
            <button
              onClick={() => setIsBornYearOpen((prev) => !prev)}
              className="transition-transform duration-200"
            >
              <ArrowChevronDownGray
                width="20"
                height="20"
                className={isBornYearOpen ? "rotate-180" : "rotate-0"}
              />
            </button>
          </div>
        </div>
        {isBornYearOpen && (
          <div className="mt-4">
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
            <div className="mb-2">
              <RangeSlider
                value={bornYearRange}
                setValue={handleBornYearRangeChange}
                min={1900}
                max={2025}
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-b-[1px] border-border-default-light px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="typography-body3 text-content-secondary-light">
            키
            <span className="ml-2 text-accent-primary-light">
              {getTypeLabel("height")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMinHeight(0);
                setMaxHeight(0);
                setShouldSubmit(true);
              }}
              className="flex items-center gap-1"
            >
              <Reset width="12" height="12" fill="#ADB5BD" />
              <label
                style={{ wordBreak: "keep-all" }}
                className="typography-caption1 text-content-tertiary-light hover:text-content-primary-light"
              >
                초기화
              </label>
            </button>
            <button
              onClick={() => setIsHeightOpen((prev) => !prev)}
              className="transition-transform duration-200"
            >
              <ArrowChevronDownGray
                width="20"
                height="20"
                className={isHeightOpen ? "rotate-180" : "rotate-0"}
              />
            </button>
          </div>
        </div>
        {isHeightOpen && (
          <div className="mt-4">
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
            <div className="mb-2">
              <RangeSlider
                value={heightRange}
                setValue={handleHeightRangeChange}
                min={0}
                max={200}
              />
            </div>
          </div>
        )}
      </div>
      <div className="px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="typography-body3 text-content-secondary-light">
            몸무게
            <span className="ml-2 text-accent-primary-light">
              {getTypeLabel("weight")}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setMinWeight(0);
                setMaxWeight(0);
                setShouldSubmit(true);
              }}
              className="flex items-center gap-1"
            >
              <Reset width="12" height="12" fill="#ADB5BD" />
              <label
                style={{ wordBreak: "keep-all" }}
                className="typography-caption1 text-content-tertiary-light hover:text-content-primary-light"
              >
                초기화
              </label>
            </button>
            <button
              onClick={() => setIsWeightOpen((prev) => !prev)}
              className="transition-transform duration-200"
            >
              <ArrowChevronDownGray
                width="20"
                height="20"
                className={isWeightOpen ? "rotate-180" : "rotate-0"}
              />
            </button>
          </div>
        </div>
        {isWeightOpen && (
          <div className="mt-4">
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
            <div className="mb-2">
              <RangeSlider
                value={WeightRange}
                setValue={handleWeightRangeChange}
                min={0}
                max={200}
              />
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ActorFilterSidebar;

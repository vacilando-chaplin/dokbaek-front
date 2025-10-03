"use client";

import { useEffect, useRef, useState } from "react";
import ProfilesMain from "@/app/profiles/components/profilesMain";
import ActorFilterSidebar from "./components/actorFilterSidebar";
import { getProfiles } from "@/app/profiles/api";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/home/types";
import {
  DEFAULT_MIN_BORN_YEAR,
  DEFAULT_MAX_BORN_YEAR,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_MIN_WEIGHT,
  DEFAULT_MAX_WEIGHT
} from "@/constants/constants";
import SelectDropdown from "@/components/molecules/selectDropdown";
import { useActive } from "@/lib/hooks";
import {
  getSortKey,
  getSortLabel,
  SORT_OPTIONS,
  SortType
} from "@/constants/sort";

const Profiles = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const isInitialLoad = useRef(true);
  const pageSize = useRef(16);

  const [filterState, setFilterState] = useState({
    keyword: "",
    gender: null as string | null,
    minBornYear: DEFAULT_MIN_BORN_YEAR,
    maxBornYear: DEFAULT_MAX_BORN_YEAR,
    minHeight: DEFAULT_MIN_HEIGHT,
    maxHeight: DEFAULT_MAX_HEIGHT,
    minWeight: DEFAULT_MIN_WEIGHT,
    maxWeight: DEFAULT_MAX_WEIGHT,
    specialties: [] as number[],
    sort: "RECENT_UPDATED" as SortType
  });

  const [profiles, setProfiles] = useState<ProfileShowcaseResponseType[]>([]);
  const [profilesData, setProfilesData] = useState<ProfilesResponseType>();

  const { active, onActive } = useActive();

  const onSortChange = (sortLabel: string) => {
    const sortKey = getSortKey(sortLabel);

    setFilterState((prev) => ({
      ...prev,
      sort: sortKey
    }));

    const params = getSearchParams();
    params.set("sort", sortKey);
    params.set("page", "0");

    const newUrl = `/profiles?${params.toString()}`;
    replace(newUrl, { scroll: false });
  };

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", "0");
    params.set("size", String(pageSize.current));
    params.set("sort", "RECENT_UPDATED");

    params.set("minBornYear", String(DEFAULT_MIN_BORN_YEAR));
    params.set("maxBornYear", String(DEFAULT_MAX_BORN_YEAR));
    params.set("minHeight", String(DEFAULT_MIN_HEIGHT));
    params.set("maxHeight", String(DEFAULT_MAX_HEIGHT));
    params.set("minWeight", String(DEFAULT_MIN_WEIGHT));
    params.set("maxWeight", String(DEFAULT_MAX_WEIGHT));

    if (!searchParams.toString()) {
      replace(`/profiles?${params.toString()}`);
    }
  }, []);

  const getParam = (key: string, defaultValue = 0) => {
    const value = searchParams.get(key);
    if (value === null) return defaultValue;
    const numValue = Number(value);
    return isNaN(numValue) ? defaultValue : numValue;
  };

  useEffect(() => {
    const sortParam = searchParams.get("sort") || "RECENT_UPDATED";

    setFilterState({
      keyword: searchParams.get("keyword") || "",
      gender: searchParams.get("gender") || null,
      minBornYear: getParam("minBornYear"),
      maxBornYear: getParam("maxBornYear"),
      minHeight: getParam("minHeight", DEFAULT_MIN_HEIGHT),
      maxHeight: getParam("maxHeight", DEFAULT_MAX_HEIGHT),
      minWeight: getParam("minWeight", DEFAULT_MIN_WEIGHT),
      maxWeight: getParam("maxWeight", DEFAULT_MAX_WEIGHT),
      specialties: [],
      sort: (sortParam === "MOST_LIKED"
        ? "MOST_LIKED"
        : "RECENT_UPDATED") as SortType
    });
  }, [searchParams]);

  const onSubmit = ({
    sort,
    keyword,
    gender,
    minBornYear,
    maxBornYear,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight,
    specialties
  }: {
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
  }) => {
    setFilterState((prev) => ({
      ...prev,
      sort,
      keyword: keyword,
      gender,
      minBornYear,
      maxBornYear,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight,
      specialties
    }));

    const params = new URLSearchParams();
    params.set("keyword", keyword);
    if (gender === "F" || gender === "M") {
      params.set("gender", gender);
    }
    params.set("page", String(0));
    params.set("size", String(pageSize.current));
    params.set("sort", sort);

    if (minBornYear > 0) params.set("minBornYear", String(minBornYear));
    if (maxBornYear > 0) params.set("maxBornYear", String(maxBornYear));
    if (minHeight > -1) params.set("minHeight", String(minHeight));
    if (maxHeight > -1) params.set("maxHeight", String(maxHeight));
    if (minWeight > -1) params.set("minWeight", String(minWeight));
    if (maxWeight > -1) params.set("maxWeight", String(maxWeight));

    if (specialties.length > 0) {
      params.set("specialties", specialties.join(","));
    }

    const newUrl = `/profiles?${params.toString()}`;
    replace(newUrl, { scroll: false });
  };

  const getSearchParams = () => {
    const params = new URLSearchParams();
    params.set("size", String(pageSize.current));
    params.set("sort", filterState.sort);

    const page = searchParams.get("page");
    if (page) {
      params.set("page", page);
    } else {
      params.set("page", "0");
    }

    params.set("keyword", filterState.keyword);
    if (filterState.gender === "F" || filterState.gender === "M") {
      params.set("gender", filterState.gender);
    }
    params.set("minBornYear", String(filterState.minBornYear));
    params.set("maxBornYear", String(filterState.maxBornYear));
    params.set("minHeight", String(filterState.minHeight));
    params.set("maxHeight", String(filterState.maxHeight));
    params.set("minWeight", String(filterState.minWeight));
    params.set("maxWeight", String(filterState.maxWeight));

    if (filterState.specialties.length > 0) {
      params.set("specialties", filterState.specialties.join(","));
    }

    return params;
  };

  const fetchProfiles = async () => {
    try {
      const res = await getProfiles(getSearchParams().toString());
      setProfiles(res.content);
      setProfilesData(res);
      isInitialLoad.current = false;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (searchParams.toString()) {
      fetchProfiles();
    }
  }, [
    searchParams.toString(),
    filterState.keyword,
    filterState.gender,
    filterState.minBornYear,
    filterState.maxBornYear,
    filterState.minHeight,
    filterState.maxHeight,
    filterState.minWeight,
    filterState.maxWeight,
    filterState.sort
  ]);

  return (
    <div className="container-max m-auto mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      <section className="mt-11 flex flex-col gap-6">
        <div className="flew-row flex w-full justify-between">
          <p className="typography-heading2 font-semibold text-content-primary-light dark:text-content-primary-dark">
            배우 찾기
          </p>
          <div className="h-auto w-[120px]">
            <SelectDropdown
              size="small"
              name="sort"
              list={Object.values(SORT_OPTIONS)}
              value={getSortLabel(filterState.sort)}
              active={active}
              selected={getSortLabel(filterState.sort)}
              onActive={onActive}
              onClick={(name: string, item: string) => {
                onSortChange(item);
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center gap-6">
          <ActorFilterSidebar
            currSort={filterState.sort}
            currKeyword={filterState.keyword}
            currGender={filterState.gender}
            currMinBornYear={filterState.minBornYear}
            currMaxBornYear={filterState.maxBornYear}
            currMinHeight={filterState.minHeight}
            currMaxHeight={filterState.maxHeight}
            currMinWeight={filterState.minWeight}
            currMaxWeight={filterState.maxWeight}
            handleSubmit={onSubmit}
            profiles={profiles}
            profilesData={profilesData}
          />
          <ProfilesMain profiles={profiles} profilesData={profilesData} />
        </div>
      </section>
    </div>
  );
};

export default Profiles;

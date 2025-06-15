"use client";

import { useEffect, useRef, useState } from "react";
import ProfilesMain from "@/app/profiles/components/profilesMain";
import ActorFilterSidebar from "./components/actorFilterSidebar";
import { getProfiles } from "@/app/profiles/api";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ProfileShowcaseResponseType,
  ProfilesResponseType
} from "@/app/landing/types";
import {
  DEFAULT_MIN_BORN_YEAR,
  DEFAULT_MAX_BORN_YEAR,
  DEFAULT_MIN_HEIGHT,
  DEFAULT_MAX_HEIGHT,
  DEFAULT_MIN_WEIGHT,
  DEFAULT_MAX_WEIGHT
} from "@/constants/constants";

const Page = () => {
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
    maxWeight: DEFAULT_MAX_WEIGHT
  });

  const [profiles, setProfiles] = useState<ProfileShowcaseResponseType[]>([]);
  const [profilesData, setProfilesData] = useState<ProfilesResponseType>();

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
    setFilterState({
      keyword: searchParams.get("keyword") || "",
      gender: searchParams.get("gender") || null,
      minBornYear: getParam("minBornYear"),
      maxBornYear: getParam("maxBornYear"),
      minHeight: getParam("minHeight", DEFAULT_MIN_HEIGHT),
      maxHeight: getParam("maxHeight", DEFAULT_MAX_HEIGHT),
      minWeight: getParam("minWeight", DEFAULT_MIN_WEIGHT),
      maxWeight: getParam("maxWeight", DEFAULT_MAX_WEIGHT)
    });
  }, [searchParams]);

  const onSubmit = ({
    keyword,
    gender,
    minBornYear,
    maxBornYear,
    minHeight,
    maxHeight,
    minWeight,
    maxWeight
  }: {
    keyword: string;
    gender: string | null;
    minBornYear: number;
    maxBornYear: number;
    minHeight: number;
    maxHeight: number;
    minWeight: number;
    maxWeight: number;
  }) => {
    setFilterState({
      keyword: keyword,
      gender,
      minBornYear,
      maxBornYear,
      minHeight,
      maxHeight,
      minWeight,
      maxWeight
    });

    const params = new URLSearchParams();
    params.set("keyword", keyword);
    if (gender === "F" || gender === "M") {
      params.set("gender", gender);
    }
    params.set("page", String(0));
    params.set("size", String(pageSize.current));
    params.set("sort", "RECENT_UPDATED");

    if (minBornYear > 0) params.set("minBornYear", String(minBornYear));
    if (maxBornYear > 0) params.set("maxBornYear", String(maxBornYear));
    if (minHeight > -1) params.set("minHeight", String(minHeight));
    if (maxHeight > -1) params.set("maxHeight", String(maxHeight));
    if (minWeight > -1) params.set("minWeight", String(minWeight));
    if (maxWeight > -1) params.set("maxWeight", String(maxWeight));

    const newUrl = `/profiles?${params.toString()}`;
    replace(newUrl, { scroll: false });
  };

  const getSearchParams = () => {
    console.log("getSearchParams", filterState.keyword);
    const params = new URLSearchParams();
    params.set("size", String(pageSize.current));
    params.set("sort", "RECENT_UPDATED");

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
    filterState.maxWeight
  ]);

  return (
    <div className="container-max m-[auto] mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      <section className="mt-11">
        <p className="mb-6 text-heading2 font-semibold text-content-primary-light dark:text-content-primary-dark">
          배우 찾기
        </p>
        <div className="mb-4 flex flex-row justify-center gap-6">
          <ActorFilterSidebar
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
          <ProfilesMain
            profiles={profiles}
            profilesData={profilesData}
            fetchProfiles={fetchProfiles}
          />
        </div>
      </section>
    </div>
  );
};

export default Page;

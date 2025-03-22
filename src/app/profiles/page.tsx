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

const Page = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const currKeyword = useRef("");
  const currGender = useRef<string | null>(null);
  const currMinBornYear = useRef(0);
  const currMaxBornYear = useRef(0);
  const currMinHeight = useRef(0);
  const currMaxHeight = useRef(0);
  const currMinWeight = useRef(0);
  const currMaxWeight = useRef(0);

  const [profiles, setProfiles] = useState<ProfileShowcaseResponseType[]>([]);
  const [profilesData, setProfilesData] = useState<ProfilesResponseType>();

  const getParam = (key: string, defaultValue = 0) => {
    return Number(searchParams.get(key)) || defaultValue;
  };

  const keyword = searchParams.get("keyword") ?? "";
  const gender = searchParams.get("gender") ?? "";
  const minBornYear = getParam("minBornYear");
  const maxBornYear = getParam("maxBornYear");
  const minHeight = getParam("minHeight");
  const maxHeight = getParam("maxHeight");
  const minWeight = getParam("minWeight");
  const maxWeight = getParam("maxWeight");

  if (keyword) currKeyword.current = keyword;
  if (gender) currGender.current = gender;
  if (!isNaN(minBornYear)) currMinBornYear.current = minBornYear;
  if (!isNaN(maxBornYear)) currMaxBornYear.current = maxBornYear;
  if (!isNaN(minHeight)) currMinHeight.current = minHeight;
  if (!isNaN(maxHeight)) currMaxHeight.current = maxHeight;
  if (!isNaN(minWeight)) currMinWeight.current = minWeight;
  if (!isNaN(maxWeight)) currMaxWeight.current = maxWeight;

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
    currKeyword.current = keyword.trim();
    currMinBornYear.current = minBornYear;
    currMaxBornYear.current = maxBornYear;
    currMinHeight.current = minHeight;
    currMaxHeight.current = maxHeight;
    currMinWeight.current = minWeight;
    currMaxWeight.current = maxWeight;

    if (gender === "F" || gender === "M") {
      currGender.current = gender;
    }

    fetchProfiles();

    const params = new URLSearchParams();
    params.set("keyword", keyword);
    if (gender === "F" || gender === "M") {
      params.set("gender", gender);
    }
    params.set("page", String(0));
    params.set("size", String(10));
    params.set("sort", "RECENT_UPDATED");

    if (minBornYear > 0) params.set("minBornYear", String(minBornYear));
    if (maxBornYear > 0) params.set("maxBornYear", String(maxBornYear));
    if (minHeight > 0) params.set("minHeight", String(minHeight));
    if (maxHeight > 0) params.set("maxHeight", String(maxHeight));
    if (minWeight > 0) params.set("minWeight", String(minWeight));
    if (maxWeight > 0) params.set("maxWeight", String(maxWeight));

    const newUrl = `/profiles?${params.toString()}`;
    replace(newUrl, { scroll: false });
  };

  const getSearchParams = () => {
    const params = new URLSearchParams();
    if (keyword) params.set("keyword", keyword);
    if (gender) params.set("gender", gender);
    params.set("page", String(0));
    params.set("size", String(10));
    params.set("sort", "RECENT_UPDATED");

    if (minBornYear > 0) params.set("minBornYear", String(minBornYear));
    if (maxBornYear > 0) params.set("maxBornYear", String(maxBornYear));
    if (minHeight > 0) params.set("minHeight", String(minHeight));
    if (maxHeight > 0) params.set("maxHeight", String(maxHeight));
    if (minWeight > 0) params.set("minWeight", String(minWeight));
    if (maxWeight > 0) params.set("maxWeight", String(maxWeight));

    return params;
  };

  const fetchProfiles = async () => {
    try {
      const res = await getProfiles(getSearchParams().toString());
      setProfiles(res.content);
      setProfilesData(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, [searchParams.toString()]);

  return (
    <div className="container-max m-[auto] mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      <section className="mt-11">
        <p className="mb-6 text-heading2 font-semibold text-content-primary-light">
          배우 찾기
        </p>
        <div className="mb-4 flex flex-row justify-center gap-6">
          <ActorFilterSidebar
            currKeyword={currKeyword.current}
            currGender={currGender.current}
            currMinBornYear={currMinBornYear.current}
            currMaxBornYear={currMaxBornYear.current}
            currMinHeight={currMinHeight.current}
            currMaxHeight={currMaxHeight.current}
            currMinWeight={currMinWeight.current}
            currMaxWeight={currMaxWeight.current}
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

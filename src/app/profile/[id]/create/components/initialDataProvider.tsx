"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ProfileDarftDataType } from "../types";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";

interface InitalDataProviderProps {
  data: ProfileDarftDataType;
}

const InitalDataProvider = ({ data }: InitalDataProviderProps) => {
  const setData = useSetRecoilState(profileDraftData);

  useEffect(() => {
    setData(data);
  }, []);

  return null;
};

export default InitalDataProvider;

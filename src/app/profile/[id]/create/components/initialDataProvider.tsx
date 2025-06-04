"use client";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { ProfileDarftDataType } from "../types";
import {
  draftStatus,
  profileDraftData
} from "@/lib/recoil/profile/common/atom";
import { initialInfoData } from "@/lib/data";
import { postProfileDraft } from "../../api";

interface InitalDataProviderProps {
  profileId: number;
  initialData: ProfileDarftDataType;
}

const InitalDataProvider = ({
  profileId,
  initialData
}: InitalDataProviderProps) => {
  const setDraftStatus = useSetRecoilState(draftStatus);

  const setData = useSetRecoilState(profileDraftData);

  useEffect(() => {
    const postDraft = async () => {
      const draftRes = await postProfileDraft(profileId);
      setDraftStatus(draftRes.status);
    };
    postDraft();
    setData({
      ...initialData,
      info: initialInfoData
    });
  }, []);

  return null;
};

export default InitalDataProvider;

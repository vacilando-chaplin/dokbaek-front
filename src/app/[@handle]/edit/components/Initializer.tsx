"use client";

import { useSetRecoilState } from "recoil";
import { ProfileDraftDataType } from "../types";
import {
  draftModalState,
  profileDraftData
} from "@/lib/recoil/handle/edit/common/atom";
import { useEffect, useLayoutEffect } from "react";
import { getProfileDraftClient } from "../../api";
import { getProfileByProfileId } from "@/lib/api";
import { hasProfileChanges } from "@/lib/utils";

interface InitializerProps {
  children: React.ReactNode;
  profileId: number;
  profileInitData: ProfileDraftDataType;
}

const Initializer = ({
  children,
  profileId,
  profileInitData
}: InitializerProps) => {
  const setData = useSetRecoilState(profileDraftData);
  const setDraftModal = useSetRecoilState(draftModalState);

  useLayoutEffect(() => {
    setData({ ...profileInitData, info: { ...profileInitData.info } });
  }, [profileInitData]);

  useEffect(() => {
    const onCheckForChanges = async () => {
      const originalProfileResponse = await getProfileByProfileId(profileId);
      const draftResponse = await getProfileDraftClient(profileId);

      if (draftResponse?.data.data) {
        setData({
          ...draftResponse.data.data,
          info: { ...draftResponse.data.data.info }
        });
      }

      const hasChanges = draftResponse?.hasDraft
        ? hasProfileChanges(originalProfileResponse, draftResponse)
        : false;

      if (hasChanges) {
        setDraftModal(true);
      }
    };
    onCheckForChanges();
  }, [profileId]);

  return <>{children}</>;
};

export default Initializer;

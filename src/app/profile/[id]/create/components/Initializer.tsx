"use client";

import { useSetRecoilState } from "recoil";
import { ProfileDraftDataType } from "../types";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { useLayoutEffect } from "react";

interface InitializerProps {
  children: React.ReactNode;
  profileInitData: ProfileDraftDataType;
}

const Initializer = ({ children, profileInitData }: InitializerProps) => {
  const setData = useSetRecoilState(profileDraftData);

  useLayoutEffect(() => {
    setData(profileInitData);
  }, []);
  return <>{children}</>;
};

export default Initializer;

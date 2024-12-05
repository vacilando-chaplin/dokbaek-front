"use client";

import { getFilmoRoles, getProfile } from "@/api/api";
import Toast from "@/components/atoms/toast";
import SideMenu from "@/components/molecules/sideMenu";
import BottomBar from "@/components/organisms/bottomBar";
import {
  defaultId,
  infoRequired,
  stepperInit,
  toastMessage
} from "@/data/atom";
import { stepperList } from "@/data/data";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const userId = useRecoilValue(defaultId);

  const router = useRouter();

  const required = useRecoilValue(infoRequired);

  const [canSave, setCanSave] = useState(false);

  // useEffect(() => {
  //   setCanSave(
  //     required.name.length == 0 &&
  //       required.birth.length == 0 &&
  //       required.contact.length == 0
  //   );
  //   console.log(required.name.length);
  //   console.log(canSave);
  // }, [required]);

  const setStepper = useSetRecoilState(stepperInit);
  const onStepper = (index: number) => {
    setStepper(index);
    router.prefetch(`/profile/${userId}/create/${stepperList[index].path}`);
    router.push(`/profile/${userId}/create/${stepperList[index].path}`);
  };

  const [message, setMessage] = useRecoilState(toastMessage);

  // 토스트 메세지 보이기 딜레이(3초)
  useEffect(() => {
    const timeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  const onSaveProfileClick = () => {
    router.prefetch(`/profile/${userId}`);
    router.push(`/profile/${userId}`);
  };

  const onBackProfileClick = () => {
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      {message && <Toast text={message} />}
      <SideMenu onStepper={onStepper} />
      {children}
      <BottomBar
        onBack={onBackProfileClick}
        onSave={onSaveProfileClick}
        // disabled={canSave}
      />
    </div>
  );
};

export default Layout;

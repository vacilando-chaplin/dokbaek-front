"use client";

import SideMenu from "@/components/molecules/sideMenu";
import BottomBar from "@/components/organisms/bottomBar";
import { defaultId, jwt, stepperInit } from "@/data/atom";
import { stepperList } from "@/data/data";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const userId = useRecoilValue(defaultId);
  const token = useRecoilValue(jwt);

  const router = useRouter();

  const setStepper = useSetRecoilState(stepperInit);
  const onStepper = (index: number) => {
    setStepper(index);
    router.prefetch(`/profile/${userId}/create/${stepperList[index].path}`);
    router.push(`/profile/${userId}/create/${stepperList[index].path}`);
  };

  const onSaveProfileClick = () => {
    router.prefetch(`/profile/${userId}`);
    router.push(`/profile/${userId}`);
  };

  const onBackProfileClick = () => {
    router.prefetch(`/profile/${userId}`);
    router.push(`/profile/${userId}`);
  };

  // token값 없을 시 로그인 페이지로 이동
  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
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

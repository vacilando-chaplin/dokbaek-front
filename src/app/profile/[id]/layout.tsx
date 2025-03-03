"use client";

import Toast from "@/components/atoms/toast";
import TopNavigation from "@/components/organisms/topNavigation";
import { toastMessage } from "@/lib/atoms";
import { useEffect } from "react";
import { useRecoilState } from "recoil";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useRecoilState(toastMessage);

  // 토스트 메세지 보이기 딜레이(3초)
  useEffect(() => {
    const timeout = setTimeout(() => setMessage(""), 3000);
    return () => clearTimeout(timeout);
  }, [message]);

  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light">
      {message && (
        <Toast text={message} kind="info" fullWidth={false} placement="top" />
      )}
      <TopNavigation />
      {children}
    </div>
  );
};

export default Layout;

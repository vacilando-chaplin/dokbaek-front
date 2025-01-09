"use client";

import Toast from "@/components/atoms/toast";
import TopBar from "@/components/organisms/topBar";
import { toastMessage } from "@/data/atom";
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
      <TopBar />
      {children}
    </div>
  );
};

export default Layout;

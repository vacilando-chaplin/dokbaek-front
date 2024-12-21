"use client";

import Logo from "../atoms/logo";
import { useGetRefreshToken } from "@/hooks/hooks";
import { useRouter } from "next/navigation";
import { postSignOut } from "@/app/api/route";
import NavButton from "../atoms/navButton";

const TopBar = () => {
  const router = useRouter();

  const onLogOut = async () => {
    const refreshToken = useGetRefreshToken();

    if (refreshToken) {
      await postSignOut({ refreshToken: refreshToken, deviceId: "" });
      document.cookie = "refresh_token=; path=/; max-age=0; sameSite=Strict;";
      // 배포 시 secure; 추가
      router.prefetch("/");
      router.push("/");
    }
  };

  return (
    <section className="fixed top-0 z-50 flex h-12 w-full items-center bg-background-elevated-light px-6 shadow-header">
      <nav className="flex w-full items-center justify-between">
        <Logo name="로고" href="/" />
        <NavButton name="로그아웃" onClick={onLogOut} />
      </nav>
    </section>
  );
};

export default TopBar;

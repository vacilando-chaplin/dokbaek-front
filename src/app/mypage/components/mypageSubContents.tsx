"use client";

import { deleteSignOut } from "@/lib/api";
import MypageListItem from "./mypageListItem";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const MypageSubContents = () => {
  const router = useRouter();

  const onLogOut = async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      await deleteSignOut(refreshToken);
      Cookies.remove("jwt", { path: "/" });
      Cookies.remove("refresh_token", { path: "/" });
      localStorage.removeItem("recoil-persist");
      router.prefetch("/");
      router.push("/");
    }
  };

  const onWithdraw = async () => {
    router.prefetch("/withdrawal");
    router.push("/withdrawal");
  };

  return (
    <div className="flex h-auto w-full min-w-[560px] max-w-[560px] flex-col gap-2 rounded-2xl border border-border-default-light bg-background-surface-light p-2 dark:border-border-default-dark dark:bg-background-base-dark">
      <div className="h-auto w-full">
        <MypageListItem text="로그아웃" onClick={onLogOut} />
        <MypageListItem text="회원 탈퇴" negative onClick={onWithdraw} />
      </div>
    </div>
  );
};

export default MypageSubContents;

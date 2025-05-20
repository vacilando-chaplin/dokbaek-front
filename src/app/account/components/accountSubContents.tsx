"use client";

import { deleteSignOut } from "@/lib/api";
import AccountListItem from "./accountListItem";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AccountContainer from "./accountContainer";
import { removeStorageData } from "@/lib/utils";

const AccountSubContents = () => {
  const router = useRouter();

  const onLogOut = async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      await deleteSignOut(refreshToken);

      removeStorageData();

      router.prefetch("/");
      router.push("/");
    }
  };

  const onWithdraw = async () => {
    router.prefetch("/account/withdrawal");
    router.push("/account/withdrawal");
  };

  return (
    <AccountContainer>
      <div className="h-auto w-full">
        <AccountListItem text="로그아웃" onClick={onLogOut} />
        <AccountListItem text="회원 탈퇴" negative onClick={onWithdraw} />
      </div>
    </AccountContainer>
  );
};

export default AccountSubContents;

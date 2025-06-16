"use client";

import { deleteSignOut } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AccountContainer from "./accountContainer";
import { removeStorageData } from "@/lib/utils";
import { useSetRecoilState } from "recoil";
import { toastMessage } from "@/lib/atoms";
import AccountMenuItem from "./accountMenuItem";

const AccountMenu = () => {
  const router = useRouter();
  const setToastMessage = useSetRecoilState(toastMessage);

  const onLogOut = async () => {
    const refreshToken = Cookies.get("refresh_token");

    if (refreshToken) {
      await deleteSignOut(refreshToken);
      removeStorageData();
      setToastMessage("안전하게 로그아웃됐어요.");
      router.replace("/");
    }
  };

  const onWithdraw = async () => {
    router.prefetch("/account/withdrawal");
    router.push("/account/withdrawal");
  };

  return (
    <AccountContainer type="sub">
      <div className="h-auto w-full">
        <AccountMenuItem text="로그아웃" onClick={onLogOut} />
        <AccountMenuItem text="회원 탈퇴" negative onClick={onWithdraw} />
      </div>
    </AccountContainer>
  );
};

export default AccountMenu;

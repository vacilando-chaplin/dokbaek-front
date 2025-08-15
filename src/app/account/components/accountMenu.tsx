"use client";

import { deleteSignOut } from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import AccountContainer from "./accountContainer";
import { removeStorageData } from "@/lib/utils";
import { useSetRecoilState } from "recoil";
import { loginState, toastMessage } from "@/lib/atoms";
import AccountMenuItem from "./accountMenuItem";
import { routePaths } from "@/constants/routes";

const AccountMenu = () => {
  const router = useRouter();
  const setToastMessage = useSetRecoilState(toastMessage);
  const setLogin = useSetRecoilState(loginState);

  const onLogOut = async () => {
    const jwt = Cookies.get("jwt");

    if (jwt) {
      await deleteSignOut(jwt);
      removeStorageData();

      setLogin(false);
      setToastMessage("안전하게 로그아웃됐어요.");
      router.replace(routePaths.home());
    }
  };

  const onWithdraw = async () => {
    const withdrawalURL = routePaths.accountWithdrawal();

    router.prefetch(withdrawalURL);
    router.push(withdrawalURL);
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

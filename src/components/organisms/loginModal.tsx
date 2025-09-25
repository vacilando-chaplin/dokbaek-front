"use client";

import X from "../../../public/icons/X.svg";
import LogoHorizontal from "../../../public/icons/LogoHorizontal.svg";
import KakaoLogin from "@/app/login/components/kakaoLogin";
import NaverLogin from "@/app/login/components/naverLogin";
import GoogleLogin from "@/app/login/components/googleLogin";
import AppleLogin from "@/app/login/components/appleLogin";
import { useEffect, useState } from "react";
import Tooltip from "@/components/atoms/tooltip";
import Cookies from "js-cookie";
import { useRecoilState } from "recoil";
import { homeLoginModalState } from "@/lib/recoil/home/atom";

const LoginModal = () => {
  const [loginForm, setLoginForm] = useState<string | null>(null);

  const [loginModal, setLoginModal] = useRecoilState(homeLoginModalState);

  const onLoginModalClose = () => {
    setLoginModal(false);
  };

  useEffect(() => {
    const currentLoginForm = Cookies.get("login_form");
    setLoginForm(currentLoginForm || null);
  }, []);

  const LoginButton = ({
    type,
    Component
  }: {
    type: string;
    Component: React.FC;
  }) => (
    <div className="relative flex items-center justify-center">
      <Component />
      {loginForm === type && (
        <div className="absolute -top-7">
          <Tooltip placement="top" text="마지막에 로그인했어요" />
        </div>
      )}
    </div>
  );

  return (
    loginModal && (
      <section className="fixed inset-0 z-[999] flex max-h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
        <div
          className={`interaction-default relative flex h-auto w-[487px] max-w-[487px] animate-enter flex-col rounded-3xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark`}
        >
          <div className="absolute right-6 top-6">
            <button type="button" className="p-2" onClick={onLoginModalClose}>
              <X
                width="20"
                height="20"
                className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
              />
            </button>
          </div>
          <div className="mx-[80px] mb-[72px] mt-[88px]">
            <div className="flex flex-col items-center justify-center gap-4">
              <LogoHorizontal width="85" height="46" />
              <label className="typography-body2 font-semibold text-content-primary-light dark:text-content-primary-dark">
                쉽고 빠르게 프로필을 만들어보세요.
              </label>
            </div>
            <div className="mt-10 flex h-auto w-full flex-col gap-2">
              <LoginButton type="카카오" Component={KakaoLogin} />
              <LoginButton type="네이버" Component={NaverLogin} />
              <LoginButton type="애플" Component={AppleLogin} />
              <LoginButton type="구글" Component={GoogleLogin} />
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default LoginModal;

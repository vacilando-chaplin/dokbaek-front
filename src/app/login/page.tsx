"use client";

import KakaoLogin from "@/app/login/components/kakaoLogin";
import NaverLogin from "@/app/login/components/naverLogin";
import GoogleLogin from "@/app/login/components/googleLogin";
import { useEffect, useState } from "react";
import LogoVertical from "../../../public/icons/LogoVertical.svg";
import Tooltip from "@/components/atoms/tooltip";
import Cookies from "js-cookie";

const Login = () => {
  const [loginForm, setLoginForm] = useState<string | null>(null);

  useEffect(() => {
    const currentLoginForm = Cookies.get("login_form");
    setLoginForm(currentLoginForm || null);
  }, []);

  return (
    <main className="relative flex h-auto w-auto flex-col items-center gap-10 rounded-[40px] border border-border-default-light bg-background-surface-light p-20 dark:border-border-default-dark dark:bg-background-surface-dark">
      <div className="flex flex-col items-center justify-center gap-4">
        <LogoVertical width="103" height="56" />
        <label className="typography-body2 font-semibold text-content-primary-light dark:text-content-primary-dark">
          필로그램으로 쉽고 빠르게 프로필을 만들어 보세요.
        </label>
      </div>
      <div className="flex h-auto w-full flex-col gap-2">
        {loginForm === "카카오" ? (
          <div className="relative flex items-center justify-center">
            <KakaoLogin />
            <div className="absolute -top-7">
              <Tooltip placement="top" text="마지막에 로그인했어요" />
            </div>
          </div>
        ) : (
          <KakaoLogin />
        )}
        {loginForm === "네이버" ? (
          <div className="relative flex items-center justify-center">
            <NaverLogin />
            <div className="absolute -top-7">
              <Tooltip placement="top" text="마지막에 로그인했어요" />
            </div>
          </div>
        ) : (
          <NaverLogin />
        )}
        {loginForm === "구글" ? (
          <div className="relative flex items-center justify-center">
            <GoogleLogin />
            <div className="absolute -top-7">
              <Tooltip placement="top" text="마지막에 로그인했어요" />
            </div>
          </div>
        ) : (
          <GoogleLogin />
        )}
      </div>
    </main>
  );
};

export default Login;

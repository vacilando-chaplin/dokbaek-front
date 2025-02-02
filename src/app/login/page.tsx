"use client";

import KakaoLogin from "@/app/login/components/kakaoLogin";
import NaverLogin from "@/app/login/components/naverLogin";
import GoogleLogin from "@/app/login/components/googleLogin";
import { useEffect } from "react";
import LogoVertical from "../../../public/icons/LogoVertical.svg";
import Tooltip from "@/components/atoms/tooltip";
import Cookies from "js-cookie";

const Login = () => {
  const currentLoginForm = Cookies.get("login_form");

  const loadKakaoSDK = () => {
    if (window.Kakao) {
      return;
    }
    const script = document.createElement("script");
    script.src = "https://developers.kakao.com/sdk/js/kakao.js";
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JS_KEY);
      }
    };
    document.head.appendChild(script);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      loadKakaoSDK();
    }
  }, []);

  return (
    <main className="relative flex h-auto w-auto flex-col items-center gap-10 rounded-[40px] border border-border-default-light bg-background-surface-light p-20">
      <div className="flex flex-col items-center justify-center gap-4">
        <LogoVertical width="103" height="56" />
        <label className="typography-body2 font-semibold text-content-primary-light">
          필로그램으로 쉽고 빠르게 프로필을 만들어 보세요.
        </label>
      </div>
      <div className="flex h-auto w-full flex-col gap-2">
        {currentLoginForm === "카카오" ? (
          <div className="relative flex items-center justify-center">
            <KakaoLogin />
            <div className="absolute -top-7">
              <Tooltip placement="top" text="마지막에 로그인했어요" />
            </div>
          </div>
        ) : (
          <KakaoLogin />
        )}
        {currentLoginForm === "네이버" ? (
          <div className="relative flex items-center justify-center">
            <NaverLogin />
            <div className="absolute -top-7">
              <Tooltip placement="top" text="마지막에 로그인했어요" />
            </div>
          </div>
        ) : (
          <NaverLogin />
        )}
        {currentLoginForm === "구글" ? (
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

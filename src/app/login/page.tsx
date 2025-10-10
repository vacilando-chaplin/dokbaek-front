"use client";

import KakaoLogin from "@/app/login/components/kakaoLogin";
import NaverLogin from "@/app/login/components/naverLogin";
import GoogleLogin from "@/app/login/components/googleLogin";
import AppleLogin from "@/app/login/components/appleLogin";
import { useEffect, useState } from "react";
import LogoHorizontal from "../../../public/icons/LogoHorizontal.svg";
import Tooltip from "@/components/atoms/tooltip";
import Cookies from "js-cookie";
import { useRecoilValue } from "recoil";
import { loginState } from "@/lib/atoms";
import { useRouter } from "next/navigation";
import { routePaths } from "@/constants/routes";
import Link from "next/link";

const Login = () => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState<string | null>(null);
  const isLoggedIn = useRecoilValue(loginState);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(routePaths.home());
    }

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
    <main className="relative flex h-auto w-auto flex-col items-center gap-10 rounded-[40px] border border-border-default-light bg-background-surface-light p-20 dark:border-border-default-dark dark:bg-background-surface-dark">
      <div className="flex flex-col items-center justify-center gap-4">
        <Link href={routePaths.home()}>
          <LogoHorizontal width="85" height="46" />
        </Link>
        <span className="typography-body2 font-semibold text-content-primary-light dark:text-content-primary-dark">
          독백으로 쉽고 빠르게 프로필을 만들어 보세요.
        </span>
      </div>
      <div className="flex h-auto w-full flex-col gap-2">
        <LoginButton type="kakao" Component={KakaoLogin} />
        <LoginButton type="naver" Component={NaverLogin} />
        <LoginButton type="apple" Component={AppleLogin} />
        <LoginButton type="google" Component={GoogleLogin} />
      </div>
    </main>
  );
};

export default Login;

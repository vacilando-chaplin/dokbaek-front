"use client";

import { useRouter } from "next/navigation";
import Naver from "../../../../public/icons/Naver.svg";

const NaverLogin = () => {
  const router = useRouter();

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_NAVER_LOGIN_REDIRECT_URI}&state=naver_login_${Math.random().toString(36).substring(2, 15)}`;

  const onNaverLogin = () => {
    router.prefetch(NAVER_AUTH_URL);
    router.push(NAVER_AUTH_URL);
  };

  return (
    <button
      type="button"
      className="interaction-default relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-[#5FC53A] px-6 py-3 hover:brightness-90 active:brightness-[80%]"
      onClick={onNaverLogin}
    >
      <Naver
        width="16"
        height="16"
        fill="#ffffff"
        className="absolute left-4"
      />
      <div className="typography-body2 font-medium text-static-white">
        네이버로 시작하기
      </div>
    </button>
  );
};

export default NaverLogin;

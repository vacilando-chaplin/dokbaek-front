"use client";

import { useRouter } from "next/navigation";

const NaverLogin = () => {
  const router = useRouter();

  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI}&state=naver_login_${Math.random().toString(36).substring(2, 15)}`;

  const onNaverLogin = () => {
    router.prefetch(NAVER_AUTH_URL);
    router.push(NAVER_AUTH_URL);
  };

  return (
    <button
      type="button"
      className="relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-[#5FC53A] px-6 py-3"
      onClick={onNaverLogin}
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 17 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-4"
      >
        <path
          d="M10.5667 15L6.37224 7.75345V15H2V1H6.43326L10.6278 8.24654V1H15V15H10.5667Z"
          fill="white"
        />
      </svg>
      <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-white">
        네이버로 시작하기
      </div>
    </button>
  );
};

export default NaverLogin;

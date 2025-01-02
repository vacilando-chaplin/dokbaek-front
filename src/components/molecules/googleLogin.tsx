"use client";

import { useRouter } from "next/navigation";

const GoogleLogin = () => {
  const router = useRouter();

  const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_OAUTH_LOGIN_REDIRECT_URI}&state=google_login_${Math.random().toString(36).substring(2, 15)}&access_type=offline`;

  const onGoogleLogin = () => {
    router.prefetch(GOOGLE_AUTH_URL);
    router.push(GOOGLE_AUTH_URL);
  };

  return (
    <button
      type="button"
      className="relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-[#c0c0c0] px-6 py-3"
      onClick={onGoogleLogin}
    >
      <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-white">
        구글로 시작하기
      </div>
    </button>
  );
};

export default GoogleLogin;

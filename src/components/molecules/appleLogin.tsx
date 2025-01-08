"use client";

import { useRouter } from "next/navigation";
import Apple from "../../../public/icons/Apple.svg";

const appleLogin = () => {
  const router = useRouter();

  const APPLE_AUTH_URL = `https://appleid.apple.com/auth/authorize?response_type=code&client_id=${encodeURIComponent(
    process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || ""
  )}&redirect_uri=${encodeURIComponent(
    process.env.NEXT_PUBLIC_APPLE_REDIRECT_URI || ""
  )}&state=apple_login_${Math.random()
    .toString(36)
    .substring(2, 15)}&response_mode=query`;

  const onappleLogin = () => {
    router.prefetch(APPLE_AUTH_URL);
    router.push(APPLE_AUTH_URL);
  };

  return (
    <button
      type="button"
      className="relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-content-primary-light px-6 py-3"
      onClick={onappleLogin}
    >
      <Apple
        width="16"
        height="16"
        fill="#ffffff"
        className="absolute left-4"
      />
      <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-white">
        Apple로 시작하기
      </div>
    </button>
  );
};

export default appleLogin;

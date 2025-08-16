"use client";

import { useRouter } from "next/navigation";
import Apple from "../../../../public/icons/Apple.svg";

const AppleLogin = () => {
  const router = useRouter();

  const APPLE_AUTH_URL =
    `https://appleid.apple.com/auth/authorize?` +
    new URLSearchParams({
      response_type: "code id_token",
      response_mode: "form_post",
      client_id: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID || "",
      redirect_uri: process.env.NEXT_PUBLIC_APPLE_LOGIN_REDIRECT_URI || "",
      scope: "name email",
      state: `apple_login_${Math.random().toString(36).substring(2, 15)}`
    });

  const onAppleLogin = () => {
    router.push(APPLE_AUTH_URL);
  };
  return (
    <button
      type="button"
      className="interaction-default relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] border border-border-default-light bg-background-base_inverse-light px-6 py-3 hover:brightness-90 active:brightness-[80%]"
      onClick={onAppleLogin}
    >
      <Apple
        width="16"
        height="16"
        fill="#ffffff"
        className="absolute left-4"
      />
      <div className="typography-body2 font-medium text-static-white">
        Apple로 시작하기
      </div>
    </button>
  );
};

export default AppleLogin;

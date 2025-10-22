"use client";

import { useRouter } from "next/navigation";
import Kakao from "../../../../public/icons/Kakao.svg";

const KakaoLogin = () => {
  const router = useRouter();

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}&redirect_uri=${process.env.NEXT_PUBLIC_KAKAO_LOGIN_REDIRECT_URI}&state=kakao_login_${Math.random().toString(36).substring(2, 15)}`;

  const onKakaoLogin = () => {
    router.push(KAKAO_AUTH_URL);
  };

  return (
    <button
      type="button"
      className="interaction-default relative flex h-auto w-full flex-row items-center justify-center gap-2 rounded-[14px] bg-[#FAE64D] px-6 py-3 hover:brightness-90 active:brightness-[80%]"
      onClick={onKakaoLogin}
    >
      <Kakao
        width="16"
        height="16"
        fill="#3C1E1E"
        className="absolute left-4"
      />
      <div className="typography-body2 font-medium text-static-black">
        카카오로 시작하기
      </div>
    </button>
  );
};

export default KakaoLogin;

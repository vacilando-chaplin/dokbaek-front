"use client";

import {
  getUser,
  kakaoAuthLogin,
  naverAuthLogin,
  googleAuthLogin,
  postSignUp
} from "@/app/api/route";
import { defaultId, loginForm } from "@/data/atom";
import { KakaoDataType, NaverDataType, GoogleDataType } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSetToken } from "@/hooks/hooks";
import { v4 as uuidv4 } from 'uuid';

const Callback = () => {
  const router = useRouter();

  const [userId, setUserId] = useRecoilState(defaultId);
  const [form, setForm] = useRecoilState(loginForm);

  const [naverToken, setNaverToken] = useState<NaverDataType>();
  const [kakaoToken, setKakaoToken] = useState<KakaoDataType>();
  const [googleToken, setGoogleToken] = useState<GoogleDataType>();
  
  const generateDeviceId = (): string => {
    return uuidv4()
  }
  
  const deviceId = generateDeviceId();
  
  const setDeviceIdInCookie = () => {
    if (typeof window !== "undefined") {
      const expirationDate = new Date();
      expirationDate.setFullYear(expirationDate.getFullYear() + 1); // 1년 후 만료
      const expires = `expires=${expirationDate.toUTCString()}`;
      document.cookie = `deviceId=${deviceId}; ${expires}; path=/; Secure; SameSite=Strict`;
    }
  };

  const onClick = () => {
    router.prefetch(`/profile/${userId}/create/info`);
    router.push(`/profile/${userId}/create/info`);
  };

  useEffect(() => {
    setDeviceIdInCookie();

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state?.includes("naver_login")) {
      const getNaverAccessToken = async () => {
        const res = await naverAuthLogin(code);
        setNaverToken(res);
      };
      getNaverAccessToken();
    } else if (code && state?.includes("kakao_login")) {
      const getKakaoAccessToken = async () => {
        const res = await kakaoAuthLogin(code);
        setKakaoToken(res);
      };
      getKakaoAccessToken();
    } else if (code && state?.includes("google_login")) {
      const getGoogleAccessToken = async () => {
        const res = await googleAuthLogin(code);
        setGoogleToken(res);
      };
      getGoogleAccessToken();
    }
  }, []);

  useEffect(() => {
    if (naverToken) {
      const getNaverUserData = async () => {
        const res = await postSignUp({
          domain: "NAVER",
          accessToken: naverToken.access_token,
          deviceId: deviceId
        });
        const data = await res.data;

        setUserId(data.defaultProfileId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        setForm("네이버");
      };
      getNaverUserData();
    } else if (kakaoToken) {
      const getKakaoUserData = async () => {
        const res = await postSignUp({
          domain: "KAKAO",
          accessToken: kakaoToken.access_token,
          deviceId: deviceId
        });
        const data = await res.data;

        setUserId(data.defaultProfileId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        setForm("카카오");
      };
      getKakaoUserData();
    } else if (googleToken) {
      const getGoogleUserData = async () => {
        const res = await postSignUp({
          domain: "GOOGLE",
          accessToken: googleToken.access_token,
          deviceId: deviceId
        });
        const data = await res.data;

        setUserId(data.defaultProfileId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        setForm("구글");
      };
      getGoogleUserData();
    }
  }, [naverToken, kakaoToken, googleToken]);

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col items-center gap-2">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22.2236 5.3098C22.6048 5.70945 22.5898 6.34244 22.1902 6.72362L8.86639 19.432L1.75865 11.5802C1.388 11.1708 1.41946 10.5384 1.8289 10.1677C2.23835 9.79709 2.87073 9.82854 3.24137 10.238L8.97146 16.568L20.8098 5.27638C21.2095 4.8952 21.8424 4.91016 22.2236 5.3098Z"
            fill="#01C043"
          />
        </svg>
        <div className="flex flex-col items-center text-heading3 font-semibold leading-heading3 tracking-heading3 text-content-primary-light">
          <p>{form} 계정으로</p>
          <p>회원가입이 완료되었어요.</p>
        </div>
        <label className="items-center text-body2 font-medium leading-body2 tracking-body2 text-content-secondary-light">
          이제 나만의 프로필을 만들어 보세요.
        </label>
      </div>
      <button
        type="button"
        className="flex h-auto w-auto items-center justify-center gap-2 rounded-[14px] bg-accent-primary-light px-6 py-3.5"
        onClick={onClick}
      >
        <div className="text-body2 font-medium leading-body2 tracking-body2 text-static-white">
          프로필 만들기
        </div>
      </button>
    </div>
  );
};

export default Callback;

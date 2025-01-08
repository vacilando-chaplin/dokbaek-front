"use client";

import {
  kakaoAuthLogin,
  naverAuthLogin,
  googleAuthLogin,
  appleAuthLogin,
  postSignUp
} from "@/app/api/route";
import { defaultId, loginForm } from "@/data/atom";
import {
  KakaoDataType,
  NaverDataType,
  GoogleDataType,
  AppleDataType
} from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSetToken } from "@/hooks/hooks";
import { v4 as uuidv4 } from "uuid";
import Check from "../../../../public/icons/Check.svg";

const Callback = () => {
  const router = useRouter();

  const [userId, setUserId] = useRecoilState(defaultId);
  const [form, setForm] = useRecoilState(loginForm);

  const [naverToken, setNaverToken] = useState<NaverDataType>();
  const [kakaoToken, setKakaoToken] = useState<KakaoDataType>();
  const [googleToken, setGoogleToken] = useState<GoogleDataType>();
  const [appleToken, setAppleToken] = useState<AppleDataType>();

  const generateDeviceId = (): string => {
    return uuidv4();
  };

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
    } else if (code && state?.includes("apple_login")) {
      const getAppleAccessToken = async () => {
        const res = await appleAuthLogin(code, generateAppleClientSecret());
        setAppleToken(res);
      };
      getAppleAccessToken();
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
    } else if (appleToken) {
      const getAppleUserData = async () => {
        const res = await postSignUp({
          domain: "APPLE",
          accessToken: appleToken.access_token,
          deviceId: deviceId
        });
        const data = await res.data;

        setUserId(data.defaultProfileId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        setForm("애플");
      };
      getAppleUserData();
    }
  }, [naverToken, kakaoToken, appleToken]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <Check width="40" height="40" fill="#01C043" />
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
        className="hover:bg-hover-primary active:bg-pressed-primary flex h-auto w-[134px] items-center justify-center gap-2 rounded-[14px] bg-accent-primary-light px-6 py-3.5 transition-all duration-100 ease-linear"
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

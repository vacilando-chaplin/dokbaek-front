"use client";

import { defaultId } from "@/lib/atoms";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { useSetToken } from "@/lib/hooks";
import { v4 as uuidv4 } from "uuid";
import Check from "../../../../public/icons/Check.svg";
import { GoogleDataType, KakaoDataType } from "./types";
import {
  googleAuthLogin,
  kakaoAuthLogin,
  postNaverCode,
  postSignUp
} from "./api";

const Callback = () => {
  const router = useRouter();

  const [userId, setUserId] = useRecoilState(defaultId);
  const [form, setForm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);

  const [kakaoToken, setKakaoToken] = useState<KakaoDataType>();
  const [googleToken, setGoogleToken] = useState<GoogleDataType>();

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

    if (code && state === "naver") {
      const getNaverLoginToken = async () => {
        const res = await postNaverCode(code);
        const data = res.data;
        setUserId(data.defaultProfileId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        useSetToken("login_form", "네이버");
        setForm("네이버");
      };
      getNaverLoginToken();
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
    if (kakaoToken) {
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
        useSetToken("login_form", "카카오");
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
        useSetToken("login_form", "구글");
        setForm("구글");
      };
      getGoogleUserData();
    }
    setIsLoaded(true);
  }, [kakaoToken, googleToken]);

  useEffect(() => {
    console.log(form);
  }, [form]);

  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-2">
        <Check width="40" height="40" fill="#01C043" />
        <div className="typography-heading3 flex flex-col items-center font-semibold text-content-primary-light">
          <p>{isLoaded && form} 계정으로</p>
          <p>회원가입이 완료되었어요.</p>
        </div>
        <label className="typography-body2 items-center font-medium text-content-secondary-light">
          이제 나만의 프로필을 만들어 보세요.
        </label>
      </div>
      <button
        type="button"
        className="interaction-default flex h-auto w-[134px] items-center justify-center gap-2 rounded-[14px] bg-accent-primary-light px-6 py-3.5 hover:bg-hover-primary active:bg-pressed-primary"
        onClick={onClick}
      >
        <div className="typography-body2 font-medium text-static-white">
          프로필 만들기
        </div>
      </button>
    </div>
  );
};

export default Callback;

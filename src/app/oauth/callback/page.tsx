"use client";

import { currentPath, defaultId } from "@/lib/atoms";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useSetToken } from "@/lib/hooks";
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

  const urlParams = useSearchParams();
  const isNewUser = urlParams.get("isNewUser");

  const currentPathName = useRecoilValue(currentPath);
  const [userId, setUserId] = useRecoilState(defaultId);

  const [form, setForm] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [signState, setSignState] = useState("");

  const [kakaoToken, setKakaoToken] = useState<KakaoDataType>();
  const [googleToken, setGoogleToken] = useState<GoogleDataType>();

  const onClick = () => {
    router.prefetch(`/profile/${userId}/create/info`);
    router.push(`/profile/${userId}/create/info`);
  };

  useEffect(() => {
    const code = urlParams.get("code");
    const state = urlParams.get("state");

    if (code && state === "naver") {
      const getNaverLoginToken = async () => {
        const res = await postNaverCode(code);
        const data = res.data;
        setUserId(data.userId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        useSetToken("login_form", "네이버");
        setForm("네이버");
        if (isNewUser === "false") {
          router.push(`${currentPathName}`);
        }
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
  }, [urlParams]);

  useEffect(() => {
    if (kakaoToken) {
      const getKakaoUserData = async () => {
        const res: any = await postSignUp({
          domain: "KAKAO",
          accessToken: kakaoToken.access_token
        });
        const data = res.resData;

        setUserId(data.data.userId);
        useSetToken("jwt", data.data.token.jwt);
        useSetToken("refresh_token", data.data.token.refreshToken);
        useSetToken("login_form", "카카오");
        setForm("카카오");

        if (data.code === 200) {
          router.push(`${currentPathName}`);
        } else if (data.code === 201) {
          setSignState("signup");
        }
      };
      getKakaoUserData();
    } else if (googleToken) {
      const getGoogleUserData = async () => {
        const res: any = await postSignUp({
          domain: "GOOGLE",
          accessToken: googleToken.access_token
        });
        const data = await res.resData;

        setUserId(data.data.userId);
        useSetToken("jwt", data.data.token.jwt);
        useSetToken("refresh_token", data.data.token.refreshToken);
        useSetToken("login_form", "구글");
        setForm("구글");

        if (data.code === 200) {
          router.push(`${currentPathName}`);
        } else if (data.code === 201) {
          setSignState("signup");
        }
      };
      getGoogleUserData();
    }
    if (isNewUser === "false") {
      router.push(`${currentPathName}`);
    }
    setIsLoaded(true);
  }, [kakaoToken, googleToken]);

  useEffect(() => {}, [form]);

  return (
    <>
      {isNewUser === "true" || signState === "signup" ? (
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center gap-2">
            <Check width="40" height="40" fill="#01C043" />
            <div className="typography-heading3 flex flex-col items-center font-semibold text-content-primary-light dark:text-content-primary-dark">
              <p>{isLoaded && form} 계정으로</p>
              <p>회원가입이 완료되었어요.</p>
            </div>
            <label className="typography-body2 items-center font-medium text-content-secondary-light dark:text-content-secondary-dark">
              이제 나만의 프로필을 만들어 보세요.
            </label>
          </div>
          <button
            type="button"
            className="interaction-default flex h-auto w-[134px] items-center justify-center gap-2 rounded-[14px] bg-accent-primary-light px-6 py-3.5 hover:brightness-[93%] active:brightness-[86%] dark:bg-accent-primary-dark"
            onClick={onClick}
          >
            <div className="typography-body2 font-medium text-static-white">
              프로필 만들기
            </div>
          </button>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Callback;

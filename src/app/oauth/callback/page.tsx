"use client";

import { currentPath, defaultId } from "@/lib/atoms";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSetToken } from "@/lib/hooks";
import { postOauthSignIn } from "./api";

const Callback = () => {
  const router = useRouter();

  const urlParams = useSearchParams();

  const currentPathName = useRecoilValue(currentPath);
  const setUserId = useSetRecoilState(defaultId);

  useEffect(() => {
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const isNewUser = urlParams.get("isNewUser");
    const errorCode = urlParams.get("errorCode");

    const getOauthLoginToken = async (loginForm: string) => {
      if (isNewUser === "true" && state) {
        useSetToken("login_form", loginForm);
        router.push(`/oauth/terms?code=${code}&state=${state}`);
      } else if (isNewUser === "false" && state) {
        const res = await postOauthSignIn({
          domain: state.toUpperCase(),
          tempCode: code
        });
        const data = res.data;

        setUserId(data.userId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        useSetToken("login_form", loginForm);

        router.push(`${currentPathName}`);
      }
    };

    if (errorCode) {
      router.replace(`/oauth/error?errorCode=${errorCode}`);
      return;
    }

    if (code && state === "kakao") {
      getOauthLoginToken("카카오");
    } else if (code && state === "naver") {
      getOauthLoginToken("네이버");
    } else if (code && state === "google") {
      getOauthLoginToken("구글");
    }
  }, [urlParams]);
};

export default Callback;

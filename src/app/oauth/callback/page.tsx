"use client";

import {
  currentPath,
  defaultId,
  loginErrorState,
  toastMessage
} from "@/lib/atoms";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  useSetLoginForm,
  useSetLoginProfileId,
  useSetToken
} from "@/lib/hooks";
import { postOauthSignIn } from "./api";
import { getProfileMe } from "@/lib/api";
import { loginErrorMessages } from "@/lib/data";

const Callback = () => {
  const router = useRouter();

  const urlParams = useSearchParams();

  const currentPathName = useRecoilValue(currentPath);
  const setUserId = useSetRecoilState(defaultId);
  const setToastMessage = useSetRecoilState(toastMessage);
  const setLoginErrorState = useSetRecoilState(loginErrorState);

  useEffect(() => {
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const isNewUser = urlParams.get("isNewUser");
    const errorCode = urlParams.get("errorCode");

    const getOauthLoginToken = async () => {
      if (isNewUser === "true" && state) {
        router.replace(`/oauth/terms?code=${code}&state=${state}`);
      } else if (isNewUser === "false" && state) {
        const res = await postOauthSignIn({
          domain: state.toUpperCase(),
          tempCode: code
        });
        const data = res.data;

        const profileRes = await getProfileMe();
        const loginProfileId = profileRes.data.id;
        useSetLoginProfileId("loginProfileId", String(loginProfileId));

        setUserId(data.userId);
        useSetToken("jwt", data.token.jwt);
        useSetToken("refresh_token", data.token.refreshToken);
        useSetLoginForm("login_form", state);

        router.replace(`${currentPathName}`);
      }
    };

    if (errorCode) {
      const errorMessage = loginErrorMessages[errorCode].message;
      setToastMessage(errorMessage);
      setLoginErrorState(true);

      router.replace("/");

      return;
    }

    if (code && state) {
      getOauthLoginToken();
    }
  }, [urlParams]);
};

export default Callback;

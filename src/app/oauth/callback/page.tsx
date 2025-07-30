"use client";

import { currentPath, loginErrorState, toastMessage } from "@/lib/atoms";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { postOauthSignIn } from "./api";
import { loginErrorMessages } from "@/lib/data";
import { useMutation } from "@tanstack/react-query";
import { OAuthMutationParams, OAuthMutationResult } from "./types";
import { routePaths } from "@/constants/routes";
import { setLoginForm, setToken } from "@/lib/utils";

const Callback = () => {
  const router = useRouter();

  const urlParams = useSearchParams();

  const currentPathName = useRecoilValue(currentPath);
  const setToastMessage = useSetRecoilState(toastMessage);
  const setLoginErrorState = useSetRecoilState(loginErrorState);

  const onOauthMutation = useMutation<
    OAuthMutationResult,
    Error,
    OAuthMutationParams
  >({
    mutationFn: async ({ domain, tempCode, state }) => {
      const res = await postOauthSignIn({ domain, tempCode });
      const data = res.data;

      return {
        token: data.token,
        state: state
      };
    },
    onSuccess: (data) => {
      setToken("jwt", data.token.jwt);
      setToken("refresh_token", data.token.refreshToken);
      setLoginForm("login_form", data.state);

      router.replace(`${currentPathName}`);
    },
    onError: () => {
      setLoginErrorState(true);
      setToastMessage(
        "로그인 과정에서 문제가 생겼어요. 잠시 후 다시 시도해 주세요."
      );

      router.replace(routePaths.home());
    }
  });

  useEffect(() => {
    const code = urlParams.get("code");
    const state = urlParams.get("state");
    const isNewUser = urlParams.get("isNewUser");
    const errorCode = urlParams.get("errorCode");

    if (errorCode) {
      const errorMessage =
        loginErrorMessages[errorCode]?.message ||
        "알 수 없는 오류가 발생했습니다.";
      setToastMessage(errorMessage);
      setLoginErrorState(true);

      router.replace(routePaths.home());

      return;
    }

    if (code && state) {
      if (isNewUser === "true") {
        router.replace(`/oauth/terms?code=${code}&state=${state}`);
      } else if (isNewUser === "false") {
        onOauthMutation.mutate({
          domain: state.toUpperCase(),
          tempCode: code,
          state: state
        });
      }
    }
  }, [urlParams]);
};

export default Callback;

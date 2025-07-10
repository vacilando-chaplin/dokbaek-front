"use client";

import { TermAgreementsType } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { loginErrorState, toastMessage } from "@/lib/atoms";
import { useSetRecoilState } from "recoil";
import {
  useSetLoginForm,
  useSetLoginProfileId,
  useSetToken
} from "@/lib/hooks";
import { postOauthSignUp } from "../../callback/api";
import { getProfileMe } from "@/lib/api";
import BoxButton from "@/components/atoms/boxButton";
import { viewedProfileId } from "@/lib/recoil/profile/common/atom";
import { useMutation } from "@tanstack/react-query";
import { TermsMutationParams, TermsMutationResult } from "../type";

interface TermAgreementButtonProps {
  termAgreements: TermAgreementsType[];
  isAllRequiredTermsAgreed: boolean;
}

const TermAgreementButton = ({
  termAgreements,
  isAllRequiredTermsAgreed
}: TermAgreementButtonProps) => {
  const router = useRouter();
  const urlParams = useSearchParams();
  const code = urlParams.get("code");
  const state = urlParams.get("state");

  const setViewProfileId = useSetRecoilState(viewedProfileId);
  const setToastMessage = useSetRecoilState(toastMessage);
  const setLoginErrorState = useSetRecoilState(loginErrorState);

  const onMutateAgreement = useMutation<
    TermsMutationResult,
    Error,
    TermsMutationParams
  >({
    mutationFn: async ({ state, domain, tempCode, termAgreements }) => {
      const res = await postOauthSignUp({
        domain: domain,
        tempCode: tempCode,
        termAgreements: termAgreements
      });
      const data = res.data;

      useSetToken("jwt", data.token.jwt);
      useSetToken("refresh_token", data.token.refreshToken);

      const profileRes = await getProfileMe();

      return {
        profileId: profileRes.data.id,
        state: state
      };
    },
    onSuccess: (data) => {
      const loginProfileId = data.profileId;

      setViewProfileId(Number(loginProfileId));
      useSetLoginProfileId("loginProfileId", String(loginProfileId));
      useSetLoginForm("login_form", data.state);

      router.replace(`/profile/${loginProfileId}`);
    },
    onError: () => {
      setLoginErrorState(true);
      setToastMessage(
        "회원가입 과정에서 문제가 생겼어요. 잠시 후 다시 시도해 주세요."
      );

      router.replace("/");
    }
  });

  const onTermAgreement = () => {
    if (code && state) {
      onMutateAgreement.mutate({
        state: state,
        domain: state.toUpperCase(),
        tempCode: code,
        termAgreements: termAgreements
      });
    }
  };

  return (
    <BoxButton
      type="primary"
      size="medium"
      width="full"
      onClick={onTermAgreement}
      disabled={!code || !state || !isAllRequiredTermsAgreed}
    >
      회원 가입
    </BoxButton>
  );
};

export default TermAgreementButton;

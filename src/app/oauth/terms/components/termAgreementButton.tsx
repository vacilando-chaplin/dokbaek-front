"use client";

import { TermAgreementsType } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";
import { defaultId } from "@/lib/atoms";
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

  const setUserId = useSetRecoilState(defaultId);
  const setViewProfileId = useSetRecoilState(viewedProfileId);

  const onTermAgreement = async () => {
    if (code && state) {
      const res = await postOauthSignUp({
        domain: state.toUpperCase(),
        tempCode: code,
        termAgreements: termAgreements
      });
      const data = res.data;

      const profileRes = await getProfileMe();
      const loginProfileId = profileRes.data.id;
      useSetLoginProfileId("loginProfileId", String(loginProfileId));
      setViewProfileId(loginProfileId);

      setUserId(data.userId);
      useSetToken("jwt", data.token.jwt);
      useSetToken("refresh_token", data.token.refreshToken);
      useSetLoginForm("login_form", state);

      router.replace(`/profile/${loginProfileId}`);
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

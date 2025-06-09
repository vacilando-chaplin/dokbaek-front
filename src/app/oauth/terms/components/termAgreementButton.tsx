"use client";

import { TermAgreementsType } from "@/lib/types";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { currentPath, defaultId } from "@/lib/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSetToken } from "@/lib/hooks";
import { postOauthSignUp } from "../../callback/api";
import { getProfileMe } from "@/lib/api";
import BoxButton from "@/components/atoms/boxButton";

const TermAgreementButton = () => {
  const router = useRouter();
  const urlParams = useSearchParams();
  const code = urlParams.get("code");
  const state = urlParams.get("state");

  const currentPathName = useRecoilValue(currentPath);
  const setUserId = useSetRecoilState(defaultId);

  const [termAgreements, setTermAgreements] = useState<TermAgreementsType[]>([
    { termId: 1, agreement: true }
  ]);

  const onTermAgreement = async () => {
    if (code && state) {
      const res = await postOauthSignUp({
        domain: state.toUpperCase(),
        tempCode: code,
        termAgreements: termAgreements
      });
      const data = res.data;

      const getProfileId = async () => {
        const res = await getProfileMe();
        const data = res.data;
        useSetToken("loginProfileId", data.id);
      };
      getProfileId();

      setUserId(data.userId);
      useSetToken("jwt", data.token.jwt);
      useSetToken("refresh_token", data.token.refreshToken);
    }

    router.push(`${currentPathName}`);
  };

  return (
    <BoxButton
      type="primary"
      size="medium"
      onClick={onTermAgreement}
      disabled={!code || !state}
    >
      약관 동의
    </BoxButton>
  );
};

export default TermAgreementButton;

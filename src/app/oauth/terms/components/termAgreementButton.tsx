"use client";

import { TermAgreementsType } from "@/lib/types";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { currentPath, defaultId } from "@/lib/atoms";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSetToken } from "@/lib/hooks";
import { postOauthSignUp } from "../../callback/api";

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

      setUserId(data.userId);
      useSetToken("jwt", data.token.jwt);
      useSetToken("refresh_token", data.token.refreshToken);
    }

    router.push(`${currentPathName}`);
  };

  return (
    <button type="button" onClick={onTermAgreement} disabled={!code || !state}>
      약관 동의
    </button>
  );
};

export default TermAgreementButton;

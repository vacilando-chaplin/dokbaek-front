"use client";

import AccountContainer from "./accountContainer";
import AccountMenuItem from "./accountMenuItem";
import { TermsDataType } from "@/lib/types";

interface AccountPolicies {
  policies: TermsDataType[];
}

const AccountPolicies = ({ policies }: AccountPolicies) => {
  const termsOfService = policies.find((policy) =>
    policy.name.includes("개인정보처리방침")
  );
  const privacyPolicy = policies.find((policy) =>
    policy.name.includes("서비스이용약관")
  );

  return (
    <AccountContainer type="main">
      <span className="typography-body3 pl-4 font-semibold text-content-primary-light dark:text-content-primary-dark">
        법적 정보
      </span>
      <div className="h-auto w-full">
        <AccountMenuItem
          text="이용약관"
          icon
          onClick={() => window.open(privacyPolicy?.url, "_blank")}
        />
        <AccountMenuItem
          text="개인정보 처리방침"
          icon
          onClick={() => window.open(termsOfService?.url, "_blank")}
        />
      </div>
    </AccountContainer>
  );
};

export default AccountPolicies;

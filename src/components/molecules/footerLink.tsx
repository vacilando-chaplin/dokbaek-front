"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getTerms } from "@/lib/api";
import { TermsDataType } from "@/lib/types";

const FooterLink = () => {
  const businessInfo = `https://www.ftc.go.kr/bizCommPop.do?wrkr_no=${process.env.NEXT_PUBLIC_BUSINESS_REG_NO}`;
  const [termsServices, setTermsServices] = useState("");
  const [privacyPolicy, setPrivacyPolicy] = useState("");

  useEffect(() => {
    const abc = async () => {
      const res = await getTerms();
      const terms = res.data.terms;

      const findTermsServices = terms.find(
        (term: TermsDataType) => term.name === "서비스이용약관"
      )?.url;
      const findPrivacyPolicy = terms.find(
        (term: TermsDataType) => term.name === "개인정보처리방침"
      )?.url;

      setTermsServices(findTermsServices);
      setPrivacyPolicy(findPrivacyPolicy);
    };
    abc();
  }, []);

  return (
    <div>
      <ul className="flex">
        <li>
          <Link
            href={businessInfo}
            target="_blank"
            className="typography-caption1 font-medium text-content-tertiary-light dark:text-content-tertiary-dark"
          >
            사업자정보 확인
          </Link>
        </li>
        <div className="mx-1 text-gray-400">·</div>
        <li>
          <Link
            href={termsServices}
            target="_blank"
            className="typography-caption1 font-medium text-content-tertiary-light dark:text-content-tertiary-dark"
          >
            서비스 이용약관
          </Link>
        </li>
        <div className="mx-1 text-gray-400">·</div>
        <li>
          <Link
            href={privacyPolicy}
            target="_blank"
            className="typography-caption1 font-medium text-content-primary-light dark:text-content-primary-dark"
          >
            개인정보 처리방침
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterLink;

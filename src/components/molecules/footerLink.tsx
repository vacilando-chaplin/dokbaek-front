import React from "react";
import Link from "next/link";

const FooterLink = () => {
  const businessInfo = "/business-info";
  const termsServices = "/terms-services";
  const privacyPolicy = "/privacy-policy";
  return (
    <div>
      <ul className="flex">
        <li>
          <Link
            href={businessInfo}
            className="text-caption1 font-regular text-gray-500"
          >
            사업자정보 확인
          </Link>
          p
        </li>
        <div className="mx-1 text-gray-400">·</div>
        <li>
          <Link
            href={termsServices}
            className="text-caption1 font-regular text-gray-500"
          >
            서비스 이용약관
          </Link>
        </li>
        <div className="mx-1 text-gray-400">·</div>
        <li>
          <Link
            href={privacyPolicy}
            className="text-caption1 font-medium text-static-black"
          >
            개인정보 처리방침
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default FooterLink;

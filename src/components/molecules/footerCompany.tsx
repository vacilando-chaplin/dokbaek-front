import React from "react";

const FooterCompany = () => {
  return (
    <div className="flex h-auto w-full max-w-[1272px] flex-col gap-2">
      <p className="typography-body2 flex font-semibold text-content-tertiary-light dark:text-content-tertiary-dark">
        {process.env.NEXT_PUBLIC_COMPANY_NAME}
      </p>
      <p className="typography-caption1 font-regular text-content-tertiary-light dark:text-content-tertiary-dark">
        대표: {process.env.NEXT_PUBLIC_REPRESENTATIVE_NAME} | 사업자등록번호:{" "}
        {process.env.NEXT_PUBLIC_BUSINESS_NO}
        <br />
        {process.env.NEXT_PUBLIC_BUSINESS_ADDRESS}
      </p>
    </div>
  );
};

export default FooterCompany;

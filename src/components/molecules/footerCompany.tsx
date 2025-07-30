import React from "react";

const FooterCompany = () => {
  return (
    <div>
      <p className="typography-body2 mb-2 font-semibold text-content-tertiary-light dark:text-content-tertiary-dark">
        {process.env.NEXT_PUBLIC_COMPANY_NAME}
      </p>
      <p className="typography-caption1 font-regular text-content-tertiary-light dark:text-content-tertiary-dark">
        대표: {process.env.NEXT_PUBLIC_REPRESENTATIVE_NAME} | 사업자 등록번호:
        {process.env.NEXT_PUBLIC_BUSINESS_NO}
        <br />
        {process.env.NEXT_PUBLIC_BUSINESS_ADDRESS}
      </p>
    </div>
  );
};

export default FooterCompany;

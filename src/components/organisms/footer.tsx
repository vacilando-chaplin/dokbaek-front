"use client";

import FooterCompany from "../molecules/footerCompany";
import FooterLink from "../molecules/footerLink";
import FooterCopyright from "../molecules/footerCopyright";

const Footer = () => {
  return (
    <div className="mt-16 flex w-[100%] justify-center bg-background-base-light">
      <div
        className="container-max w-[90%] items-center sm:w-[90%] md:w-[85%] lg:w-[70%]"
        style={{ margin: "50px auto" }}
      >
        <FooterCompany />
        <div className="mt-5">
          <FooterLink />
        </div>
        <div className="mt-5">
          <FooterCopyright />
        </div>
      </div>
    </div>
  );
};

export default Footer;

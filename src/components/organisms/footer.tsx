"use client";

import FooterCompany from "../molecules/footerCompany";
import FooterLink from "../molecules/footerLink";
import FooterCopyright from "../molecules/footerCopyright";

const Footer = () => {
  return (
    <div className="mt-16 flex flex-col bg-background-base-light py-[80px] sm:w-full">
      <section className="mx-[auto] w-[100%] max-w-[1000px]">
        <FooterCompany />
        <div className="mt-5">
          <FooterLink />
        </div>
        <div className="mt-5">
          <FooterCopyright />
        </div>
      </section>
    </div>
  );
};

export default Footer;

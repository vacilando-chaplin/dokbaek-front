"use client";

import FooterCompany from "../molecules/footerCompany";
import FooterLink from "../molecules/footerLink";
import FooterCopyright from "../molecules/footerCopyright";

const Footer = () => {
  return (
    <section className="fixed bottom-0 z-50 w-full bg-background-base-light py-[80px] px-[220px]">
      <FooterCompany />
      <div className="mt-5">
        <FooterLink />
      </div>
      <div className="mt-5">
        <FooterCopyright />
      </div>
    </section>
  );
};

export default Footer;

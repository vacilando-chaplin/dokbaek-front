"use client";

import FooterCompany from "../molecules/footerCompany";
import FooterLink from "../molecules/footerLink";
import FooterCopyright from "../molecules/footerCopyright";

const Footer = () => {
  return (
    <div className="mt-16 flex w-full flex-col items-center bg-background-base-light py-[80px]">
      <div className="w-[100%] sm:w-[100%] md:w-[85%] lg:w-[80%]">
        <section className="container-max">
          <FooterCompany />
          <div className="mt-5">
            <FooterLink />
          </div>
          <div className="mt-5">
            <FooterCopyright />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Footer;

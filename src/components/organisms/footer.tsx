"use client";

import FooterCompany from "../molecules/footerCompany";
import FooterLink from "../molecules/footerLink";
import FooterCopyright from "../molecules/footerCopyright";

const Footer = () => {
  return (
    <div className="mt-16 flex w-full flex-col items-center bg-background-base-light py-[80px]">
      <div className="w-[90%] sm:w-[90%] md:w-[85%] lg:w-[70%]">
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
    </div>
  );
};

export default Footer;

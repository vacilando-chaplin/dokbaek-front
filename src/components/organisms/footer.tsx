"use client";

import FooterCompany from "../molecules/footerCompany";
import FooterLink from "../molecules/footerLink";
import FooterCopyright from "../molecules/footerCopyright";

const Footer = () => {
  return (
    <footer className="flex h-auto w-full gap-2.5 pt-16">
      <div className="flex h-auto w-full bg-background-base-light py-20 dark:bg-background-base-dark">
        <div className="container-max m-[auto] flex w-[90%] flex-col items-center gap-5 sm:w-[90%] md:w-[85%] lg:w-[70%]">
          <FooterCompany />
          <FooterLink />
          <FooterCopyright />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

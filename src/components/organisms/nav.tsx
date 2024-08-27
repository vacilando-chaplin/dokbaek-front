"use client";

import { navList } from "@/data/data";
import Logo from "../atoms/logo";
import TextLink from "../atoms/textLink";

const Nav = () => {
  const navLinks = navList;

  return (
    <section className="flex h-12 w-full items-center bg-background-elevated-light p-6 shadow-header">
      <nav className="flex w-full items-center justify-between">
        <Logo name={navLinks[0].name} href={navLinks[0].href} />
        <TextLink name={navLinks[1].name} href={navLinks[1].href} />
      </nav>
    </section>
  );
};

export default Nav;

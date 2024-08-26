"use client";

import Logo from "../atoms/logo";
import TextLink from "../atoms/textLink";

const Nav = () => {
  const navLinks = [
    { name: "로고", href: "/home" },
    { name: "로그아웃", href: "/login" }
  ];

  return (
    <section className="flex h-12 w-full flex-row items-center bg-background-elevated-light p-6 shadow-header">
      <nav className="flex">
        <ul className="flex justify-between">
          <li className="list-none">
            <Logo name={navLinks[0].name} href={navLinks[0].href} />
          </li>
          <li className="list-none">
            <TextLink name={navLinks[1].name} href={navLinks[1].href} />
          </li>
        </ul>
      </nav>
    </section>
  );
};

export default Nav;

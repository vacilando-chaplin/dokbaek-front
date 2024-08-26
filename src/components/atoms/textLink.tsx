"use client";

import Link from "next/link";

interface TextLinkProps {
  name: string;
  href: string;
}

const TextLink = ({ name, href }: TextLinkProps) => {
  return (
    <Link
      href={href}
      scroll={false}
      className="text-caption1 font-medium leading-caption1 -tracking-caption1 text-content-tertiary-light"
    >
      {name}
    </Link>
  );
};

export default TextLink;

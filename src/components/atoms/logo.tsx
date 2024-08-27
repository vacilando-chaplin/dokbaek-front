"use client";

import Image from "next/image";
import LogoHorizontal from "../../../public/icons/LogoHorizontal.svg";
import Link from "next/link";

interface LogoProps {
  name: string;
  href: string;
}

const Logo = ({ name, href }: LogoProps) => {
  return (
    <Link href={href}>
      <Image src={LogoHorizontal} alt={name} />
    </Link>
  );
};

export default Logo;

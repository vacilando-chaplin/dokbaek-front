import LogoHorizontal from "../../../public/icons/LogoHorizontal.svg";
import Link from "next/link";

interface LogoProps {
  href: string;
}

const Logo = ({ href }: LogoProps) => {
  return (
    <Link href={href} className="outline-none">
      <LogoHorizontal width="96" height="20" />
    </Link>
  );
};

export default Logo;

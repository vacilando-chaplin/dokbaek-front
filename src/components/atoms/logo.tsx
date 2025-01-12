import LogoHorizontal from "../../../public/icons/LogoHorizontal.svg";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/landing" className="outline-none">
      <LogoHorizontal width="96" height="20" />
    </Link>
  );
};

export default Logo;

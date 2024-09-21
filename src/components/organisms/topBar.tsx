import { topBarList } from "@/data/data";
import Logo from "../atoms/logo";
import TextLink from "../atoms/textLink";

const TopBar = () => {
  const topBarLinks = topBarList;

  return (
    <section className="fixed top-0 z-50 flex h-12 w-full items-center bg-background-elevated-light px-6 shadow-header">
      <nav className="flex w-full items-center justify-between">
        <Logo name={topBarLinks[0].name} href={topBarLinks[0].href} />
        <TextLink name={topBarLinks[1].name} href={topBarLinks[1].href} />
      </nav>
    </section>
  );
};

export default TopBar;

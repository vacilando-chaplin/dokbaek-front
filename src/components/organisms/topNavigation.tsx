import dynamic from "next/dynamic";

const TopNavigationClient = dynamic(() => import("./topNavigationClient"), {
  ssr: false
});

const TopNavigation = () => {
  return <TopNavigationClient />;
};

export default TopNavigation;

"use client";

import Toast from "@/components/atoms/toast";
import TopNavigation from "@/components/organisms/topNavigation";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light dark:bg-background-base-dark">
      <Toast kind="info" fullWidth={false} placement="top" />
      <TopNavigation />
      {children}
    </div>
  );
};

export default Layout;

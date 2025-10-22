import Toast from "@/components/atoms/toast";
import TopNavigation from "@/components/organisms/topNavigation";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-base-light dark:bg-background-base-dark">
      <Toast kind="info" fullWidth={false} placement="top" />
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
      {children}
    </div>
  );
};

export default Layout;

import Footer from "@/components/organisms/footer";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const TopNavigation = dynamic(
    () => import("@/components/organisms/topNavigation"),
    {
      ssr: false
    }
  );

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <Suspense fallback={<></>}>
        <TopNavigation />
      </Suspense>
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

import Footer from "@/components/organisms/footer";
import TopNavigation from "@/components/organisms/topNavigation";
import { Suspense } from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
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

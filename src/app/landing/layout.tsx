import Footer from "@/components/organisms/footer";
import ToastClientWrapper from "./components/toastClientWrapper";
import dynamic from "next/dynamic";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const TopNavigation = dynamic(
    () => import("@/components/organisms/topNavigation"),
    {
      ssr: false
    }
  );

  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <ToastClientWrapper />
      <TopNavigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

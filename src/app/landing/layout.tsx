import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";
import ToastClientWrapper from "./components/toastClientWrapper";

const Layout = ({ children }: { children: React.ReactNode }) => {
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

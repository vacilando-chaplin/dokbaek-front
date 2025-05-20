import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";
import Toast from "@/components/atoms/toast";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-surface-light dark:bg-background-surface-dark">
      <Toast fullWidth={false} placement="top" />
      <TopNavigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

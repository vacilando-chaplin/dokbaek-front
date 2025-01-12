import TopNavigation from "@/components/organisms/topNavigation";
import Footer from "@/components/organisms/footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center">
      <TopNavigation />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

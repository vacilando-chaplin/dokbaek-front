import TopBar from "@/components/organisms/topBar";
import Footer from "@/components/organisms/footer"

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex min-h-dvh w-full flex-col items-center bg-background-elevated-light">
      <TopBar />      
      {children}
      <Footer />
    </div>
  );
};

export default Layout;

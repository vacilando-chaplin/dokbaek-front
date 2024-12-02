import TopBar from "@/components/organisms/topBar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center bg-background-base-light">
      <TopBar />
      {children}
    </div>
  );
};

export default Layout;

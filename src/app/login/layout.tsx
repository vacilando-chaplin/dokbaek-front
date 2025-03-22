const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center bg-background-base-light dark:bg-background-base-dark">
      {children}
    </div>
  );
};

export default Layout;

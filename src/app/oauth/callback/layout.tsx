const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-dvh w-full flex-col items-center justify-center bg-background-base-light">
      {children}
    </main>
  );
};

export default Layout;

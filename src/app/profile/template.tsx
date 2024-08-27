const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-dvh w-full items-start justify-center bg-background-base-light">
      {children}
    </main>
  );
};

export default Template;

const Template = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-dvh w-full items-start justify-center bg-background-base-light">
      {children}
    </div>
  );
};

export default Template;

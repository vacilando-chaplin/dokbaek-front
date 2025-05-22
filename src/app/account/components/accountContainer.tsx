interface AccountContainerProps {
  type: string;
  children: React.ReactNode;
}

const AccountContainer = ({ type, children }: AccountContainerProps) => {
  return (
    <div
      className={`flex h-auto min-w-[560px] max-w-[560px] flex-col gap-2 rounded-2xl border border-border-default-light bg-background-surface-light dark:border-border-default-dark dark:bg-background-base-dark ${type === "main" ? "px-2 pb-2 pt-5" : "p-2"}`}
    >
      {children}
    </div>
  );
};

export default AccountContainer;

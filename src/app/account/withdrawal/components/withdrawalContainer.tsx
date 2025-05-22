interface WithdrawalContainerProps {
  title: string;
  children: React.ReactNode;
}

const WithdrawalContainer = ({ title, children }: WithdrawalContainerProps) => {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="typography-heading3 flex items-center font-semibold text-content-primary-light dark:text-content-primary-dark">
        {title}
      </h1>
      <div className="flex h-auto w-full flex-col gap-4 rounded-2xl border border-border-default-light bg-background-surface-light p-6 dark:border-border-default-dark dark:bg-background-surface-dark">
        {children}
      </div>
    </div>
  );
};

export default WithdrawalContainer;

interface FilterBoxProps {
  children: React.ReactNode;
}

const FilterBox = ({ children }: FilterBoxProps) => {
  return (
    <div className="flex w-full flex-col gap-2 border-b border-border-default-light px-5 pb-4 dark:border-border-default-dark">
      <div className="flex w-full flex-col gap-4">{children}</div>
    </div>
  );
};

export default FilterBox;

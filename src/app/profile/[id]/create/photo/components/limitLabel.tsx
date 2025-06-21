interface LimitLabelProps {
  value: number | undefined;
  limit: number;
}

const LimitLabel = ({ value, limit }: LimitLabelProps) => {
  return (
    <div className="typography-caption1 flex h-fit w-fit flex-row gap-0.5 rounded-[100px] bg-gray-100 px-2 py-[1px] font-medium">
      <label className="text-accent-primary-light dark:text-accent-primary-dark">
        {value}
      </label>
      <label> / </label>
      <label className="text-content-tertiary-light dark:text-content-tertiary-dark">
        {limit}
      </label>
    </div>
  );
};

export default LimitLabel;

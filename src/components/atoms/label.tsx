interface LabelProps {
  label: string;
  required?: boolean;
}

const Label = ({ label, required }: LabelProps) => {
  return (
    <label className="typography-body3 flex h-auto w-full flex-row gap-0.5 pb-2 text-center font-medium text-content-secondary-light dark:text-content-secondary-dark">
      {label}
      {required && (
        <label className="text-state-negative-light dark:text-state-negative-dark">
          *
        </label>
      )}
    </label>
  );
};

export default Label;

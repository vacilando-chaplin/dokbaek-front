interface LabelProps {
  label: string;
  required?: boolean;
}

const Label = ({ label, required }: LabelProps) => {
  return (
    <label className="typography-body3 flex h-auto w-full flex-row gap-0.5 pb-2 text-center font-medium text-content-secondary-light">
      {label}
      {required && <label className="text-state-negative-light">*</label>}
    </label>
  );
};

export default Label;

interface LabelProps {
  name: string;
  required?: boolean;
}

const Label = ({ name, required }: LabelProps) => {
  return (
    <label className="flex h-auto w-full flex-row gap-0.5 pb-2 text-center text-body3 font-medium leading-body3 tracking-body3 text-content-secondary-light">
      {name}
      {required && <label className="text-state-negative-light">*</label>}
    </label>
  );
};

export default Label;

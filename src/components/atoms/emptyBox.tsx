interface EmptyBoxProps {
  text: string;
}

const EmptyBox = ({ text }: EmptyBoxProps) => {
  return (
    <label className="flex h-auto w-full items-center justify-center gap-4 rounded-xl border border-gray-150 bg-background-surface-light px-6 py-16 text-caption1 font-medium leading-caption1 tracking-caption1 text-content-tertiary-light">
      {text}
    </label>
  );
};

export default EmptyBox;

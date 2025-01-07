interface EmptyBoxProps {
  text: string;
}

const EmptyBox = ({ text }: EmptyBoxProps) => {
  return (
    <label className="typography-caption1 flex h-auto w-full items-center justify-center gap-4 rounded-xl border border-gray-150 bg-background-surface-light px-6 py-16 font-medium text-content-tertiary-light">
      {text}
    </label>
  );
};

export default EmptyBox;

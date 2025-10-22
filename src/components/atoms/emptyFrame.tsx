interface EmptyFrameProps {
  text: string;
}

const EmptyFrame = ({ text }: EmptyFrameProps) => {
  return (
    <label className="typography-caption1 flex h-auto w-full items-center justify-center gap-4 rounded-xl border border-gray-150 bg-gray-50 px-6 py-16 font-medium text-content-tertiary-light dark:border-border-active-light dark:bg-gray-800 dark:text-content-tertiary-dark">
      {text}
    </label>
  );
};

export default EmptyFrame;

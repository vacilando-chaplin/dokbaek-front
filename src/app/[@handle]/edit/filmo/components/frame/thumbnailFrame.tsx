interface ThumbnailFrameProps {
  children: React.ReactNode;
  image: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThumbnailFrame = ({ children, image, onChange }: ThumbnailFrameProps) => {
  return (
    <label
      className={`typography-caption1 flex h-[150px] w-[100px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-gray-50 font-medium text-content-tertiary-light dark:bg-gray-800 dark:text-content-tertiary-dark ${image && "border border-dashed border-border-default-light dark:border-border-default-dark"}`}
    >
      <input
        id="upload"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onChange}
      />
      {children}
    </label>
  );
};

export default ThumbnailFrame;

interface ThumbnailFrameProps {
  image: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  children: React.ReactNode;
}

const ThumbnailFrame = ({ image, onChange, children }: ThumbnailFrameProps) => {
  return (
    <label
      className={`typography-caption1 flex h-[150px] w-[100px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg bg-gray-50 font-medium text-content-tertiary-light ${!image && "border border-dashed border-border-default-light"}`}
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

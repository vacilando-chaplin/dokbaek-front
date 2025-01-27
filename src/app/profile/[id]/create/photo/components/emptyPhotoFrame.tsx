interface EmptyPhotoFrameProps {
  text: string;
}

const EmptyPhotoFrame = ({ text }: EmptyPhotoFrameProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-center gap-4 rounded-xl border border-dotted border-gray-150 bg-gray-50 px-6 py-16">
      <input type="file" accept="image/*" className="hidden" />
      <label className="typography-caption1 font-medium text-content-tertiary-light">
        {text}
      </label>
    </div>
  );
};

export default EmptyPhotoFrame;

import Plus from "../../../../../../../public/icons/Plus.svg";

interface ThumbnailFrameProps {
  style: string;
  onClick?: React.MouseEventHandler<HTMLInputElement>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ThumbnailFrame = ({ style, onClick, onChange }: ThumbnailFrameProps) => {
  return (
    <label
      className={`flex ${style} typography-caption1 cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border-default-light bg-gray-50 font-medium text-content-tertiary-light`}
    >
      <input
        id="upload"
        type="file"
        accept="image/*"
        className="hidden"
        onClick={onClick}
        onChange={onChange}
      />
      <Plus width="16" height="16" fill="#868E96" />
      추가
    </label>
  );
};

export default ThumbnailFrame;

import InputWithLabel from "../molecules/inputWithLabel";

interface VideoModalSubProps {
  videoInputs: string;
  onVideoInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoModalSub = ({
  videoInputs,
  onVideoInputChange
}: VideoModalSubProps) => {
  return (
    <div className="flex h-auto w-full gap-4 bg-background-surface-light p-6">
      <div className="flex h-auto w-full flex-row gap-4">
        <InputWithLabel
          label="영상 링크"
          type="link"
          maxLength={300}
          name="link"
          placeholder="유튜브 링크를 입력해주세요."
          value={videoInputs}
          icon="youtube"
          onChange={onVideoInputChange}
        />
      </div>
    </div>
  );
};

export default VideoModalSub;

<<<<<<< HEAD:src/app/profile/[id]/create/video/components/videoModalContents.tsx
import TextInput from "@/components/atoms/textInput";
=======
import TextInput from "../atoms/textInput";
>>>>>>> e722db3 (input => textInput으로 변경, molecules inputWithLabel 삭제):src/components/organisms/videoModalSub.tsx

interface VideoModalContentsProps {
  videoInputs: string;
  onVideoInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const VideoModalContents = ({
  videoInputs,
  onVideoInputChange
}: VideoModalContentsProps) => {
  return (
    <div className="flex h-auto w-full gap-4 bg-background-surface-light p-6">
      <div className="flex h-auto w-full flex-row gap-4">
        <TextInput
          type="link"
          size="medium"
          name="link"
          icon="youtube"
          value={videoInputs}
          maxLength={300}
          placeholder="유튜브 링크를 입력해주세요."
          onChange={onVideoInputChange}
        />
      </div>
    </div>
  );
};

export default VideoModalContents;

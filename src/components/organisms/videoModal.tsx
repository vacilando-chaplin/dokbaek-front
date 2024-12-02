import ModalBottom from "../molecules/modalBottom";
import ModalTop from "../molecules/modalTop";
import VideoModalSub from "./videoModalSub";

interface VideoModalProps {
  videoInputs: string;
  onVideoInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onVideoModalSave: any;
}

const VideoModal = ({
  videoInputs,
  onVideoInputChange,
  onVideoModalActive,
  onVideoModalSave
}: VideoModalProps) => {
  const disabled =
    videoInputs.includes("https://www.youtube.com") ||
    videoInputs.includes("https://youtu.be");
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="relative max-h-full w-full max-w-[720px]">
        <div className="relative flex h-auto w-full animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-modal transition-all duration-100 ease-linear">
          <ModalTop name="영상 추가" onClick={onVideoModalActive} />
          <VideoModalSub
            videoInputs={videoInputs}
            onVideoInputChange={onVideoInputChange}
          />
          <ModalBottom
            text="추가"
            disabled={!disabled}
            onCloseClick={onVideoModalActive}
            onSaveClick={onVideoModalSave}
          />
        </div>
      </div>
    </section>
  );
};

export default VideoModal;

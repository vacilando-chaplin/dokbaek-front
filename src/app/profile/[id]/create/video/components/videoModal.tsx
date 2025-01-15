import ModalFooter from "@/components/molecules/modalFooter";
import ModalHeader from "@/components/molecules/modalHeader";
import VideoModalContents from "./videoModalContents";
import { VideoModalType } from "../types";

interface VideoModalProps {
  videoInputs: string;
  videoModal: VideoModalType;
  onVideoInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onVideoModalClose: React.MouseEventHandler<HTMLButtonElement>;
  onVideoModalSave: React.MouseEventHandler<HTMLButtonElement>;
  onVideoModalEdit: React.MouseEventHandler<HTMLButtonElement>;
}

const VideoModal = ({
  videoInputs,
  videoModal,
  onVideoInputChange,
  onVideoModalClose,
  onVideoModalSave,
  onVideoModalEdit
}: VideoModalProps) => {
  const disabled =
    videoInputs.includes("https://www.youtube.com") ||
    videoInputs.includes("https://youtu.be");
  return (
    <section className="fixed inset-0 z-[999] flex h-auto max-h-full min-h-[80vh] w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 md:inset-0">
      <div className="interaction-default relative flex h-auto w-full max-w-[720px] animate-enter flex-col items-center justify-center rounded-2xl bg-static-white shadow-medium">
        <ModalHeader name={videoModal.name} onClick={onVideoModalClose} />
        <VideoModalContents
          videoInputs={videoInputs}
          onVideoInputChange={onVideoInputChange}
        />
        <ModalFooter
          text={videoModal.buttonText}
          disabled={!disabled}
          onCloseClick={onVideoModalClose}
          onSaveClick={
            videoModal.state === "add" ? onVideoModalSave : onVideoModalEdit
          }
        />
      </div>
    </section>
  );
};

export default VideoModal;

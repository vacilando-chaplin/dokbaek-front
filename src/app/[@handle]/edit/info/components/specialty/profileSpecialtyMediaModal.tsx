import { useState } from "react";
import ModalFooter from "@/components/molecules/modalFooter";
import TextInput from "@/components/atoms/textInput";

interface ProfileSpecialtyMediaModalProps {
  specialtyId: number;
  onSpecialtyMediaModalClose: () => void;
  onSaveSpecialtyMedia: (media: string) => void;
}

const ProfileSpecialtyMediaModal = ({
  onSpecialtyMediaModalClose,
  onSaveSpecialtyMedia
}: ProfileSpecialtyMediaModalProps) => {
  const [media, setMedia] = useState("");

  return (
    <section className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-background-scrim-light bg-opacity-40 dark:bg-background-scrim-dark md:inset-0">
      <div className="flex h-[214px] w-[400px] animate-enter flex-col justify-center rounded-2xl bg-background-surface-light shadow-medium dark:bg-background-surface-dark">
        <div className="p-6">
          <h1 className="typography-body3 mb-2 text-content-secondary-light dark:text-content-secondary-dark">
            영상 링크
          </h1>
          <TextInput
            type="link"
            size="medium"
            name="youtube"
            icon="youtube"
            value={media}
            maxLength={300}
            placeholder="https://"
            onChange={(e) => setMedia(e.target.value)}
          />
          <p className="typography-caption1 mt-1 text-content-tertiary-light dark:text-content-tertiary-dark">
            유튜브 링크만 입력할 수 있어요.
          </p>
        </div>
        <ModalFooter
          text="완료"
          onCloseClick={onSpecialtyMediaModalClose}
          onSaveClick={() => onSaveSpecialtyMedia(media)}
        />
      </div>
    </section>
  );
};

export default ProfileSpecialtyMediaModal;

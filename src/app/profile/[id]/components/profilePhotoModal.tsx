import Image from "next/image";
import X from "../../../../../public/icons/X.svg";
import { SelectedPhotoType } from "../types";

interface ProfilePhotoModalProps {
  selectedPhoto: SelectedPhotoType;
  onPhotoModalClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfilePhotoModal = ({
  selectedPhoto,
  onPhotoModalClose
}: ProfilePhotoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-auto bg-background-surface-light bg-opacity-100 md:inset-0">
      <div className="relative flex h-[80vh] w-full max-w-7xl animate-enter flex-col items-center justify-center gap-6">
        <button
          type="button"
          className="rounded-full bg-static-black p-2"
          onClick={onPhotoModalClose}
        >
          <X width="20" height="20" fill="#ffffff" />
        </button>
        <Image
          src={selectedPhoto.origin}
          alt="photo"
          width={0}
          height={0}
          sizes="100vw"
          placeholder="blur"
          blurDataURL={selectedPhoto.blur}
          className="h-[80vh] w-[40%] rounded-2xl"
        />
      </div>
    </section>
  );
};

export default ProfilePhotoModal;

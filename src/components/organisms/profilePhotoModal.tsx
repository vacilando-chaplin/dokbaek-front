import Image from "next/image";

interface ProfilePhotoModalProps {
  selectedPhoto: string;
  onPhotoModalClose: React.MouseEventHandler<HTMLButtonElement>;
}

const ProfilePhotoModal = ({
  selectedPhoto,
  onPhotoModalClose
}: ProfilePhotoModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-auto bg-background-surface-light bg-opacity-50 backdrop-blur-3xl md:inset-0">
      <div className="relative flex h-[80vh] w-full max-w-7xl flex-col items-center justify-center gap-6">
        <button
          type="button"
          className="rounded-full bg-static-black p-2"
          onClick={onPhotoModalClose}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
              fill="#ffffff"
            />
          </svg>
        </button>
        <Image
          src={selectedPhoto}
          alt="photo"
          width={0}
          height={0}
          sizes="100vw"
          className="h-[80vh] w-[40%] rounded-2xl"
        />
      </div>
    </section>
  );
};

export default ProfilePhotoModal;

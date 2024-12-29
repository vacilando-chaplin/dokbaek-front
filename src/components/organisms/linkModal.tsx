import YoutubeVideo from "../atoms/youtubeVideo";
import X from "../../../public/icons/X.svg";

interface LinkModalProps {
  link: string;
  onLinkModalClose: React.MouseEventHandler<HTMLButtonElement>;
}

const LinkModal = ({ link, onLinkModalClose }: LinkModalProps) => {
  return (
    <section className="fixed inset-0 z-[999] flex h-auto w-full items-center justify-center overflow-auto bg-background-surface-light bg-opacity-100 md:inset-0">
      <div className="relative flex w-[60vw] animate-enter flex-col items-center justify-center gap-6">
        <button
          type="button"
          className="rounded-full bg-static-black p-2"
          onClick={onLinkModalClose}
        >
          <X width="20" height="20" fill="#ffffff" />
        </button>
        <YoutubeVideo link={link} />
      </div>
    </section>
  );
};

export default LinkModal;

import { VideoTypes } from "@/types/types";
import CreateButton from "../atoms/createButton";
import EmptyBox from "../atoms/emptyBox";
import Title from "../atoms/title";
import DeleteModal from "../molecules/deleteModal";

interface VideoMainProps {
  videoList: VideoTypes[];
  videoDeleteModalActive: boolean;
  onVideoModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onVideoEditModalActive: (link: string, id: number) => void;
  onVideoDeleteModalActive: React.MouseEventHandler<HTMLButtonElement>;
  onVideoDelete: (id: number) => void;
  onVideoLinkModalOpen: (link: string) => void;
}

const VideoMain = ({
  videoList,
  videoDeleteModalActive,
  onVideoModalActive,
  onVideoEditModalActive,
  onVideoDeleteModalActive,
  onVideoDelete,
  onVideoLinkModalOpen
}: VideoMainProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex w-full flex-row justify-between">
        <Title name="영상" />
        <CreateButton onClick={onVideoModalActive} />
      </div>
      <div className="flex h-auto w-full flex-wrap gap-2">
        {videoList.length >= 1 ? (
          <div className="grid h-auto w-full grid-cols-3 gap-2">
            {videoList.map((video: VideoTypes) => {
              const videoId = video.link.slice(32, 43);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

              return (
                <div
                  key={video.id}
                  className="pointer-events-auto relative w-full animate-enter cursor-pointer rounded-2xl bg-cover bg-center pb-[56.25%]"
                  style={{
                    backgroundImage: `url(${thumbnail})`
                  }}
                  onClick={() => onVideoLinkModalOpen(video.link)}
                >
                  <div className="pointer-events-auto absolute z-10 h-full w-full opacity-0 hover:opacity-100">
                    {/* edit */}
                    <button
                      className="absolute right-8 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVideoEditModalActive(video.link, video.id);
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M19.9142 1.99997C19.1332 1.21892 17.8668 1.21892 17.0858 1.99997L7.78167 11.3041C7.39841 11.6873 7.18712 12.2097 7.19616 12.7517L7.23096 14.8382C7.24895 15.9166 8.11887 16.7866 9.19733 16.8045L11.2838 16.8393C11.8258 16.8484 12.3482 16.6371 12.7314 16.2538L22.0355 6.94972C22.8166 6.16867 22.8166 4.90234 22.0355 4.12129L19.9142 1.99997ZM18.5 3.41418L20.6213 5.5355L11.3172 14.8396L9.23068 14.8048L9.19588 12.7183L18.5 3.41418Z"
                          fill="#212529"
                        />
                        <path
                          d="M4 4.99997C4 4.44769 4.44772 3.99997 5 3.99997H11C11.5523 3.99997 12 3.55226 12 2.99997C12 2.44769 11.5523 1.99997 11 1.99997H5C3.34315 1.99997 2 3.34312 2 4.99997V19C2 20.6568 3.34315 22 5 22H19C20.6569 22 22 20.6568 22 19V13C22 12.4477 21.5523 12 21 12C20.4477 12 20 12.4477 20 13V19C20 19.5523 19.5523 20 19 20H5C4.44772 20 4 19.5523 4 19V4.99997Z"
                          fill="#212529"
                        />
                      </svg>
                    </button>
                    {/* delete */}
                    <button
                      className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVideoDeleteModalActive(e);
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L12 10.5858L18.2929 4.29289C18.6834 3.90237 19.3166 3.90237 19.7071 4.29289C20.0976 4.68342 20.0976 5.31658 19.7071 5.70711L13.4142 12L19.7071 18.2929C20.0976 18.6834 20.0976 19.3166 19.7071 19.7071C19.3166 20.0976 18.6834 20.0976 18.2929 19.7071L12 13.4142L5.70711 19.7071C5.31658 20.0976 4.68342 20.0976 4.29289 19.7071C3.90237 19.3166 3.90237 18.6834 4.29289 18.2929L10.5858 12L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z"
                          fill="#FB3E34"
                        />
                      </svg>
                    </button>
                    {/* deleteModal */}
                    {videoDeleteModalActive && (
                      <DeleteModal
                        text="이 영상을 삭제할까요?"
                        id={video.id}
                        onCancel={(e) => {
                          e.stopPropagation();
                          onVideoDeleteModalActive(e);
                        }}
                        onDelete={() => onVideoDelete(video.id)}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyBox text="영상을 추가해주세요." />
        )}
      </div>
    </section>
  );
};

export default VideoMain;

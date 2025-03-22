import { VideoResponseType } from "@/lib/types";
import Title from "@/components/atoms/title";
import BoxButton from "@/components/atoms/boxButton";
import DeleteModal from "@/components/molecules/deleteModal";
import EmptyFrame from "@/components/atoms/emptyFrame";
import Edit from "../../../../../../../public/icons/Edit.svg";
import X from "../../../../../../../public/icons/X.svg";
import Plus from "../../../../../../../public/icons/Plus.svg";

interface VideoMainProps {
  videoList: VideoResponseType[];
  videoDeleteModalActive: boolean;
  onVideoModalOpen: React.MouseEventHandler<HTMLButtonElement>;
  onVideoEditModalOpen: (video: VideoResponseType) => void;
  onVideoDeleteModalOpen: (video: VideoResponseType) => void;
  onVideoDeleteModalClose: React.MouseEventHandler<HTMLButtonElement>;
  onVideoDeleteClick: any;
  onVideoLinkModalOpen: (url: string) => void;
}

const VideoMain = ({
  videoList,
  videoDeleteModalActive,
  onVideoModalOpen,
  onVideoEditModalOpen,
  onVideoDeleteModalOpen,
  onVideoDeleteModalClose,
  onVideoDeleteClick,
  onVideoLinkModalOpen
}: VideoMainProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <div className="flex w-full flex-row justify-between">
        <Title name="영상" />
        <BoxButton
          type="primaryOutlined"
          size="small"
          onClick={onVideoModalOpen}
        >
          <Plus
            width="12"
            height="12"
            className="fill-current text-accent-primary-light dark:text-accent-primary-dark"
          />
          추가
        </BoxButton>
      </div>
      <div className="flex h-auto w-full flex-wrap gap-2">
        {videoList.length >= 1 ? (
          <div className="grid h-auto w-full grid-cols-3 gap-2">
            {videoList.map((video: any) => {
              const videoId = video.url.includes("https://www.youtube.com")
                ? video.url.slice(32, 43)
                : video.url.slice(17, 28);
              const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

              return (
                <div
                  key={video.id}
                  className="pointer-events-auto relative w-full animate-enter cursor-pointer rounded-2xl bg-cover bg-center pb-[56.25%]"
                  style={{
                    backgroundImage: `url(${thumbnail})`
                  }}
                  onClick={() => onVideoLinkModalOpen(video.url)}
                >
                  <div className="pointer-events-auto absolute z-10 h-full w-full opacity-0 hover:opacity-100">
                    {/* edit */}
                    <button
                      className="absolute right-8 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVideoEditModalOpen(video);
                      }}
                    >
                      <Edit
                        width="12"
                        height="12"
                        className="fill-current text-content-primary-light dark:text-content-primary-dark"
                      />
                    </button>
                    {/* delete */}
                    <button
                      className="absolute right-2 top-2 h-auto w-auto rounded-md border border-border-default-light bg-background-surface-light p-1 outline-none dark:border-border-default-dark dark:bg-background-surface-dark"
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onVideoDeleteModalOpen(video);
                      }}
                    >
                      <X
                        width="12"
                        height="12"
                        className="fill-current text-state-negative-light dark:text-state-negative-dark"
                      />
                    </button>
                    {/* deleteModal */}
                    {videoDeleteModalActive && (
                      <DeleteModal
                        text="이 영상을 삭제할까요?"
                        id={video.id}
                        category=""
                        onCancel={(e) => {
                          e.stopPropagation();
                          onVideoDeleteModalClose(e);
                        }}
                        onDelete={onVideoDeleteClick}
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyFrame text="영상을 추가해주세요." />
        )}
      </div>
    </section>
  );
};

export default VideoMain;

import Title from "../atoms/title";

interface FilmographyMainProps {
  onFilmoModalActive: React.MouseEventHandler<HTMLButtonElement>;
}

const FilmographyMain = ({ onFilmoModalActive }: FilmographyMainProps) => {
  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <div className="flex w-full flex-row items-center justify-between">
        <Title name="작품 활동" />
        <button
          className="flex h-auto w-auto flex-row items-center gap-1 rounded-[10px] border border-accent-primary-light bg-background-surface-light px-3 py-[7px] text-body3 font-medium leading-body3 tracking-body3 text-accent-primary-light"
          onClick={onFilmoModalActive}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C12.5523 2 13 2.44772 13 3V11H21C21.5523 11 22 11.4477 22 12C22 12.5523 21.5523 13 21 13H13V21C13 21.5523 12.5523 22 12 22C11.4477 22 11 21.5523 11 21V13H3C2.44772 13 2 12.5523 2 12C2 11.4477 2.44772 11 3 11H11V3C11 2.44772 11.4477 2 12 2Z"
              fill="#1E85EF"
            />
          </svg>
          추가
        </button>
      </div>
      <label className="flex h-auto w-full items-center justify-center gap-4 rounded-xl border border-gray-150 bg-background-surface-light px-6 py-16 text-caption1 font-medium leading-caption1 tracking-caption1 text-content-tertiary-light">
        작품 활동을 추가해주세요.
      </label>
    </section>
  );
};

export default FilmographyMain;

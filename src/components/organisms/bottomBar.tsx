import Button from "../atoms/button";

interface BottomBarProps {
  disabled?: boolean;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
}

const BottomBar = ({ disabled, onSave }: BottomBarProps) => {
  return (
    <section className="fixed bottom-0 z-50 flex h-auto w-full items-center justify-between border-t-[1px] bg-background-elevated-light px-6 py-3 shadow-footer">
      <div className="flex gap-4">
        <Button icon="/icons/ArrowDirectionLeft.svg" text="돌아가기" />
        <label className="flex items-center gap-1 text-caption1 font-medium leading-caption1 tracking-caption1 text-state-positive-light">
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
              d="M22.2236 5.3098C22.6048 5.70945 22.5898 6.34244 22.1902 6.72362L8.86639 19.432L1.75865 11.5802C1.388 11.1708 1.41946 10.5384 1.8289 10.1677C2.23835 9.79709 2.87073 9.82854 3.24137 10.238L8.97146 16.568L20.8098 5.27638C21.2095 4.8952 21.8424 4.91016 22.2236 5.3098Z"
              fill="#01C043"
            />
          </svg>
          저장되었어요.
        </label>
      </div>
      <div className="flex gap-2">
        <Button
          text="프로필 저장"
          color="bg-accent-primary-light text-static-white"
          disabled={disabled}
          onClick={onSave}
        />
      </div>
    </section>
  );
};

export default BottomBar;

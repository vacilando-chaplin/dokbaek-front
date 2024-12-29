import Button from "../atoms/button";
import Check from "../../../public/icons/Check.svg";

interface BottomBarProps {
  disabled?: boolean;
  onBack: React.MouseEventHandler<HTMLButtonElement>;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
}

const BottomBar = ({ disabled, onBack, onSave }: BottomBarProps) => {
  return (
    <section className="fixed bottom-0 z-50 flex h-auto w-full items-center justify-between border-t-[1px] bg-background-elevated-light px-6 py-3 shadow-footer">
      <div className="flex gap-4">
        <Button
          icon="/icons/ArrowDirectionLeft.svg"
          text="돌아가기"
          onClick={onBack}
        />
        <label className="flex items-center gap-1 text-caption1 font-medium leading-caption1 tracking-caption1 text-state-positive-light">
          <Check width="12" height="12" fill="#01C043" />
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

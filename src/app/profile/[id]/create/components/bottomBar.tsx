import Check from "../../../../../../public/icons/Check.svg";
import ArrowDirectionLeft from "../../../../../../public/icons/ArrowDirectionLeft.svg";
import BoxButton from "@/components/atoms/boxButton";

interface BottomBarProps {
  disabled?: boolean;
  onBack: React.MouseEventHandler<HTMLButtonElement>;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
}

const BottomBar = ({ disabled, onBack, onSave }: BottomBarProps) => {
  return (
    <section className="fixed bottom-0 z-50 flex h-auto w-full items-center justify-between border-t-[1px] bg-background-elevated-light px-6 py-3 shadow-low">
      <div className="flex gap-4">
        <BoxButton type="secondaryOutlined" size="medium" onClick={onBack}>
          <ArrowDirectionLeft width="14" height="14" fill="#212529" />
          돌아가기
        </BoxButton>
        <label className="typography-caption1 flex items-center gap-1 font-medium text-state-positive-light">
          <Check width="12" height="12" fill="#01C043" />
          저장되었어요.
        </label>
      </div>
      <div className="flex gap-2">
        <BoxButton
          type="primary"
          size="medium"
          disabled={disabled}
          onClick={onSave}
        >
          프로필 저장
        </BoxButton>
      </div>
    </section>
  );
};

export default BottomBar;

import ArrowDirectionLeft from "../../../../../../public/icons/ArrowDirectionLeft.svg";
import BoxButton from "@/components/atoms/boxButton";
import ProgressBar from "./progressBar";

interface BottomBarProps {
  progress: number;
  disabled: boolean;
  onBack: React.MouseEventHandler<HTMLButtonElement>;
  onSave: React.MouseEventHandler<HTMLButtonElement>;
}

const BottomBar = ({ progress, disabled, onBack, onSave }: BottomBarProps) => {
  return (
    <section className="fixed bottom-0 z-50 flex h-auto w-full items-center justify-between border-t-[1px] bg-background-elevated-light px-6 py-3 shadow-low">
      <div className="flex gap-4">
        <BoxButton type="secondaryOutlined" size="medium" onClick={onBack}>
          <ArrowDirectionLeft width="14" height="14" fill="#212529" />
          돌아가기
        </BoxButton>
      </div>
      <div className="flex flex-row items-center gap-6">
        <ProgressBar progress={progress} />
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

import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import ArrowTriangleUp from "../../../public/icons/ArrowTriangleUp.svg";

interface TooltipProps {
  placement: string;
  text: string;
}

const Tooltip = ({ placement, text }: TooltipProps) => {
  return (
    <div className="interaction-default relative flex h-auto w-auto max-w-80 items-center justify-center gap-0.5 rounded-lg bg-accent-primary-light px-2.5 py-1.5 shadow-low">
      {placement === "top" && (
        <ArrowTriangleDown
          width="24"
          height="24"
          fill="#1E85EF"
          className="absolute bottom-[-12px]"
        />
      )}
      <label className="typography-body2 text-left font-semibold text-content-on_color-light">
        {text}
      </label>
      {placement === "bottom" && (
        <ArrowTriangleUp
          width="24"
          height="24"
          fill="#1E85EF"
          className="absolute top-[-12px]"
        />
      )}
    </div>
  );
};

export default Tooltip;

import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import ArrowTriangleUp from "../../../public/icons/ArrowTriangleUp.svg";

interface TooltipProps {
  placement: string;
  text: string;
}

const Tooltip = ({ placement, text }: TooltipProps) => {
  return (
    <div className="relative flex h-auto w-auto max-w-80 items-center justify-center gap-0.5 rounded-lg bg-accent-primary-light px-2.5 py-1.5 shadow-low">
      {placement === "top" && (
        <ArrowTriangleDown
          width="16"
          height="16"
          fill="#1E85EF"
          className="absolute top-7"
        />
      )}
      <label className="typography-body2 text-left font-semibold text-content-on_color-light">
        {text}
      </label>
      {placement === "bottom" && (
        <ArrowTriangleUp
          width="16"
          height="16"
          fill="#1E85EF"
          className="absolute top-0"
        />
      )}
    </div>
  );
};

export default Tooltip;

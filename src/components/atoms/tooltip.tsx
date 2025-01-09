import ArrowTriangleDown from "../../../public/icons/ArrowTriangleDown.svg";
import ArrowTriangleUp from "../../../public/icons/ArrowTriangleUp.svg";

interface TooltipProps {
  placement: string;
}

const Tooltip = ({ placement }: TooltipProps) => {
  return (
    <div className="relative flex h-auto w-auto max-w-80 items-center justify-center gap-0.5 rounded-lg bg-accent-primary-light px-2.5 py-1.5 shadow-low">
      {placement === "top" && (
        <ArrowTriangleDown
          width="8"
          height="4"
          fill="#1E85EF"
          className="absolute top-0"
        />
      )}
      <label className="typhography-body2 text-left font-medium text-content-on_color-light" />
      {placement === "bottom" && (
        <ArrowTriangleUp
          width="8"
          height="4"
          fill="#1E85EF"
          className="absolute bottom-0"
        />
      )}
    </div>
  );
};

export default Tooltip;

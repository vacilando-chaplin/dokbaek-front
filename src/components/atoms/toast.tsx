import Check from "../../../public/icons/Check.svg";
import WarningCircle from "../../../public/icons/WarningCircle.svg";

interface ToastProps {
  text: string;
  kind: string;
  fullWidth: boolean;
  placement: string;
}

const Toast = ({ text, kind, fullWidth, placement }: ToastProps) => {
  return (
    <div
      className={`interaction-default animate-toast-slide-down fixed z-[51] flex h-auto gap-2 rounded-[100px] bg-background-base_inverse-light px-4 py-3 shadow-medium ${fullWidth ? "w-full" : "w-auto"} ${placement === "top" ? "top-10" : "bottom-10"}`}
    >
      {kind === "success" && <Check width="20" height="20" fill="#01C043" />}
      {kind === "error" && (
        <WarningCircle width="20" height="20" fill="#FB3E34" />
      )}
      <label className="typography-body2 text-center font-medium text-content-on_color-light">
        {text}
      </label>
    </div>
  );
};

export default Toast;

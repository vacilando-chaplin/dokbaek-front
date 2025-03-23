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
      className={`interaction-default fixed z-[51] flex h-auto animate-toast-slide-down gap-2 rounded-[100px] bg-background-base_inverse-light px-4 py-3 shadow-medium dark:bg-background-base_inverse-dark ${fullWidth ? "w-full" : "w-auto"} ${placement === "top" ? "top-10" : "bottom-10"}`}
    >
      {kind === "success" && (
        <Check
          width="20"
          height="20"
          className="fill-current text-state-positive-light dark:text-state-positive-dark"
        />
      )}
      {kind === "error" && (
        <WarningCircle
          width="20"
          height="20"
          className="fill-current text-state-negative-light dark:text-state-negative-dark"
        />
      )}
      <label className="typography-body2 text-con text-center font-medium text-content-on_color-light dark:text-static-black">
        {text}
      </label>
    </div>
  );
};

export default Toast;

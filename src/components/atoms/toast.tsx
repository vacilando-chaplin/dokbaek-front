interface ToastProps {
  text: string;
}

const Toast = ({ text }: ToastProps) => {
  return (
    <div className="fixed top-8 z-[51] flex h-auto w-auto animate-enter gap-2 rounded-full bg-background-base_inverse-light px-4 py-3 shadow-medium">
      <label className="typography-body2 text-center font-medium text-content-on_color-light">
        {text}
      </label>
    </div>
  );
};

export default Toast;

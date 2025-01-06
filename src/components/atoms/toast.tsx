interface ToastProps {
  text: string;
}

const Toast = ({ text }: ToastProps) => {
  return (
    <div className="shadow-medium fixed top-8 z-[51] flex h-auto w-auto animate-enter gap-2 rounded-full bg-background-base_inverse-light px-4 py-3">
      <label className="text-center text-body2 font-medium leading-body2 tracking-body2 text-content-on_color-light">
        {text}
      </label>
    </div>
  );
};

export default Toast;

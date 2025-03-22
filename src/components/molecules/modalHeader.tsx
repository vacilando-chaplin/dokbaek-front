import Title from "../atoms/title";
import X from "../../../public/icons/X.svg";

interface ModalHeaderProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalHeader = ({ name, onClick }: ModalHeaderProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-between gap-3 border-b-[1px] border-border-default-light p-6 dark:border-border-default-dark">
      <Title name={name} />
      <button onClick={onClick}>
        <X
          width="24"
          height="24"
          className="fill-current text-content-tertiary-light dark:text-content-tertiary-dark"
        />
      </button>
    </div>
  );
};

export default ModalHeader;

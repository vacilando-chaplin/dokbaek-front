import Title from "../atoms/title";
import X from "../../../public/icons/X.svg";

interface ModalHeaderProps {
  name: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const ModalHeader = ({ name, onClick }: ModalHeaderProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-between gap-3 border-b-[1px] border-border-default-light p-6">
      <Title name={name} />
      <button onClick={onClick}>
        <X width="24" height="24" fill="#868E96" />
      </button>
    </div>
  );
};

export default ModalHeader;

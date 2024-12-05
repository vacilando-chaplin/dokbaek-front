interface OptionProps {
  name: string;
  item: string;
  active: boolean;
  selected: string;
  onClick: (name: string, item: string) => void;
  onActive: (name: string, state: boolean) => void;
}

const Option = ({
  name,
  item,
  active,
  selected,
  onClick,
  onActive
}: OptionProps) => {
  return (
    <li
      className={`flex w-full cursor-pointer items-center gap-2 rounded-md bg-background-surface-light px-3 py-2 hover:bg-gray-150 ${selected === item && "bg-gray-50"}`}
      onClick={() => {
        onClick(name, item);
        onActive(name, active);
      }}
    >
      <button
        type="button"
        className={`flex w-full text-body3 font-normal leading-body3 tracking-body3 ${selected === item ? "font-semibold text-accent-primary-light" : "text-content-primary-light"}`}
      >
        {item}
      </button>
    </li>
  );
};

export default Option;

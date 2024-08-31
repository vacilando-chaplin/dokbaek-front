import Option from "../atoms/option";

interface DropdownProps {
  name: string;
  content: string[];
  active: boolean;
  selected: string;
  onClick: (name: string, item: string) => void;
  onActive: (name: string, state: boolean) => void;
}

const Dropdown = ({
  name,
  content,
  active,
  selected,
  onClick,
  onActive
}: DropdownProps) => {
  return (
    <ul className="no-scrollbar h-auto max-h-40 animate-enter list-none flex-col overflow-auto rounded-xl bg-background-elevated-light p-2 shadow-low transition-all duration-100 ease-linear">
      {content.map((item: string, index: number) => {
        return (
          <Option
            key={`${item}${index}`}
            name={name}
            item={item}
            active={active}
            selected={selected}
            onClick={onClick}
            onActive={onActive}
          />
        );
      })}
    </ul>
  );
};

export default Dropdown;

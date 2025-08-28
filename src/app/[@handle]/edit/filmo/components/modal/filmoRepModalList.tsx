import { ProfileFilmoDataType } from "../../../types";
import FilmoRepModalItem from "./filmoRepModalItem";

interface FilmoRepModalListProps {
  category: string;
  filmoList: ProfileFilmoDataType[];
}

const FilmoRepModalList = ({ category, filmoList }: FilmoRepModalListProps) => {
  return (
    <div className="flex h-auto w-full flex-col gap-2">
      <label
        className={`typography-body2 font-medium ${category === "대표작" ? "text-accent-primary-light dark:text-accent-primary-dark" : "text-content-secondary-light dark:text-content-secondary-dark"}`}
      >
        {category}
      </label>
      {filmoList.map((filmo: ProfileFilmoDataType) => {
        return <FilmoRepModalItem key={filmo.id} filmo={filmo} />;
      })}
    </div>
  );
};

export default FilmoRepModalList;

import { ProfileFilmoDataType } from "../../../types";
import FilmoItem from "./filmoItem";

interface FilmoListProps {
  category: string;
  filmoList: ProfileFilmoDataType[];
}

const FilmoList = ({ category, filmoList }: FilmoListProps) => {
  return (
    <div className="flex h-auto w-full flex-col gap-2">
      <label
        className={`typography-body2 font-medium ${category === "대표작" ? "text-accent-primary-light dark:text-accent-primary-dark" : "text-content-secondary-light dark:text-content-secondary-dark"}`}
      >
        {category}
      </label>
      {filmoList.map((filmo: ProfileFilmoDataType) => {
        return <FilmoItem key={filmo.id} filmo={filmo} filmoList={filmoList} />;
      })}
    </div>
  );
};

export default FilmoList;

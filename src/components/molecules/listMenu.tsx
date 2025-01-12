"use client";

import { stepperList } from "@/data/data";
import { StepperType } from "@/types/types";
import { usePathname } from "next/navigation";
import ListItem from "../atoms/listItem";

interface ListMenuProps {
  onStepper: (index: number) => void;
}

const ListMenu = ({ onStepper }: ListMenuProps) => {
  const pathName = usePathname();
  const activePath = pathName?.split("/")[4];

  return (
    <aside className="sticky top-[104px] h-fit w-[200px] rounded-2xl bg-background-surface-light p-3">
      {stepperList.map((step: StepperType, index: number) => {
        return (
          <ListItem
            key={step.id}
            active={step.path === "/" + activePath}
            onClick={() => onStepper(index)}
          >
            {step.name}
          </ListItem>
        );
      })}
    </aside>
  );
};

export default ListMenu;

"use client";

import { stepperList } from "@/data/data";
import { StepperType } from "@/types/types";
import MenuItem from "../atoms/menuItem";
import { usePathname } from "next/navigation";

interface SideMenuProps {
  onStepper: (index: number) => void;
}

const SideMenu = ({ onStepper }: SideMenuProps) => {
  const steps = stepperList;

  const pathName = usePathname();
  const activePath = pathName?.split("/")[4];

  return (
    <aside className="sticky top-[104px] h-fit w-[200px] rounded-2xl bg-background-surface-light p-3">
      {steps.map((step: StepperType, index: number) => {
        return (
          <MenuItem
            key={step.id}
            name={step.name}
            active={step.path === "/" + activePath}
            onClick={() => onStepper(index)}
          />
        );
      })}
    </aside>
  );
};

export default SideMenu;

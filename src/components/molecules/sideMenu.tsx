"use client";

import { StepperTypes } from "@/types/types";
import MenuItem from "../atoms/menuItem";
import { stepList } from "@/data/data";

interface SideMenuProps {
  stepper: number;
  setStepper: React.Dispatch<React.SetStateAction<number>>;
}

const SideMenu = ({ stepper, setStepper }: SideMenuProps) => {
  const steps = stepList;

  return (
    <aside className="h-fit w-[200px] rounded-2xl bg-background-surface-light p-3">
      {steps.map((step: StepperTypes, index: number) => {
        return (
          <MenuItem
            key={step.id}
            name={step.name}
            active={stepper === index}
            onClick={() => setStepper(index)}
          />
        );
      })}
    </aside>
  );
};

export default SideMenu;

"use client";

import { stepList } from "@/data/data";
import { StepperTypes } from "@/types/types";
import MenuItem from "../atoms/menuItem";

interface SideMenuProps {
  stepper: number;
  onStepper: (index: number) => void;
}

const SideMenu = ({ stepper, onStepper }: SideMenuProps) => {
  const steps = stepList;

  return (
    <aside className="sticky top-[104px] h-fit w-[200px] rounded-2xl bg-background-surface-light p-3">
      {steps.map((step: StepperTypes, index: number) => {
        return (
          <MenuItem
            key={step.id}
            name={step.name}
            active={stepper === index}
            onClick={() => onStepper(index)}
          />
        );
      })}
    </aside>
  );
};

export default SideMenu;

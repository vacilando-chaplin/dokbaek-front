"use client";

import { StepperType } from "../types";
import { useRouter } from "next/navigation";
import ListItem from "../../../../../components/atoms/listItem";
import { stepperList } from "../data";
import { useRecoilState } from "recoil";
import { stepperInit } from "@/lib/atoms";

interface ListMenuProps {
  profileId: number;
}

const ListMenu = ({ profileId }: ListMenuProps) => {
  const router = useRouter();

  const [stepper, setStepper] = useRecoilState(stepperInit);

  const onStepper = (index: number) => {
    setStepper(index);
    router.prefetch(`/profile/${profileId}/create/${stepperList[index].path}`);
    router.push(`/profile/${profileId}/create/${stepperList[index].path}`);
  };

  return (
    <aside className="sticky top-[104px] h-fit w-[200px] rounded-2xl bg-background-surface-light p-3 dark:bg-background-surface-dark">
      {stepperList.map((step: StepperType, index: number) => {
        return (
          <ListItem
            key={step.id}
            active={index === stepper}
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

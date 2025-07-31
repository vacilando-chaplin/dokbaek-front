"use client";

import { StepperType } from "../types";
import { usePathname, useRouter } from "next/navigation";
import { stepperList } from "../data";
import { useRecoilValue } from "recoil";
import ListItem from "@/components/atoms/listItem";
import { handleNameState } from "@/lib/recoil/handle/atom";

const ListMenu = () => {
  const router = useRouter();
  const pathname = usePathname();
  const handleName = useRecoilValue(handleNameState);

  const onStepper = (index: number) => {
    const nextPath = `/@${handleName}/edit/${stepperList[index].path}`;
    router.push(nextPath);
  };

  return (
    <aside className="sticky top-[104px] h-fit w-[200px] rounded-2xl bg-background-surface-light p-3 dark:bg-background-surface-dark">
      {stepperList.map((step: StepperType, index: number) => {
        const isActive = pathname.endsWith(step.path);
        return (
          <ListItem
            key={step.id}
            active={isActive}
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

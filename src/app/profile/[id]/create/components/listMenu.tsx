"use client";

import { StepperType } from "../types";
import { usePathname, useRouter } from "next/navigation";
import ListItem from "../../../../../components/atoms/listItem";
import { stepperList } from "../data";
import { useRecoilValue } from "recoil";
import { profileDraftData } from "@/lib/recoil/profile/common/atom";
import { putInfoDraft } from "../info/api";

interface ListMenuProps {
  profileId: number;
}

const ListMenu = ({ profileId }: ListMenuProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const profileData = useRecoilValue(profileDraftData);

  const onStepper = async (index: number) => {
    if (pathname.endsWith("/info") && profileData?.info) {
      await putInfoDraft(profileId, profileData.info);
    }

    const nextPath = `/profile/${profileId}/create/${stepperList[index].path}`;
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

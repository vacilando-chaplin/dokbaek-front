"use client";

import ListMenu from "@/app/profile/[id]/create/components/listMenu";
import BottomBar from "@/app/profile/[id]/create/components/bottomBar";
import { completionProgress, defaultId, stepperInit } from "@/lib/atoms";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { stepperList } from "./data";
import { postProfileDraftPublish } from "../api";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const userId = useRecoilValue(defaultId);
  const { name, birth, contact } = useRecoilValue(completionProgress);

  const router = useRouter();

  const setStepper = useSetRecoilState(stepperInit);
  const onStepper = (index: number) => {
    setStepper(index);
    router.prefetch(`/profile/${userId}/create/${stepperList[index].path}`);
    router.push(`/profile/${userId}/create/${stepperList[index].path}`);
  };

  const onSaveProfileClick = async () => {
    await postProfileDraftPublish(userId);

    setStepper(0);
    router.prefetch(`/profile/${userId}`);
    router.push(`/profile/${userId}`);
  };

  const onBackProfileClick = () => {
    setStepper(0);
    router.prefetch(`/profile/${userId}`);
    router.push(`/profile/${userId}`);
  };

  return (
    <div className="relative mb-16 mt-16 flex flex-row justify-center gap-4 p-10">
      <ListMenu onStepper={onStepper} />
      {children}
      <BottomBar
        onBack={onBackProfileClick}
        onSave={onSaveProfileClick}
        disabled={!(name && birth && contact)}
      />
    </div>
  );
};

export default Layout;

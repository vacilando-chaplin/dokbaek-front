"use client";

import { useLayoutEffect, useRef, useState } from "react";
import UserProfileCard from "./userProfileCard";
import MainPhotoCropModal from "../mainPhoto/mainPhotoCropModal";
import MainPhotoDeleteModal from "../mainPhoto/mainPhotoDeleteModal";

const UserProfileContainer = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLDivElement>(null);

  const [linear, setLinear] = useState<"main" | "sub">("sub");

  useLayoutEffect(() => {
    if (mainRef.current && subRef.current) {
      const mainHeight = mainRef.current.offsetHeight;
      const subHeight = subRef.current.offsetHeight;

      mainHeight >= subHeight ? setLinear("main") : setLinear("sub");
    }
  }, []);

  return (
    <div className="no-scrollbar mt-12 flex h-full w-full flex-row justify-between overflow-hidden bg-background-surface-light dark:bg-background-surface-dark">
      <div ref={mainRef} className="min-w-[500px] flex-[1_1_30%]">
        <UserProfileCard linear={linear} />
      </div>
      <div ref={subRef} className="flex-[1_1_70%]"></div>
      <MainPhotoCropModal />
      <MainPhotoDeleteModal />
    </div>
  );
};

export default UserProfileContainer;

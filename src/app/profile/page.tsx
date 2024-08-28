"use client";

import SideMenu from "@/components/molecules/sideMenu";
import BottomBar from "@/components/organisms/bottomBar";
import InfoMain from "@/components/organisms/infoMain";
import InfoSub from "@/components/organisms/infoSub";
import { useState } from "react";

const Profile = () => {
  const [stepper, setStepper] = useState(0);

  return (
    <div className="flex flex-row gap-4 p-10">
      <SideMenu stepper={stepper} setStepper={setStepper} />
      <div className="flex w-[728px] flex-col gap-3">
        <InfoMain />
        <InfoSub />
      </div>
    </div>
  );
};

export default Profile;

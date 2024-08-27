"use client";

import SideMenu from "@/components/molecules/sideMenu";
import InfoMain from "@/components/organisms/infoMain";
import { useState } from "react";

const Profile = () => {
  const [stepper, setStepper] = useState(0);

  return (
    <div className="flex flex-row gap-4 p-10">
      <SideMenu stepper={stepper} setStepper={setStepper} />
      <div className="w-[728px] gap-3">
        <InfoMain />
      </div>
    </div>
  );
};

export default Profile;

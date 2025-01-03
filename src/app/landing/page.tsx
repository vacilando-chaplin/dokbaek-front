"use client";

import LandingMain from "@/components/organisms/landing/landingMain";
import LandingSub from "@/components/organisms/landing/landingSub";

const Page = () => {
  return (
    <div className="m-[auto] mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      <LandingSub />
      <LandingMain />
    </div>
  );
};

export default Page;

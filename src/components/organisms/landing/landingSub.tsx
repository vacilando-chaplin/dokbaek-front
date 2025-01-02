import Button from "@/components/atoms/button";
import React from "react";

const LandingSub = () => {
  return (
    <div className="mx-[auto] mt-[40px] flex w-[100%] max-w-[1000px] flex-col rounded-2xl">
      <div
        className="relative h-[240px] px-[100px]"
        style={{
          background:
            "linear-gradient(275.85deg, rgba(30, 133, 239, 0.08) 0%, rgba(99, 123, 255, 0.08) 100%);",
          borderRadius: "40px"
        }}
      >
        <div className="">
          <div className="absolute top-[80px]">
            <p className="lineHeight-caption2 text-display font-bold text-accent-primary-light">
              프로필은
            </p>
          </div>
          <div className="absolute left-[169px] top-[120px]">
            <p className="lineHeight-caption2 text-display font-bold text-accent-primary-light">
              필로그램
            </p>
          </div>
        </div>
        <div className="absolute right-[100px] top-[95px]">
          <Button
            text="프로필 만들기"
            color="bg-accent-primary-light text-static-white"
            rightIcon="/icons/ArrowDirectionRightWhite.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default LandingSub;

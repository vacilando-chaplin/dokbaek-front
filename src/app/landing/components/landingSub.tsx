import BoxButton from "@/components/atoms/boxButton";
import React from "react";
import ArrowDirectionRight from "../../../../public/icons/ArrowDirectionRight.svg";

const LandingSub = () => {
  return (
    <div className="mx-[auto] mt-[40px] flex w-[100%] flex-col rounded-2xl">
      <div
        className="relative h-[240px] px-[100px]"
        style={{
          background:
            "linear-gradient(275.85deg, rgba(30, 133, 239, 0.08) 0%, rgba(99, 123, 255, 0.08) 100%)",
          borderRadius: "40px"
        }}
      >
        <div className="">
          <div className="absolute top-[80px]">
            <p
              style={{ lineHeight: "40px" }}
              className="text-display font-bold text-accent-primary-light dark:text-accent-primary-dark"
            >
              프로필은
            </p>
          </div>
          <div className="absolute left-[169px] top-[120px]">
            <p
              style={{ lineHeight: "40px" }}
              className="text-display font-bold text-accent-primary-light dark:text-accent-primary-dark"
            >
              필로그램
            </p>
          </div>
        </div>
        <div className="absolute right-[100px] top-[95px]">
          <BoxButton type="primary" size="large">
            프로필 만들기
            <ArrowDirectionRight
              width="16"
              height="16"
              className="fill-current text-content-on_color-light dark:text-content-on_color-dark"
            />
          </BoxButton>
        </div>
      </div>
    </div>
  );
};

export default LandingSub;

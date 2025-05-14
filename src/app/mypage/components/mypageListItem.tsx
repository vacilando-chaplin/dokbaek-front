"use client";

import { useState } from "react";
import ArrowChevronRight from "../../../../public/icons/ArrowChevronRight.svg";

interface MypageListItemProps {
  text: string;
  icon?: boolean;
  negative?: boolean;
  onClick?: () => void;
}

const MypageListItem = ({
  text,
  icon,
  negative,
  onClick
}: MypageListItemProps) => {
  const [active, setActive] = useState(false);

  return (
    <div
      className="interaction-default flex cursor-pointer flex-row items-center justify-between gap-2 rounded-lg bg-background-surface-light px-4 py-3 hover:bg-[#f0f0f0] dark:bg-background-surface-dark"
      onClick={() => (onClick ? onClick() : setActive(!active))}
    >
      <span
        className={`typography-body2 font-medium ${negative ? "text-state-negative-light dark:text-state-negative-dark" : "text-content-primary-light dark:text-content-primary-dark"}`}
      >
        {text}
      </span>
      {icon && (
        <ArrowChevronRight
          width="16"
          height="16"
          className={`interaction-default fill-current text-content-alternative-light dark:text-content-alternative-dark ${active && "rotate-90"}`}
        />
      )}
    </div>
  );
};

export default MypageListItem;

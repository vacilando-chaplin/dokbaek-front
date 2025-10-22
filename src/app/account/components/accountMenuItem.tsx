"use client";

import ArrowChevronRight from "../../../../public/icons/ArrowChevronRight.svg";

interface AccountMenuItemProps {
  text: string;
  icon?: boolean;
  negative?: boolean;
  onClick: () => void;
}

const AccountMenuItem = ({
  text,
  icon,
  negative,
  onClick
}: AccountMenuItemProps) => {
  return (
    <div
      className="interaction-default flex cursor-pointer flex-row items-center justify-between gap-2 rounded-lg bg-background-surface-light px-4 py-3 hover:bg-[#f0f0f0] dark:bg-background-surface-dark"
      onClick={onClick}
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
          className="interaction-default fill-current text-content-alternative-light dark:text-content-alternative-dark"
        />
      )}
    </div>
  );
};

export default AccountMenuItem;

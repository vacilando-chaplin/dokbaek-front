"use client";

import Checkbox from "@/components/atoms/checkbox";

interface WithdrawalCheckboxProps {
  label: string;
  checked: boolean;
  onCheck: React.ChangeEventHandler<HTMLInputElement>;
}

const WithdrawalCheckbox = ({
  label,
  checked,
  onCheck
}: WithdrawalCheckboxProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox size="medium" checked={checked} onChange={onCheck} />
      <span className="typography-body2 font-normal text-content-primary-light dark:text-content-primary-dark">
        {label}
      </span>
    </div>
  );
};

export default WithdrawalCheckbox;

"use client";

import Checkbox from "@/components/atoms/checkbox";

interface WithdrawalCheckboxProps {
  label: string;
  termId: number;
  onCheck: (termId: number) => void;
}

const WithdrawalCheckbox = ({
  label,
  termId,
  onCheck
}: WithdrawalCheckboxProps) => {
  return (
    <div className="flex flex-row items-center gap-2">
      <Checkbox
        size="medium"
        checked={false}
        onChange={() => onCheck(termId)}
      />
      <span className="typography-body2 font-normal text-content-primary-light dark:text-content-primary-dark">
        {label}
      </span>
    </div>
  );
};

export default WithdrawalCheckbox;

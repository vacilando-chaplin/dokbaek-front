"use client";

import { TermsType } from "../type";
import Check from "../../../../../public/icons/Check.svg";
import ArrowChevronRight from "../../../../../public/icons/ArrowChevronRight.svg";

interface TermItemProps {
  term: TermsType;
  termLink: string | undefined;
  onSelect: (term: TermsType) => void;
}

const TermItem = ({ term, termLink, onSelect }: TermItemProps) => {
  return (
    <button
      type="button"
      className="interaction-default flex h-auto w-fit flex-row items-center gap-3 px-5 py-2.5"
      onClick={() => onSelect(term)}
    >
      <Check
        width="20"
        height="20"
        className={`fill-current ${term.agreed ? "text-accent-primary-light dark:text-accent-primary-dark" : "text-content-alternative-light dark:text-content-alternative-dark"}`}
      />
      <div className="flex h-auto w-auto flex-row items-center gap-1">
        <span className="typography-body2 font-medium text-content-primary-light dark:text-content-primary-dark">
          {term.required ? "[필수] " : "[선택] "}
          {term.text}
        </span>
        {termLink && (
          <ArrowChevronRight
            width="16"
            height="16"
            className="fill-current text-content-alternative-light dark:text-content-alternative-dark"
            onClick={() => {
              window.open(termLink, "_blank");
            }}
          />
        )}
      </div>
    </button>
  );
};

export default TermItem;

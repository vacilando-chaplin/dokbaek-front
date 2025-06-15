"use client";

import TermAgreementButton from "./termAgreementButton";
import Check from "../../../../../public/icons/Check.svg";
import { useEffect, useState } from "react";
import TermItem from "./termItem";
import { TermsType } from "../type";
import { termsInit } from "../data";
import { getTerms } from "@/lib/api";
import { TermsDataType } from "@/lib/types";

const TermForm = () => {
  const [terms, setTerms] = useState<TermsType[]>(termsInit);
  const [termsData, setTermsData] = useState<TermsDataType[]>([]);

  const onSelectTerms = (term: TermsType) => {
    setTerms((prev) =>
      prev.map((item) =>
        item.id === term.id ? { ...item, agreed: !item.agreed } : item
      )
    );
  };

  const onSelectAllTerms = () => {
    setTerms((prev) => prev.map((term) => ({ ...term, agreed: true })));
  };

  const isAllRequiredTermsAgreed = terms
    .filter((term) => term.required)
    .every((term) => term.agreed);

  const getTermsAgreed = () => {
    const findAgreementIds = terms
      .filter((term) => term.agreed)
      .map((item) => item.id);

    const termAgreements = termsData
      .filter((term) => findAgreementIds.includes(term.id))
      .map((item) => ({
        termId: item.id,
        agreed: true
      }));

    return termAgreements;
  };

  const findTermsLink = (id: number) => {
    const termsLink = termsData.find(
      (term: TermsDataType) => term.id === id
    )?.url;
    return termsLink;
  };

  useEffect(() => {
    const getTermsItem = async () => {
      const res = await getTerms();
      const data = await res.data.terms;

      setTermsData(data);
    };
    getTermsItem();
  }, []);

  return (
    <div className="flex h-auto w-full flex-col gap-6">
      <div className="flex h-auto w-full flex-col gap-4">
        <button
          type="button"
          className="interaction-default flex h-auto w-full flex-row items-center gap-3 rounded-[14px] bg-gray-100 px-5 py-4 dark:bg-gray-900"
          onClick={onSelectAllTerms}
        >
          <Check
            width="20"
            height="20"
            className={`fill-current ${isAllRequiredTermsAgreed ? "text-accent-primary-light dark:text-accent-primary-dark" : "text-content-alternative-light dark:text-content-alternative-dark"}`}
          />
          <span className="typography-body1 font-medium text-content-primary-light dark:text-content-primary-dark">
            모든 약관 동의
          </span>
        </button>
        <div className="flex h-auto w-full flex-col">
          {terms.map((term: TermsType) => {
            return (
              <TermItem
                key={term.id}
                term={term}
                termLink={findTermsLink(term.id)}
                onSelect={onSelectTerms}
              />
            );
          })}
        </div>
      </div>
      <TermAgreementButton
        termAgreements={getTermsAgreed()}
        isAllRequiredTermsAgreed={isAllRequiredTermsAgreed}
      />
    </div>
  );
};

export default TermForm;

"use client";

import { useEffect, useState } from "react";
import WithdrawalContainer from "./withdrawalContainer";
import WithdrawalCheckbox from "./withdrawalCheckbox";
import { getWithdrawReasons } from "../api";
import { ReasonType } from "../type";

const WithdrawalTerms = () => {
  const [reasonList, setReasonList] = useState<ReasonType[]>([]);
  const [checkedReasons, setCheckedReasons] = useState<number[]>([]);

  const onCheck = (termId: number) => {
    const findCheck = checkedReasons.findIndex((id) => id === termId);

    if (findCheck >= 0) {
      const filteredCheckList = checkedReasons.filter((id) => id !== termId);
      setCheckedReasons(filteredCheckList);
    } else {
      setCheckedReasons([...checkedReasons, termId]);
    }
  };

  useEffect(() => {
    const getReasons = async () => {
      const res = await getWithdrawReasons();
      setReasonList(res);
    };
    getReasons();
  }, []);

  return (
    <WithdrawalContainer title="탈퇴하는 이유가 무엇인가요?">
      {reasonList.map((reason: ReasonType) => {
        return (
          <WithdrawalCheckbox
            key={reason.id}
            label={reason.reason}
            termId={reason.id}
            onCheck={onCheck}
          />
        );
      })}
    </WithdrawalContainer>
  );
};

export default WithdrawalTerms;

"use client";

import WithdrawalContainer from "./withdrawalContainer";
import WithdrawalCheckbox from "./withdrawalCheckbox";
import { useRecoilState } from "recoil";
import { ReasonWithCheckType } from "../type";
import { useEffect } from "react";
import { withdrawalReasons } from "@/lib/recoil/account/withdrawal/atom";

interface WithdrawalReasonsProps {
  initialReasons: ReasonWithCheckType[];
}

const WithdrawalReasons = ({ initialReasons }: WithdrawalReasonsProps) => {
  const [reasons, setReasons] = useRecoilState(withdrawalReasons);

  const onCheck = (id: number) => {
    setReasons((prev) =>
      prev.map((reason) =>
        reason.id === id ? { ...reason, checked: !reason.checked } : reason
      )
    );
  };

  useEffect(() => {
    setReasons(initialReasons);
  }, []);

  return (
    <WithdrawalContainer title="탈퇴하는 이유가 무엇인가요?">
      {reasons &&
        reasons.map((reason: ReasonWithCheckType) => {
          return (
            <WithdrawalCheckbox
              key={reason.id}
              label={reason.reason}
              checked={reason.checked}
              onCheck={() => onCheck(reason.id)}
            />
          );
        })}
    </WithdrawalContainer>
  );
};

export default WithdrawalReasons;

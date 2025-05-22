"use client";

import WithdrawalContainer from "./withdrawalContainer";
import WithdrawalCheckbox from "./withdrawalCheckbox";
import { reasonList } from "../data";
import { useRecoilState } from "recoil";
import { withdrawalReasons } from "@/lib/atoms";

const WithdrawalTerms = () => {
  const [checkedReasons, setCheckedReasons] = useRecoilState(withdrawalReasons);

  const onCheck = (id: number) => {
    const checkedList = checkedReasons.map((reason, index) =>
      index === id ? !reason : reason
    );
    setCheckedReasons(checkedList);
  };

  return (
    <WithdrawalContainer title="탈퇴하는 이유가 무엇인가요?">
      {reasonList.map((reason: string, index: number) => {
        return (
          <WithdrawalCheckbox
            key={reason}
            label={reason}
            checked={checkedReasons[index]}
            onCheck={() => onCheck(index)}
          />
        );
      })}
    </WithdrawalContainer>
  );
};

export default WithdrawalTerms;

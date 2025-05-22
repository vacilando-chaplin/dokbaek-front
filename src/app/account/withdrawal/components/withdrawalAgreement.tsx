"use client";

import WithdrawalCheckbox from "./withdrawalCheckbox";
import { useRecoilState } from "recoil";
import { withdrawalAgreement } from "@/lib/atoms";

const WithdrawalAgreement = () => {
  const [agreement, setAgreement] = useRecoilState(withdrawalAgreement);

  return (
    <WithdrawalCheckbox
      label="회원 탈퇴를 진행하여 필로그램에 귀속된 모든 정보를 삭제하는 데 동의합니다."
      checked={agreement}
      onCheck={() => setAgreement(!agreement)}
    />
  );
};

export default WithdrawalAgreement;

"use client";

import { withdrawalAgreement } from "@/lib/recoil/account/withdrawal/atom";
import WithdrawalCheckbox from "./withdrawalCheckbox";
import { useRecoilState } from "recoil";

const WithdrawalAgreement = () => {
  const [agreement, setAgreement] = useRecoilState(withdrawalAgreement);

  return (
    <WithdrawalCheckbox
      label="회원 탈퇴를 진행하여 독백에 귀속된 모든 정보를 삭제하는 데 동의합니다."
      checked={agreement}
      onCheck={() => setAgreement(!agreement)}
    />
  );
};

export default WithdrawalAgreement;

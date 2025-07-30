"use client";

import BoxButton from "@/components/atoms/boxButton";
import { useRouter } from "next/navigation";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { deleteWithdraw, postWithdrawReason } from "../api";
import { removeStorageData } from "@/lib/utils";
import { ReasonWithCheckType } from "../type";
import {
  withdrawalAgreement,
  withdrawalReasons
} from "@/lib/recoil/account/withdrawal/atom";
import { checkedReasonIds } from "@/lib/recoil/account/withdrawal/selector";
import { routePaths } from "@/constants/routes";
import { loginState } from "@/lib/atoms";

interface WithdrawalConfirmProps {
  initialReasons: ReasonWithCheckType[];
}

const WithdrawalConfirm = ({ initialReasons }: WithdrawalConfirmProps) => {
  const router = useRouter();

  const reasonIds = useRecoilValue(checkedReasonIds);
  const setReasons = useSetRecoilState(withdrawalReasons);
  const setLogin = useSetRecoilState(loginState);
  const [agreement, setAgreement] = useRecoilState(withdrawalAgreement);

  const onCancel = () => {
    setReasons(initialReasons);
    setAgreement(false);

    router.replace(routePaths.account());
  };

  const onConfirm = async () => {
    setReasons(initialReasons);
    setAgreement(false);

    await postWithdrawReason(reasonIds);
    await deleteWithdraw();

    setLogin(false);
    removeStorageData();

    router.replace(routePaths.accountWithdrawalComplete());
  };

  return (
    <div className="flex h-auto w-full flex-row gap-2">
      <BoxButton
        type="secondaryOutlined"
        size="large"
        width="full"
        onClick={onCancel}
      >
        회원 탈퇴 취소
      </BoxButton>
      <BoxButton
        type="primary"
        size="large"
        width="full"
        disabled={!agreement}
        onClick={onConfirm}
      >
        회원 탈퇴
      </BoxButton>
    </div>
  );
};

export default WithdrawalConfirm;

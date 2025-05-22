"use client";

import BoxButton from "@/components/atoms/boxButton";
import { withdrawalAgreement, withdrawalReasons } from "@/lib/atoms";
import { useRouter } from "next/navigation";
import { useRecoilState } from "recoil";
import { deleteWithdraw, postWithdrawReason } from "../api";
import Cookies from "js-cookie";
import { removeStorageData } from "@/lib/utils";

const WithdrawalConfirm = () => {
  const router = useRouter();

  const [terms, setTerms] = useRecoilState(withdrawalReasons);
  const [agreement, setAgreement] = useRecoilState(withdrawalAgreement);

  const onCancel = () => {
    setTerms(Array(5).fill(false));
    setAgreement(false);

    router.replace("/");
  };

  const onConfirm = async () => {
    const reasons = terms.reduce<number[]>((acc, value, index) => {
      if (value) acc.push(index);
      return acc;
    }, []);

    await postWithdrawReason(reasons);
    await deleteWithdraw();

    removeStorageData();

    router.replace("/withdrawal/complete");
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

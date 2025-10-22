import { selector } from "recoil";
import { withdrawalReasons } from "./atom";

export const checkedReasonIds = selector<number[]>({
  key: "checkedReasonIds",
  get: ({ get }) => {
    const reasons = get(withdrawalReasons);
    return reasons
      .filter((reason) => reason.checked)
      .map((reason) => reason.id);
  }
});

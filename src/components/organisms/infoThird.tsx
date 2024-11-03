import { infoInputsTypes } from "@/types/types";
import Title from "../atoms/title";

interface InfoThirdProps {
  infoInputs: infoInputsTypes;
  onInputChange: any;
}

const InfoThird = ({ infoInputs, onInputChange }: InfoThirdProps) => {
  const { introduction } = infoInputs;

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="자기 소개" />
      <div className="flex h-40 w-full flex-col gap-1">
        <textarea
          placeholder="자기소개를 입력해주세요."
          maxLength={500}
          autoComplete="off"
          name="introduction"
          value={introduction}
          onChange={onInputChange}
          className="no-scrollbar h-full w-full resize-none items-start gap-1 rounded-xl border border-border-default-light bg-background-surface-light px-3 py-2 text-body3 font-normal leading-body3 tracking-body3 text-content-primary-light placeholder-content-tertiary-light outline-none"
        />
        <label className="flex h-fit w-full justify-end gap-1 text-caption1 font-normal leading-caption1 tracking-caption1 text-content-secondary-light">
          {introduction.length}/500
        </label>
      </div>
    </section>
  );
};

export default InfoThird;

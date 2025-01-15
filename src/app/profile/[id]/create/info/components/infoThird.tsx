import TextArea from "@/components/atoms/textArea";
import Title from "@/components/atoms/title";
import { InfoInputType } from "../types";

interface InfoThirdProps {
  infoInputs: InfoInputType;
  onInputChange: React.ChangeEventHandler<HTMLTextAreaElement>;
}

const InfoThird = ({ infoInputs, onInputChange }: InfoThirdProps) => {
  const { introduction } = infoInputs;

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8">
      <Title name="자기 소개" />
      <TextArea
        size="medium"
        name="introduction"
        value={introduction}
        limit={500}
        placeholder="자기소개를 입력해주세요."
        onChange={onInputChange}
      />
    </section>
  );
};

export default InfoThird;

import TextArea from "@/components/atoms/textArea";
import Title from "@/components/atoms/title";
import { InfoInputType } from "../types";

interface InfoThirdProps {
  infoInputs: InfoInputType;
  onInputChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  onSaveInfo: () => void;
}

const InfoThird = ({
  infoInputs,
  onInputChange,
  onSaveInfo
}: InfoThirdProps) => {
  const { introduction } = infoInputs;

  return (
    <section className="flex h-auto w-full flex-col gap-6 rounded-2xl bg-background-surface-light p-8 dark:bg-background-surface-dark">
      <Title name="자기 소개" />
      <TextArea
        size="medium"
        name="introduction"
        value={introduction}
        limit={500}
        placeholder="자기소개를 입력해주세요."
        onChange={onInputChange}
        onSave={onSaveInfo}
      />
    </section>
  );
};

export default InfoThird;

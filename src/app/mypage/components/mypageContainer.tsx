import MypageMainContents from "./mypageMainContents";
import MypageSubContents from "./mypageSubContents";

interface MypageContainerProps {
  name: string;
}

const MypageContainer = ({ name }: MypageContainerProps) => {
  return (
    <section className="flex h-auto max-w-[560px] flex-col items-center justify-center gap-10">
      <h1 className="typography-heading2 font-semibold">
        {name}님, 안녕하세요
      </h1>
      <div className="flex flex-col gap-2">
        <MypageMainContents />
        <MypageSubContents />
      </div>
    </section>
  );
};

export default MypageContainer;

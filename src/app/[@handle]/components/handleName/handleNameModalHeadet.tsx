import Title from "@/components/atoms/title";

interface HandleNameModalHeaderProps {
  title: string;
}

const HandleNameModalHeader = ({ title }: HandleNameModalHeaderProps) => {
  return (
    <div className="flex h-auto w-full items-center justify-between gap-3 border-b-[1px] border-border-default-light p-6 dark:border-border-default-dark">
      <Title name={title} />
    </div>
  );
};

export default HandleNameModalHeader;

import FilmoShowcase from "../filmo/filmoShowcase";
import PhotoShowcase from "../photo/photoShowcase";
import VideoShowcase from "../video/videoShowcase";

interface UserProfileShowcaseProps {
  linear: "main" | "sub";
}

const UserProfileShowcase = ({ linear }: UserProfileShowcaseProps) => {
  return (
    <section
      className={`flex h-full w-full flex-col gap-10 p-8 ${linear === "sub" && "border-l-[1px] border-border-default-light dark:border-border-default-dark"}`}
    >
      <PhotoShowcase />
      <FilmoShowcase />
      <VideoShowcase />
    </section>
  );
};

export default UserProfileShowcase;

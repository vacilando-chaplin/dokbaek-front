import HomeProfileListHeaderButton from "../button/homeProfileListHeaderButton";

const HomeProfileListHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <h2 className="typography-heading2 font-semibold text-content-primary-light dark:text-content-primary-dark">
        새로 올라온 프로필
      </h2>
      <HomeProfileListHeaderButton />
    </div>
  );
};

export default HomeProfileListHeader;

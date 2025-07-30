import LandingMain from "./landingMain";
import LandingSub from "./landingSub";

const LandingContainer = () => {
  return (
    <div className="container-max m-[auto] mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      <LandingSub />
      <LandingMain />
    </div>
  );
};

export default LandingContainer;

interface HomeContainerProps {
  children: React.ReactNode;
}

const HomeContainer = ({ children }: HomeContainerProps) => {
  return (
    <div className="container-max m-[auto] mt-12 flex w-[90%] flex-col sm:w-[90%] md:w-[85%] lg:w-[70%]">
      {children}
    </div>
  );
};

export default HomeContainer;

import { Suspense } from "react";
import TermContainer from "./components/termContainer";

const Terms = () => {
  return (
    <Suspense fallback={<div></div>}>
      <TermContainer />
    </Suspense>
  );
};

export default Terms;

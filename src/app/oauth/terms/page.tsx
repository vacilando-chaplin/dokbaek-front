import { Suspense } from "react";
import TermAgreementButton from "./components/termAgreementButton";

const Terms = () => {
  return (
    <Suspense fallback={<div></div>}>
      <TermAgreementButton />
    </Suspense>
  );
};

export default Terms;

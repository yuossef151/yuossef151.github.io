import { useEffect, useState } from "react";
import NowPassword from "../../Components/Passwordpage/NowPassword";
import OTB from "../../Components/Passwordpage/OTB";
import Email from "../../Components/Passwordpage/Email";
import ForgetPassword from "../../Components/Passwordpage/ForgetPassword";

export default function Password() {
  const [step, setStep] = useState(() => {
    const savedStep = sessionStorage.getItem("forgetPasswordStep");
    return savedStep ? Number(savedStep) : 1;
  });
useEffect(() => {

  sessionStorage.setItem("forgetPasswordStep", step);

 
  return () => {
    sessionStorage.removeItem("forgetPasswordStep");
  };
}, [step]);

  return (
    <>
      <ForgetPassword />
      {step === 1 && <Email next={() => setStep(2)} />}
      {step === 2 && <OTB next={() => setStep(3)} />}
      {step === 3 && <NowPassword  next={() => setStep(1)} />}
    </>
  );
}

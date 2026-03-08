import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import { ResetPassword } from "../../API/Auth";
import Email from "./Email";

export default function OTB({ next }) {
  const [errorMessage, setErrorMessage] = useState("");
  const inputsRef = useRef([]);

  const handleSubmit = async (values) => {
    const otp =
      values.d1 + values.d2 + values.d3 + values.d4 + values.d5 + values.d6;

    if (otp.length !== 6) return;
    console.log(localStorage.getItem("Email") || "");

    try {
      await ResetPassword({
        email: localStorage.getItem("Email") || "",
        otp: otp,
      });
      localStorage.setItem("otp", otp);

      sessionStorage.setItem("otpVerified", "true");
      next();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage("The otp is wrong")
      
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5]">
      <div className="lg:w-105 w-full rounded-2xl pt-15 text-center lg:pb-138 pb-10">
        <h2 className="text-[#D9176C] text-xl font-semibold mb-2">
          Reset your password!
        </h2>

        <p className="text-gray-400 text-sm mb-8">
          Enter the 6 digits code that you received on your email
        </p>

        <Formik
          initialValues={{
            d1: "",
            d2: "",
            d3: "",
            d4: "",
            d5: "",
            d6: "",
            email: localStorage.getItem("Email") || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form className="flex flex-col items-center gap-8 w-full px-5 md:px-40 lg:px-0">
              <div className="flex gap-4 w-full  justify-center">
                {[0, 1, 2, 3, 4, 5].map((_, index) => (
                  <Field
                    key={index}
                    name={`d${index + 1}`}
                    innerRef={(el) => (inputsRef.current[index] = el)}
                    maxLength={1}
                    inputMode="numeric"
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      setFieldValue(`d${index + 1}`, value);

                      if (value && index < 5) {
                        inputsRef.current[index + 1]?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      if (
                        e.key === "Backspace" &&
                        !values[`d${index + 1}`] &&
                        index > 0
                      ) {
                        inputsRef.current[index - 1]?.focus();
                      }
                    }}
                    className="otp-field border border-[#2222224D] lg:w-15 lg:h-15 md:w-15 md:h-15 w-11 h-11 text-center text-xl rounded-xl"
                  />
                ))}
              </div>
<p className="text-red-600">{errorMessage}</p>
              <button
                type="submit"
                className="w-full bg-[#D9176C] text-white py-3 rounded-xl text-lg font-medium"
              >
                confirm OTP
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-sm text-gray-500 mt-6">
          Didn’t receive a code?{" "}
          <span className="text-[#D9176C] font-medium cursor-pointer">
            Send again
          </span>
        </p>
      </div>
    </div>
  );
}

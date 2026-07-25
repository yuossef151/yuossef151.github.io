import { Field, Form, Formik } from "formik";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { ResetPassword } from "../../API/Auth";

export default function OTB({ next }) {
  const [errorMessage, setErrorMessage] = useState("");
  const inputsRef = useRef([]);

  const handleSubmit = async (values) => {
    const otp =
      values.d1 + values.d2 + values.d3 + values.d4 + values.d5 + values.d6;

    try {
      setErrorMessage("");
      await ResetPassword({
        email: localStorage.getItem("Email") || "",
        otp: otp,
      });
      localStorage.setItem("otp", otp);
      sessionStorage.setItem("otpVerified", "true");
      next();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage("The OTP code you entered is incorrect.");
    }
  };

  const schema = Yup.object({
    d1: Yup.string().required(),
    d2: Yup.string().required(),
    d3: Yup.string().required(),
    d4: Yup.string().required(),
    d5: Yup.string().required(),
    d6: Yup.string().required(),
  });

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f5f5] px-4">
      <div className="lg:w-140 w-full rounded-2xl pt-10 text-center pb-20">
        <h2 className="text-[#D9176C] text-xl sm:text-2xl font-semibold mb-2">
          Reset your password!
        </h2>

        <p className="text-gray-400 text-xs sm:text-sm mb-8">
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
          }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values, errors, touched, handleSubmit }) => (
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setErrorMessage("");
                handleSubmit(e);
              }}
              className="flex flex-col items-center gap-6 w-full px-0"
            >
              <div className="flex gap-2 sm:gap-4 w-full justify-center">
                {[0, 1, 2, 3, 4, 5].map((_, index) => {
                  const fieldName = `d${index + 1}`;
                  const hasError = (touched[fieldName] && errors[fieldName]) || (Object.keys(touched).length > 0 && errors[fieldName]);

                  return (
                    <Field
                      key={index}
                      name={fieldName}
                      innerRef={(el) => (inputsRef.current[index] = el)}
                      maxLength={1}
                      inputMode="numeric"
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "");
                        setFieldValue(fieldName, value);

                        if (value && index < 5) {
                          inputsRef.current[index + 1]?.focus();
                        }
                      }}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Backspace" &&
                          !values[fieldName] &&
                          index > 0
                        ) {
                          inputsRef.current[index - 1]?.focus();
                        }
                      }}
                      className={`otp-field bg-white lg:w-15 lg:h-15 sm:w-13 sm:h-13 w-10 h-10 text-center text-lg sm:text-xl rounded-xl outline-none border transition-all ${
                        hasError
                          ? "border-red-600 ring-1 ring-red-600"
                          : "border-[#2222224D] focus:border-[#D9176C]"
                      }`}
                    />
                  );
                })}
              </div>

              {Object.keys(touched).length > 0 && Object.keys(errors).length > 0 && (
                <p className="text-red-600 text-xs sm:text-sm font-semibold">
                  The OTP code you entered is incorrect.
                </p>
              )}

              {errorMessage && (
                <p className="text-red-600 text-xs sm:text-sm font-semibold">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#D9176C] cursor-pointer text-white py-3 rounded-xl text-base sm:text-lg font-medium transition-all hover:bg-[#c0125c]"
              >
                Confirm OTP
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-xs sm:text-sm text-gray-500 mt-6">
          Didn’t receive a code?{" "}
          <span className="text-[#D9176C] font-medium cursor-pointer">
            Send again
          </span>
        </p>
      </div>
    </div>
  );
}
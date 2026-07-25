import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { EmailApi } from "../../API/Auth";

export default function Email({ next }) {
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setErrorMessage("");
      const email = await EmailApi(values);
      console.log(values.email);
      localStorage.setItem("Email", values.email);
      next();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage("The email address you entered is incorrect.");
    } finally {
      setSubmitting(false);
    }
  };

  const schema = Yup.object({
    email: Yup.string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
  });

  return (
    <div className="pt-7.5 pb-32 sm:pb-48 bg-[#F5F5F5] min-h-[80vh]">
      <div className="flex flex-col justify-center items-center pt-10 sm:pt-15 px-5">
        <p className="text-[#D9176C] text-lg sm:text-[20px] font-medium">
          Forget Password?
        </p>
        <h3 className="text-[#22222280] text-sm sm:text-base pt-2 pb-8 sm:pb-10 text-center">
          Enter your email to reset your password
        </h3>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="lg:w-140 w-full px-0 sm:px-10 lg:px-0">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm sm:text-base font-medium">
                  Email
                </label>
                <Field
                  className="p-3 sm:p-4 bg-white rounded-lg mt-2 border-[#22222233] border text-sm sm:text-base outline-none focus:border-[#D9176C]"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600 py-1 sm:py-2 font-semibold text-xs sm:text-sm"
                />
              </div>

              {errorMessage && (
                <p className="text-red-600 pt-2 font-semibold text-xs sm:text-sm">
                  {errorMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#D9176C] cursor-pointer w-full text-white py-3 sm:py-[11.5px] rounded-lg mt-8 sm:mt-10 disabled:opacity-50 font-medium text-sm sm:text-base transition-all hover:bg-[#c0125c]"
              >
                {isSubmitting ? "Sending..." : "Send reset code"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import { EmailApi } from "../../API/Auth";

export default function Email({ next }) {
    const [errorMessage, setErrorMessage] = useState("");
  
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const email = await EmailApi(values);
      console.log(values.email);
      localStorage.setItem("Email", values.email);
      next();
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      setErrorMessage("The is Email wrong");
      // alert("not fund is Email");
    } finally {
      setSubmitting(false);
    }
  };

  const schema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  return (
    <div className="pt-7.5 pb-146.75 bg-[#F5F5F5]">
      <div className="flex flex-col justify-center items-center pt-15">
        <p className="text-[#D9176C] text-[20px]">Forget Password?</p>
        <h3 className="text-[#22222280] pt-2 pb-10">
          Enter your email to reset your password
        </h3>

        <Formik
          initialValues={{ email: "" }}
          validationSchema={schema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="lg:w-140 w-full px-5 sm:max-md:px-40 lg:px-0">
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <Field
                  className="p-4 bg-white rounded-lg mt-2 border-[#22222233] border"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-red-600 py-2 font-semibold"
                />
              </div>
<p className="text-red-600">{errorMessage}</p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-[#D9176C] w-full text-white py-[11.5px] rounded-lg mt-10 disabled:opacity-50"
              >
                Send reset code
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

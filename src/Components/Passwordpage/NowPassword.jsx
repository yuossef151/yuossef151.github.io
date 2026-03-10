import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { nowPassword } from "../../API/Auth";

export default function NowPassword({ next }) {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      await nowPassword({
        email: localStorage.getItem("Email") || "",
        otp: localStorage.getItem("otp") || "",
        password: values.password,
        password_confirmation: values.password_confirmation,
      });
      localStorage.removeItem("Email");
      localStorage.removeItem("otp");
      sessionStorage.removeItem("forgetPasswordStep");
      next();
      navigate("/login");
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    } catch (error) {
      console.log(error.response?.data);
    }
  };

  const registerschema = Yup.object({
    password: Yup.string().required(),
    password_confirmation: Yup.string().required(),
  });
  return (
    <>
      <div className="flex flex-col justify-center items-center pt-15 lg:pb-96.5 pb-15 bg-[#F5F5F5]">
        <p className="text-[#D9176C] text-[20px] pb-4">Create new password!</p>
        <h3 className=" text-[#22222280]">Create a strong password</h3>
        <h3 className="pb-10 text-[#22222280] lg:px-0 px-4 text-center">
          Your new password must be different from previous one
        </h3>
        <Formik
          onSubmit={handleSubmit}
          initialValues={{
            password: "",
            password_confirmation: "",
          }}
          validationSchema={registerschema}
        >
          <Form className="lg:w-140 w-full px-5 sm:max-md:px-40 lg:px-0">
            <div className="flex gap-6 my-6"></div>

            <div className="flex flex-col my-6">
              <label htmlFor="password">Password</label>
              <Field
                className="p-4 bg-white rounded-lg mt-2 border border-[#22222233]"
                id="password"
                type="password"
                name="password"
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-600 py-2 font-semibold"
              />
            </div>
            <div className="flex flex-col my-6">
              <label htmlFor="confpassword">Confirm password</label>
              <Field
                className="p-4 bg-white rounded-lg mt-2 border border-[#22222233]"
                id="confpassword"
                type="password"
                name="password_confirmation"
                placeholder="Enter password"
              />
              <ErrorMessage
                name="password_confirmation"
                component={"p"}
                className="text-red-600 py-2 font-semibold"
              />
            </div>
            <div className="flex   pb-10">
              <div className="flex items-center">
                <Field className="me-3 w-4 h-4" id="checkbox" type="checkbox" />
                <label htmlFor="checkbox">Remember me</label>
              </div>
            </div>
            <button
              type="submit"
              className="bg-[#D9176C] w-full text-white py-[11.5px] rounded-lg"
            >
              Sign Up
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}

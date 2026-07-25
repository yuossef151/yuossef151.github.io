import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { nowPassword } from "../../API/Auth";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function NowPassword({ next }) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [apiError, setApiError] = useState("");

  const handleSubmit = async (values) => {
    try {
      setApiError("");
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

      toast.success("Password reset successfully! Please login.", {
        position: "bottom-right",
        duration: 4000,
        style: {
          padding: "16px",
          fontSize: "18px",
          minWidth: "300px",
        },
        iconTheme: {
          primary: "#D9176C",
          secondary: "#fff",
        },
      });
    } catch (error) {
      setApiError(
        error.response?.data?.message || "Something went wrong, please try again."
      );
    }
  };

  const registerschema = Yup.object({
    password: Yup.string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
  });

  return (
    <>
      <div className="flex flex-col justify-center items-center pt-10 sm:pt-15 pb-20 sm:pb-32 bg-[#F5F5F5] px-4 min-h-[80vh]">
        <p className="text-[#D9176C] text-lg sm:text-[20px] font-medium pb-2">
          Create new password!
        </p>
        <h3 className="text-[#22222280] text-sm sm:text-base">
          Create a strong password
        </h3>
        <h3 className="pb-8 sm:pb-10 text-[#22222280] text-xs sm:text-sm text-center">
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
          <Form className="lg:w-140 w-full px-0 sm:px-10 lg:px-0">
            <div className="flex flex-col my-4 relative">
              <label htmlFor="password" className="text-sm sm:text-base font-medium">
                Password
              </label>
              <div className="relative w-full mt-2">
                <Field
                  className="p-3 sm:p-4 bg-white w-full rounded-lg border border-[#22222233] text-sm sm:text-base outline-none focus:border-[#D9176C]"
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter password"
                />
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-[50%] -translate-y-1/2 right-[5%] cursor-pointer text-gray-500"
                >
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </div>
              </div>
              <ErrorMessage
                name="password"
                component={"p"}
                className="text-red-600 py-1 sm:py-2 font-semibold text-xs sm:text-sm"
              />
            </div>

            <div className="flex flex-col my-4 relative">
              <label htmlFor="confpassword" className="text-sm sm:text-base font-medium">
                Confirm password
              </label>
              <div className="relative w-full mt-2">
                <Field
                  className="p-3 sm:p-4 bg-white w-full rounded-lg border border-[#22222233] text-sm sm:text-base outline-none focus:border-[#D9176C]"
                  id="confpassword"
                  type={showConfirmPassword ? "text" : "password"}
                  name="password_confirmation"
                  placeholder="Enter password confirmation"
                />
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-[50%] -translate-y-1/2 right-[5%] cursor-pointer text-gray-500"
                >
                  {showConfirmPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </div>
              </div>
              <ErrorMessage
                name="password_confirmation"
                component={"p"}
                className="text-red-600 py-1 sm:py-2 font-semibold text-xs sm:text-sm"
              />
            </div>

            {apiError && (
              <p className="text-red-600 py-2 font-semibold text-xs sm:text-sm">
                {apiError}
              </p>
            )}

            <button
              type="submit"
              className="bg-[#D9176C] cursor-pointer w-full text-white py-3 sm:py-[11.5px] rounded-lg mt-6 font-medium text-sm sm:text-base transition-all hover:bg-[#c0125c]"
            >
              Reset Password
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
}
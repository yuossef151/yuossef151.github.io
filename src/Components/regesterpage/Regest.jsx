import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerApi } from "../../API/Auth";
import { useMutation } from "@tanstack/react-query";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Regest() {
  const navigate = useNavigate();
  const [see, setsee] = useState(false);
  const [see2, setsee2] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => registerApi(values),
    onSuccess: (form) => {
      const user = form.data.data;
      navigate("/login");
      
      toast.success("Account created successfully! Please log in.", {
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
    },
    onError: (error) => {
      console.log("Registration Error:", error.response?.data);
      console.log("Registration Error:", error.message);
    },
  });

  const handleSubmit = async (values) => {
    mutate(values);
  };

  const registerschema = Yup.object({
    first_name: Yup.string().required("Please enter your first name"),
    last_name: Yup.string().required("Please enter your last name"),
    email: Yup.string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
    password: Yup.string()
      .required("Please enter a password")
      .min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string()
      .required("Please confirm your password")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  return (
    <>
      <div className="bg-[#F5F5F5] pb-10">
        <div className="w-full h-90 inset-0 relative">
          <img
            className="object-cover w-full h-full rotate-180 top-0"
            src="/imglogin.png"
            alt=""
          />
          <div className="absolute w-full h-90 inset-0 bg-[#00000099]"></div>
        </div>
        <div className="flex flex-col justify-center items-center pt-15">
          <p className="text-[#D9176C] text-[20px] font-medium">Welcome Back!</p>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              password_confirmation: "",
            }}
            validationSchema={registerschema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form className="lg:w-140 w-full px-5">
              <div className="flex gap-6 my-6 w-full">
                <div className="flex flex-col lg:grow">
                  <label htmlFor="first">First Name</label>
                  <Field
                    className="p-4 bg-white w-full rounded-lg mt-2 outline-none border border-transparent focus:border-[#D9176C]"
                    id="first"
                    name="first_name"
                    type="text"
                    placeholder="John"
                  />
                  <ErrorMessage
                    name="first_name"
                    component={"p"}
                    className="text-red-600 py-2 font-semibold text-xs sm:text-sm"
                  />
                </div>
                <div className="flex flex-col lg:grow">
                  <label htmlFor="last">Last Name</label>
                  <Field
                    className="p-4 bg-white w-full rounded-lg mt-2 outline-none border border-transparent focus:border-[#D9176C]"
                    id="last"
                    name="last_name"
                    type="text"
                    placeholder="Smith"
                  />
                  <ErrorMessage
                    name="last_name"
                    component={"p"}
                    className="text-red-600 py-2 font-semibold text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <Field
                  className="p-4 bg-white rounded-lg mt-2 outline-none border border-transparent focus:border-[#D9176C]"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component={"p"}
                  className="text-red-600 py-2 font-semibold text-xs sm:text-sm"
                />
                {isError &&
                  error.response?.data?.message?.includes("Duplicate entry") && (
                    <p className="text-red-600 py-2 font-semibold text-xs sm:text-sm">
                      This email already has an account
                    </p>
                  )}
              </div>

              <div className="flex flex-col my-6">
                <label htmlFor="password">Password</label>
                <div className="relative w-full mt-2">
                  <Field
                    className="p-4 bg-white w-full rounded-lg outline-none border border-transparent focus:border-[#D9176C]"
                    id="password"
                    name="password"
                    type={see ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <div
                    onClick={() => {
                      setsee((prev) => !prev);
                    }}
                    className="absolute top-[50%] -translate-y-1/2 right-[5%] cursor-pointer text-gray-500"
                  >
                    {see ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="text-red-600 py-2 font-semibold text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col my-6">
                <label htmlFor="confpassword">Confirm password</label>
                <div className="relative w-full mt-2">
                  <Field
                    className="p-4 bg-white w-full rounded-lg outline-none border border-transparent focus:border-[#D9176C]"
                    id="confpassword"
                    name="password_confirmation"
                    type={see2 ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <div
                    onClick={() => {
                      setsee2((prev) => !prev);
                    }}
                    className="absolute top-[50%] -translate-y-1/2 right-[5%] cursor-pointer text-gray-500"
                  >
                    {see2 ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
                <ErrorMessage
                  name="password_confirmation"
                  component={"p"}
                  className="text-red-600 py-2 font-semibold text-xs sm:text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`bg-[#D9176C] w-full text-white py-[11.5px] rounded-lg font-medium transition-all flex items-center justify-center gap-1 ${
                  isPending ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:bg-[#c0125c]"
                }`}
              >
                <span>Sign Up</span>
                {isPending && (
                  <span className="flex items-center gap-1 ms-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                  </span>
                )}
              </button>

              <div className="flex flex-col w-full items-center">
                <p className="py-10 items-center">
                  Already have an account?{" "}
                  <Link className="text-[#D9176C] font-semibold" to="/login">
                    Login
                  </Link>
                </p>

                <p className="text-gray-500">or</p>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <button
                  type="button"
                  className="bg-white flex items-center cursor-pointer justify-center py-3 rounded-lg gap-2 shadow-sm font-medium"
                >
                  <img className="w-5 h-5" src="/gogle.png" alt="" />
                  Login with Google
                </button>
                <button
                  type="button"
                  className="bg-white flex items-center cursor-pointer justify-center py-3 rounded-lg gap-2 shadow-sm font-medium"
                >
                  <img className="w-5 h-5" src="/fac.png" alt="" />
                  Login with Facebook
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
}
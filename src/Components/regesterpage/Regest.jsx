import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { registerApi } from "../../API/Auth";
import { useMutation } from "@tanstack/react-query";

export default function Regest() {
  const navigate = useNavigate();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => registerApi(values),
    onSuccess: (form) => {
      const user = form.data.data;
      navigate("/login");
    },
    onError: (error) => {
      console.log("Login Error:", error.response?.data);
      console.log("Login Error:", error.message);
    },
  });
  const handleSubmit = async (values) => {
    mutate(values);
  };
  const registerschema = Yup.object({
    first_name: Yup.string().required(),
    last_name: Yup.string().required(),
    email: Yup.string().required().email(),
    password: Yup.string().required().min(8, "Password must be at least 8 characters"),
    password_confirmation: Yup.string().required().oneOf([Yup.ref("password")], "Passwords must match"),
  });
  return (
    <>
      <div className="bg-[#F5F5F5] pb-10">
        <div className=" w-full h-90 inset-0">
          <img
            className=" object-cover w-full h-full rotate-180   top-0 "
            src="/imglogin.png"
            alt=""
          />
          <div className="absolute w-full h-90 inset-0 bg-[#00000099]"></div>
        </div>
        <div className="flex flex-col justify-center items-center pt-15">
          <p className="text-[#D9176C] text-[20px]">Welcome Back!</p>
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
            <Form className="lg:w-140 w-full px-5  ">
              <div className="flex gap-6 my-6 w-full">
                <div className="flex flex-col lg:grow">
                  <label htmlFor="first">First Name</label>
                  <Field
                    className="p-4 bg-white w-full rounded-lg mt-2 "
                    id="first"
                    name="first_name"
                    type="text"
                    placeholder="John"
                  />
                  <ErrorMessage
                    name="first_name"
                    component={"p"}
                    className="text-red-600 py-2 font-semibold"
                  />
                </div>
                <div className="flex flex-col lg:grow">
                  <label htmlFor="last">Last Name </label>
                  <Field
                    className="p-4 bg-white w-full rounded-lg mt-2 "
                    id="last"
                    name="last_name"
                    type="text"
                    placeholder="Smith"
                  />
                  <ErrorMessage
                    name="last_name"
                    component={"p"}
                    className="text-red-600 py-2 font-semibold"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label htmlFor="email">Email</label>
                <Field
                  className="p-4 bg-white rounded-lg mt-2"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component={"p"}
                  className="text-red-600 py-2 font-semibold"
                />
                {isError && error.response?.data?.message.includes("Duplicate entry") &&  (
                  <p className="text-red-600 py-2 font-semibold">
                    This email already has an account
                  </p>
                )}
              </div>
              <div className="flex flex-col my-6">
                <label htmlFor="password">Password</label>
                <Field
                  className="p-4 bg-white rounded-lg mt-2"
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
                  className="p-4 bg-white rounded-lg mt-2"
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
                  <input
                    className="me-3 w-4 h-4 cursor-pointer"
                    id="checkbox"
                    type="checkbox"
                  />
                  <label className="cursor-pointer pe-1" htmlFor="checkbox">Agree with </label>
                </div>
                <Link className="text-[#D9176C]" to="">
                  Terms & Conditions
                </Link>
              </div>
              <button
                type="submit"
                className="bg-[#D9176C] cursor-pointer w-full text-white py-[11.5px] rounded-lg"
              >
                Sign Up
              </button>

              <div className="flex flex-col  w-full items-center">
                <p className="py-10 items-center">
                  Already have an account?
                  <Link className="text-[#D9176C] font-semibold" to="/login">
                    Login
                  </Link>
                </p>

                <p>or</p>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <button className="bg-white flex items-center cursor-pointer  justify-center py-3 rounded-lg gap-2 ">
                  <img className="w-5 h-5" src="/gogle.png" alt="" />
                  Login with Google
                </button>
                <button className="bg-white flex items-center cursor-pointer justify-center py-3 rounded-lg gap-2">
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

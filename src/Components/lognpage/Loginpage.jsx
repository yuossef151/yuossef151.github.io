import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../API/Auth";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
export default function Loginpage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: (values) => loginApi(values),
    onSuccess: (form) => {
      const user = form.data.data;
      localStorage.setItem("token", user.token);
      login(user);
      navigate("/");
      queryClient.invalidateQueries(["cart"]);
      toast.success(`Log In Successfully`, {
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

      setTimeout(() => {
        toast.success(`Welcome back ${user.user.first_name} 👋`, {
          position: "top-center",
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
      }, 1500);
    },
    onError: (error) => {
      console.log("Login Error:", error);
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  const schema = Yup.object({
    email: Yup.string().required().email(),
    password: Yup.string().required(),
  });
  return (
    <>
      <div className="bg-[#F5F5F5] pb-30">
        <div className=" w-full h-90 inset-0">
          <img
            className=" object-cover w-full h-full rotate-180   top-0 "
            src="./public/imglogin.png"
            alt=""
          />
          <div className="absolute w-full h-90 inset-0 bg-[#00000099]"></div>
        </div>
        <div className="flex flex-col justify-center items-center pt-15">
          <p className="text-[#D9176C] text-[20px]">Welcome Back!</p>
          <Formik
            initialValues={{ email: "", password: "", remember: false }}
            validationSchema={schema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form className="lg:w-140 w-full px-5 md:px-40 lg:px-0 ">
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
              </div>
              <div className="flex flex-col my-6">
                <label htmlFor="password">Password</label>
                <Field
                  className="p-4 bg-white rounded-lg mt-2"
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter password"
                />
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="text-red-600 py-2 font-semibold"
                />
                {isError && (
                  <p className="text-red-600 py-2 font-semibold">
                    The email or password is incorrect
                  </p>
                )}
              </div>
              <div className="flex  justify-between pb-10">
                <div className="flex items-center">
                  <Field
                    className="me-3 w-4 h-4"
                    id="checkbox"
                    type="checkbox"
                    name="remember"
                  />
                  <label htmlFor="checkbox">Remember me</label>
                </div>
                <Link className="text-[#D9176C]" to="/Password">
                  Forget password?
                </Link>
              </div>
              <button
                type="submit"
                className="bg-[#D9176C] cursor-pointer  w-full text-white py-[11.5px] rounded-lg"
              >
                Log in
              </button>

              <div className="flex flex-col  w-full items-center">
                <p className="py-10 items-center">
                  Don’t have an account?
                  <Link className="text-[#D9176C] font-semibold" to="/Regester">
                    Signup
                  </Link>
                </p>

                <p>or</p>
              </div>

              <div className="flex flex-col gap-3 pt-6">
                <button className="bg-white flex items-center  justify-center py-3 rounded-lg gap-2 ">
                  <img className="w-5 h-5" src="./public/gogle.png" alt="" />
                  Login with Google
                </button>
                <button className="bg-white flex items-center justify-center py-3 rounded-lg gap-2">
                  <img className="w-5 h-5" src="./public/fac.png" alt="" />
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

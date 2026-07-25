import { Link, useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { loginApi } from "../../API/Auth";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Loginpage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const queryClient = useQueryClient();
  const { mutate, isError, isPending } = useMutation({
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
    email: Yup.string()
      .required("Please enter your email address")
      .email("Please enter a valid email address"),
    password: Yup.string().required("Please enter your password"),
  });
  const [see, setsee] = useState(false);
  const [remm, setremm] = useState(false);

  return (
    <>
      <div className="bg-[#F5F5F5] pb-20 sm:pb-30">
        <div className="w-full h-64 sm:h-80 lg:h-90 relative">
          <img
            className="object-cover w-full h-full rotate-180 top-0"
            src="/imglogin.png"
            alt="Login Background"
          />
          <div className="absolute w-full h-full inset-0 bg-[#00000099]"></div>
        </div>

        <div className="flex flex-col justify-center items-center pt-10 sm:pt-15">
          <p className="text-[#D9176C] text-lg sm:text-[20px] font-medium">
            Welcome Back!
          </p>

          <Formik
            initialValues={{ email: "", password: "", remember: remm }}
            validationSchema={schema}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
          >
            <Form className="lg:w-140 w-full px-5 sm:px-10 lg:px-0">
              <div className="flex flex-col mt-4">
                <label htmlFor="email" className="text-sm sm:text-base font-medium">
                  Email
                </label>
                <Field
                  className="p-3 sm:p-4 bg-white rounded-lg mt-2 text-sm sm:text-base outline-none border border-transparent focus:border-[#D9176C]"
                  id="email"
                  type="email"
                  name="email"
                  placeholder="example@gmail.com"
                />
                <ErrorMessage
                  name="email"
                  component={"p"}
                  className="text-red-600 py-1 sm:py-2 font-semibold text-xs sm:text-sm"
                />
              </div>

              <div className="flex flex-col my-4 sm:my-6 relative">
                <label htmlFor="password" className="text-sm sm:text-base font-medium">
                  Password
                </label>
                <div className="relative w-full mt-2">
                  <Field
                    className="p-3 sm:p-4 bg-white w-full rounded-lg text-sm sm:text-base outline-none border border-transparent focus:border-[#D9176C]"
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
                    {see ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                  </div>
                </div>
                <ErrorMessage
                  name="password"
                  component={"p"}
                  className="text-red-600 py-1 sm:py-2 font-semibold text-xs sm:text-sm"
                />
                {isError && (
                  <p className="text-red-600 py-1 sm:py-2 font-semibold text-xs sm:text-sm">
                    The email or password is incorrect
                  </p>
                )}
              </div>

              <div className="flex justify-between items-center pb-8 sm:pb-10 text-xs sm:text-sm">
                <div className="flex items-center">
                  <Field
                    className="me-2 sm:me-3 w-4 h-4 accent-[#D9176C] cursor-pointer"
                    id="checkbox"
                    type="checkbox"
                    name="remember"
                    onClick={() => {
                      setremm((prev) => !prev);
                    }}
                  />
                  <label htmlFor="checkbox" className="cursor-pointer">
                    Remember me
                  </label>
                </div>
                <Link className="text-[#D9176C] font-medium" to="/Password">
                  Forget password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className={`bg-[#D9176C] w-full text-white py-3 sm:py-[11.5px] rounded-lg font-medium text-sm sm:text-base transition-all flex items-center justify-center gap-1 ${
                  isPending ? "opacity-75 cursor-not-allowed" : "cursor-pointer hover:bg-[#c0125c]"
                }`}
              >
                <span>Log in</span>
                {isPending && (
                  <span className="flex items-center gap-1 ms-1">
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce"></span>
                  </span>
                )}
              </button>

              <div className="flex flex-col w-full items-center text-sm sm:text-base">
                <p className="py-6 sm:py-10">
                  Don’t have an account?{" "}
                  <Link className="text-[#D9176C] font-semibold" to="/Regester">
                    Sign up
                  </Link>
                </p>
                <p className="text-gray-500">or</p>
              </div>

              <div className="flex flex-col gap-3 pt-4 sm:pt-6">
                <button
                  type="button"
                  className="bg-white flex items-center justify-center py-3 rounded-lg gap-2 shadow-sm text-sm sm:text-base font-medium cursor-pointer"
                >
                  <img className="w-5 h-5" src="/gogle.png" alt="Google" />
                  Login with Google
                </button>
                <button
                  type="button"
                  className="bg-white flex items-center justify-center py-3 rounded-lg gap-2 shadow-sm text-sm sm:text-base font-medium cursor-pointer"
                >
                  <img className="w-5 h-5" src="/fac.png" alt="Facebook" />
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
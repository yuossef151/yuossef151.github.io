import { ErrorMessage, Field, Form, Formik } from "formik";
import React, { useEffect, useRef } from "react";
import { message } from "../../API/Auth";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
export default function Message() {
  const textareaRef = useRef(null);

  const { mutate, isPending, isSuccess, isError, error } = useMutation({
    mutationFn: (values) => message(values),
    onSuccess: (data) => {
      console.log(data.data);
    },
    onError: (error) => {
      console.log("Error:", error);
      console.log(error.response.data);
    },
  });

  const handleSubmit = (values) => {
    mutate(values);
  };

  const meesageschema = Yup.object({
    email: Yup.string().required().email(),
    name: Yup.string().required(),
    message: Yup.string()
      .required()
      .min(10, "The message field must be at least 10 characters"),
  });
  const handleResize = () => {
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = el.scrollHeight + "px";
  };
  const about = [
    {
      img: "call.png",
      title: "01123456789",
    },
    {
      img: "chat.png",
      title: "Example@gmail.com",
    },
    {
      img: "marker.png",
      title:
        "adipiscing elit. Mauris et ultricies est. Aliquam in justo varius,",
    },
  ];

  useEffect(() => {
    if (isSuccess && !isPending) {
      toast.success("the message sent successfully", {
        position: "bottom-right",
        duration: 4000,
        iconTheme: { primary: "#D9176C", secondary: "#fff" },
      });
    }
  }, [isSuccess, isPending]);
  return (
    <>
      <div className=" w-full h-full relative  bg-[#3B2F4A] text-white">
        <img
          className="w-full h-full absolute  inset-0  object-cover scale-x-[-1] opacity-20   pointer-events-none"
          src="bgimg.png"
          alt=""
        />
        <div className="lg:pt-30 lg:pb-10 py-15 lg:px-10 px-5 flex flex-col lg:flex-row lg:justify-between lg:gap-48 gap-15">
          <div className="lg:w-148 ">
            <h2 className="text-[38px] font-bold lg:w-[67%] pb-4">
              Have a Questions? Get in Touch
            </h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est. Aliquam in justo varius, sagittis neque ut,
              malesuada leo.
            </p>

            <Formik
              className="w-full"
              initialValues={{
                name: "",
                email: "",
                message: "",
                subject: "old books",
              }}
              validationSchema={meesageschema}
              onSubmit={(values, { resetForm }) => {
                if (isPending) return;
                mutate(values, {
                  onSuccess: () => {
                    resetForm();
                  },
                });
              }}
            >
              <Form className="flex flex-col items-center pt-15 w-full">
                <div className="flex gap-4 w-full">
                  <div className="grow">
                    <Field
                      className="p-4 rounded-lg mt-2 bg-transparent border w-full border-white/20"
                      name="name"
                      placeholder="Name"
                    />
                    <ErrorMessage
                      name="name"
                      component={"p"}
                      className="text-red-600 py-2 font-semibold"
                    />
                  </div>
                  <div className="grow">
                    <Field
                      className="p-4 rounded-lg mt-2 bg-transparent border w-full border-white/20"
                      name="email"
                      placeholder="example@gmail.com"
                    />
                    <ErrorMessage
                      name="email"
                      component={"p"}
                      className="text-red-600 py-2 font-semibold"
                    />
                  </div>
                </div>

                <Field
                  as="textarea"
                  name="message"
                  rows={1}
                  onInput={handleResize}
                  innerRef={textareaRef}
                  placeholder="Your Message"
                  className="
            min-h-38
              w-full
              resize-none
              overflow-hidden
              rounded-xl
              bg-transparent
              text-white
              pl-4
              pr-4
              py-3
              outline-none
              border
              border-white/20
              focus:border-purple-400
              placeholder:text-gray-300
              mt-4
            "
                />
                <ErrorMessage
                  name="message"
                  component={"p"}
                  className="text-red-600 py-2 font-semibold"
                />
                <button
                  disabled={isPending}
                  className={`py-3 mt-10 text-[18px] px-9.5 rounded-lg flex items-center justify-center gap-2
    ${isPending ? "bg-gray-400 cursor-not-allowed" : "bg-[#D9176C] cursor-pointer text-white"}
  `}
                  type="submit"
                >
                  {isPending ? (
                    <>
                      <ImSpinner2
                        className="animate-spin text-white"
                        size={18}
                      />
                      Sending...
                    </>
                  ) : (
                    "Send Message"
                  )}
                </button>
              </Form>
            </Formik>
          </div>
          <div className="flex  flex-col   gap-5">
            {about.map((el, endix) => {
              return (
                <div className="flex gap-4 items-center" key={endix}>
                  <div className="p-3.5 bg-white  rounded-lg">
                    <img src={el.img} alt="" />
                  </div>
                  <p className="w-57.5">{el.title}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

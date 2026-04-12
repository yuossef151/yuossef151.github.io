import Book from "../bookspage/Book";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckOutAPI, OrderAPI } from "../../API/Auth";
import Swal from "sweetalert2";
import * as Yup from "yup";

export default function Ordar() {
  const { user } = useContext(AuthContext);
  const token = localStorage.getItem("token");
  const mydata = localStorage.getItem("contactData");
  const [selected, setSelected] = useState("");
  const queryClient = useQueryClient();
  const formikref = useRef();
  const { data: books = [] } = useQuery({
    queryKey: ["ordar", token],
    queryFn: async () => {
      if (!token) throw new Error("No token");

      const res = await OrderAPI();
      console.log(res);

      return res.data?.data || [];
    },
    enabled: !!token,
    retry: false,
  });
  //jj
  console.log(books);
  console.log(user);

  const getPaymentMethod = (method) => {
    switch (method) {
      case "Online payment":
        return "1";
      case "Cash on delivery":
        return "2";
      case "POS on delivery":
        return "3";
      default:
        return "";
    }
  };

  const checkoutMutation = useMutation({
    mutationFn: (payload) => CheckOutAPI(payload),

    onSuccess: async () => {
      Swal.fire({
        html: `
<div class="text-center p-5 ">

  <div class="bg-[#34A853] rounded-full flex items-center justify-center mx-auto mb-5
              w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">

    <img src="/sacspng.png"
         alt=""
         class="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14" />

  </div>

  <h2 class="mb-2 text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">
    Successful!
  </h2>
  <p class="text-gray-500 mb-6 text-sm sm:text-base md:text-lg">
    Your order has been confirmed
  </p>
  <button id="continueBtn"
    class="bg-[#D9176C] text-white border-0 w-full
           py-3 sm:py-3 md:py-4
           rounded-lg cursor-pointer
           text-sm sm:text-base md:text-lg
           hover:opacity-90 transition">

    Keep shopping
  </button>

</div>
  `,
        showConfirmButton: false,
        showCloseButton: true,
        didOpen: () => {
          document
            .getElementById("continueBtn")
            .addEventListener("click", () => {
              Swal.close();
              window.scrollTo(0, 0);
              window.location.href = "#/Books";
            });
        },
      });

      formikref.current?.resetForm({
        values: {
          name: "",
          phone: "",
          email: "",
          city: "",
          state: "",
          zip: "",
          address: "",
          paymentMethod: "",
        },
      });
      queryClient.setQueryData(["cart"], {
        books: [],
        totalItems: 0,
      });
      queryClient.removeQueries({ queryKey: ["ordar", token] });
      await queryClient.invalidateQueries({ queryKey: ["ordar", token] });
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },

    onError: (err) => {
      console.log(err.response?.data);
    },
  });

  const handleSubmit = async (values) => {
    const payload = {
      name: values.name,
      phone: values.phone,
      email: values.email,
      address: values.address,
      payment_method: getPaymentMethod(values.paymentMethod),
      government: "Unknown",
      state: values.state,
      zip: values.zip,
      city: values.city,
    };
    checkoutMutation.mutate(payload);
    console.log(payload);
  };

  const schema = Yup.object({
    phone: Yup.string().required(),
    city: Yup.string().required(),
    state: Yup.string().required(),
    zip: Yup.string().required(),
    address: Yup.string().required(),
    paymentMethod: Yup.string().required("Please select a payment method"),
  });

//   useEffect(() => {
//   if (formikref.current && user) {
//     formikref.current.setValues({
//       name: user?.data?.first_name || user?.user?.first_name || "",
//       phone: user?.data?.phone || user?.user?.phone || "",
//       email: user?.data?.email || user?.user?.email || "",
//       address: user?.data?.address || user?.user?.address || "",
//       city: "",
//       state: "",
//       zip: "",
//       paymentMethod: "",
//     });
//   }
// }, [user]);
  return (
    <>
      <Book />
      <div className="bg-[#F5F5F5] p-5 lg:p-10 flex flex-col sm:max-md:flex-col lg:flex-row justify-around">
        <div>
          <Formik
            innerRef={formikref}
            enableReinitialize
            validationSchema={schema}
            initialValues={{
              name: user?.data?.first_name || user?.user?.first_name || "",
              phone: user?.data?.phone || user?.user?.phone || "",
              email: user?.data?.email || user?.user?.email || "",
              city: "",
              state: "",
              zip: "",
              address: user?.data?.address || user?.user?.address || "",
              paymentMethod: "",
            }}
            onSubmit={handleSubmit}
          >
            {({ values, submitForm, setFieldValue }) => (
              <Form className=" lg:w-190.75 w-full flex flex-col items-center">
                <div className="bg-white p-10 w-full rounded-lg">
                  <p className=" text-[20px] font-semibold">
                    Shipping information
                  </p>
                  <div className="flex lg:flex-row flex-col gap-6 my-6">
                    <div className="flex flex-col  grow">
                      <label
                        htmlFor="name"
                        className="text-[#22222280] pb-2.5 ps-2"
                      >
                        Name
                      </label>
                      <Field
                        name="name"
                        className="p-3 border rounded-lg w-full"
                        readOnly
                      />
                      <ErrorMessage
                        name="name"
                        component={"p"}
                        className="text-red-600 py-2 font-semibold"
                      />
                    </div>

                    <div className="flex flex-col grow">
                      <label className="text-[#22222280] pb-2.5 ps-2">
                        Phone
                      </label>
                      <Field name="phone" className="p-3 border rounded-lg" />
                      <ErrorMessage
                        name="phone"
                        component={"p"}
                        className="text-red-600 py-2 font-semibold"
                      />
                    </div>
                  </div>
                  <div className="flex lg:flex-row flex-col gap-6 my-6">
                    <div className="flex flex-col  grow">
                      <label className="text-[#22222280] pb-2.5 ps-2">
                        Email
                      </label>
                      <Field
                        name="email"
                        type="email"
                        className="p-3 border rounded-lg"
                        readOnly
                      />
                      <ErrorMessage
                        name="email"
                        component={"p"}
                        className="text-red-600 py-2 font-semibold"
                      />
                    </div>

                    <div className="flex flex-col grow">
                      <label className="text-[#22222280] pb-2.5 ps-2">
                        City
                      </label>
                      <Field name="city" className="p-3 border rounded-lg" />
                      <ErrorMessage
                        name="city"
                        component={"p"}
                        className="text-red-600 py-2 font-semibold"
                      />
                    </div>
                  </div>
                  <div className="flex lg:flex-row flex-col gap-6 my-6">
                    <div className="flex flex-col  grow">
                      <label className="text-[#22222280] pb-2.5 ps-2">
                        State
                      </label>
                      <Field
                        name="state"
                        className="p-3 border rounded-lg w-full"
                      />
                      <ErrorMessage
                        name="state"
                        component={"p"}
                        className="text-red-600 py-2 font-semibold"
                      />
                    </div>

                    <div className="flex flex-col grow">
                      <label className="text-[#22222280] pb-2.5 ps-2">
                        Zip
                      </label>
                      <Field name="zip" className="p-3 border rounded-lg" />
                      <ErrorMessage
                        name="zip"
                        component={"p"}
                        className="text-red-600 py-2 font-semibold"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col my-4">
                    <label className="text-[#22222280] pb-2.5">Address</label>
                    <Field name="address" className="p-3 border rounded-lg" />
                    <ErrorMessage
                      name="address"
                      component={"p"}
                      className="text-red-600 py-2 font-semibold"
                    />
                  </div>
                </div>
                <div className="  mt-5 p-6 rounded-lg bg-white w-full">
                  <p className="text-[20px] font-semibold">Payment Method</p>
                  <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 sm:max-md:gap-0 pt-5 justify-between">
                    {[
                      "Online payment",
                      "Cash on delivery",
                      "POS on delivery",
                    ].map((method) => (
                      <label
                        key={method}
                        className={`flex items-center gap-3 py-3 px-8 sm:max-md:px-6 rounded-lg border cursor-pointer
                    ${values.paymentMethod === method ? "border-[#D9176C] text-[#D9176C] bg-[#D9176C1A]" : "border-gray-300 text-black"}
                    `}
                      >
                        <Field
                          type="radio"
                          name="paymentMethod"
                          value={method}
                          className="hidden"
                          onChange={() =>
                            setFieldValue("paymentMethod", method)
                          }
                        />
                        <span
                          className={`w-4 h-4 rounded-full border-2 shrink-0
                    ${values.paymentMethod === method ? "border-[#D9176C] border-4 bg-white" : "border-gray-300 bg-white"}
                    `}
                        ></span>
                        {method}
                      </label>
                    ))}
                  </div>
                  <ErrorMessage
                    name="paymentMethod"
                    component="p"
                    className="text-red-600 font-semibold mt-3 text-center"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
        <div className="bg-white sm:max-md:mt-10 lg:mt-0 mt-5 lg:p-10 p-5 rounded-lg">
          <div>
            <p className="pb-5 text-[20px] font-semibold">Order summary</p>
            <div className="relative">
              <div
                className="flex flex-col gap-6 py-8 
                        max-h-112.5  pr-4 overflow-y-auto 
                        scrollbar-thin scrollbar-thumb-[#D9176C] scrollbar-track-gray-100/30"
              >
                {books?.books?.map((el, index) => (
                  <div
                    key={el?.bookDetails?.bookId || index}
                    className="flex gap-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
                  >
                    <img
                      className="w-24 h-36 object-cover rounded-lg"
                      src="/book-1.png"
                      alt={el?.bookDetails?.bookName}
                    />
                    <div className="flex flex-col justify-between w-full">
                      <div>
                        <p className="text-[16px] font-semibold text-gray-900 line-clamp-1">
                          {el?.bookDetails?.bookName}
                        </p>
                        <p className="text-gray-500 text-sm">
                          Author:{" "}
                          <span className="text-gray-900">
                            {el?.bookDetails?.author}
                          </span>
                        </p>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-lg font-bold text-gray-900">
                          ${el?.bookDetails?.price * el?.qty}
                        </p>
                        <p className="text-lg font-medium text-gray-700">
                          {el?.qty}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="absolute top-0 right-0 h-full w-2 bg-transparent pointer-events-none"></div>
            </div>
          </div>
          <div>
            <div className="py-10">
              <p>Have a discount code?</p>
              <div className="flex gap-5 relative pt-6">
                <img
                  className="absolute top-[51%] left-4 w-5 h-5"
                  src="/ticket.png"
                  alt=""
                />
                <input
                  className="ps-10 border border-[#22222233]   rounded-lg py-3 w-full"
                  type="text"
                  placeholder="Enter Promo Code"
                />
                <button className="bg-[#3B2F4A]  px-4 py-2 text-white  rounded-lg">
                  Apply
                </button>
              </div>
            </div>
            <div>
              <div className="flex flex-col border-t border-[#22222233] py-4 gap-4 ">
                <div className="flex justify-between">
                  <p className="text-[16px] text-[#22222280]">Subtotal</p>
                  <p className="text-[20px] font-semibold">
                    ${books?.subTotal?.toFixed(2) || "0"}
                  </p>
                </div>
                <div className="flex justify-between">
                  <p className="text-[16px] text-[#22222280]">Tax</p>
                  <p className="text-[20px] font-semibold">
                    ${books?.tax || "0"}
                  </p>
                </div>
              </div>
              <div className="flex flex-col border-t border-[#22222233] py-4 gap-4 ">
                <div className="flex justify-between">
                  <p className="text-[20px] font-semibold text-[#22222280]">
                    Total (USD)
                  </p>
                  <p className="text-[#D9176C] text-[24px] font-semibold">
                    ${books?.total?.toFixed(2) || "0"}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => formikref.current?.submitForm()}
                className="w-full bg-[#D9176C] text-white py-3 rounded-lg cursor-pointer"
              >
                Confirm order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

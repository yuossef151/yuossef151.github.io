import React, { useContext, useEffect } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"; 
import { profile, updateprofile } from "../../API/Auth";
import { AuthContext } from "../../context/AuthContext";

const profileSchema = Yup.object().shape({
  phone: Yup.string(),
  address: Yup.string().test(
    "len",
    "Address must be at least 10 characters long",
    (val) => !val || val.length >= 10
  ),
});

export default function Myprofile() {
  const { user, setUser } = useContext(AuthContext);

  useEffect(() => {
    const userdata = async () => {
      try {
        const mydata = await profile();
        setUser(mydata.data);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };
    userdata();
  }, [setUser]);

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("first_name", values.first_name || "");
      formData.append("last_name", values.last_name || "");
      formData.append("email", values.email || "");
      formData.append("phone", values.phone || "");
      formData.append("address", values.address || "");

      const Updatedata = await updateprofile(formData);

      setUser((prevUser) => ({
        ...prevUser,
        data: {
          ...prevUser?.data,
          ...Updatedata.data.data,
        },
      }));

toast.success("Profile updated successfully!", {
        position: "top-right",
        autoClose: 3000,
        className: "bg-white border-l-4 border-[#D9176C] text-gray-800 font-medium shadow-md",
        bodyClassName: "text-sm",
        progressClassName: "bg-[#D9176C]", 
      });

    } catch (error) {
      console.log("Error details:", error.response?.data);
      toast.error("Failed to update profile!"); 
    }
  };

  if (!user || !user.data) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#F5F5F5]">
        <p className="text-lg text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] pb-30 relative">
      <ToastContainer />

      <div className="w-full h-90 inset-0 relative">
        <img
          className="object-cover w-full h-full rotate-180"
          src="/imglogin.png"
          alt=""
        />
        <div className="absolute w-full h-90 inset-0 bg-[#00000099]"></div>
      </div>

      <div className="flex justify-center flex-col gap-10 items-center relative">
        <div className="w-45 h-45 absolute -top-10">
          <img
            className="w-full h-full rounded-[50%]"
            src="/profile.jpg"
            alt=""
          />
          <div className="w-8 h-8 absolute bg-[#D9176C] rounded-[50%] bottom-4 right-4 flex justify-center items-center">
            <img className="w-4 h-4" src="/pen.png" alt="" />
          </div>
        </div>

        <Formik
          enableReinitialize
          initialValues={{
            first_name: user.data.first_name || "",
            last_name: user.data.last_name || "",
            email: user.data.email || "",
            phone: user.data.phone || "",
            address: user.data.address || "",
          }}
          validationSchema={profileSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="lg:w-190.75 w-full mt-55 px-5 flex flex-col items-center">
              <div className="bg-white p-6 w-full rounded-lg">
                <div className="flex gap-6 my-6">
                  <div className="flex flex-col grow">
                    <label className="text-[#22222280] pb-2.5">
                      First Name
                    </label>
                    <Field
                      name="first_name"
                      className="p-4 border rounded-lg w-full bg-gray-50"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col grow">
                    <label className="text-[#22222280] pb-2.5">Last Name</label>
                    <Field
                      name="last_name"
                      className="p-4 border rounded-lg w-full bg-gray-50"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col my-4">
                  <label className="text-[#22222280] pb-2.5">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="p-4 border rounded-lg bg-gray-50"
                    readOnly
                  />
                </div>

                <div className="flex flex-col my-4">
                  <label className="text-[#22222280] pb-2.5">Phone</label>
                  <Field name="phone" className="p-4 border rounded-lg" />
                </div>

                <div className="flex flex-col my-4">
                  <label className="text-[#22222280] pb-2.5">Address</label>
                  <Field
                    name="address"
                    className={`p-4 border rounded-lg ${
                      errors.address && touched.address ? "border-red-500" : ""
                    }`}
                  />
                  <ErrorMessage
                    name="address"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#D9176C] w-70 mt-10 text-white py-[11.5px] rounded-lg cursor-pointer"
              >
                Update information
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { profile, updateprofile } from "../../API/Auth";
export default function Myprofile() {
  const [user, setuser] = useState({});

  useEffect(() => {
    const userdata = async () => {
      try {
        const mydata = await profile();
        setuser(mydata.data);
        console.log(mydata.data.data);
      } catch (error) {
        console.log(error.response?.data || error);
      }
    };
    userdata();
    console.log(user.data);
  }, []);

  const handleSubmit = async (values, { setValues }) => {
    try {
      const Updatedata = await updateprofile({
        phone: values.phone,
        address: values.address,
      });

      setValues({
        ...values,
        phone: Updatedata.data.data.phone,
        address: Updatedata.data.data.address,
      });
      // setuser(Updatedata.data.data);
      setuser({ data: { ...user.data, ...Updatedata.data.data } });

      alert("Profile updated successfully!");
    } catch (error) {
      console.log(error.response?.data || error);
    }
  };

  return (
    <div className="bg-[#F5F5F5] pb-30">
      <div className="w-full h-90 inset-0 relative">
        <img
          className="object-cover w-full h-full rotate-180"
          src="./public/imglogin.png"
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
            first_name: user.data?.first_name || "",
            last_name: user.data?.last_name || "",
            email: user.data?.email || "",
            phone: user.data?.phone || "",
            address: user.data?.address || "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, setValues }) => (
            <Form className=" lg:w-190.75 w-full mt-55 px-5 flex flex-col items-center">
              <div className="bg-white p-6 w-full rounded-lg">
                <div className="flex gap-6 my-6">
                  <div className="flex flex-col  grow">
                    <label className="text-[#22222280] pb-2.5">
                      First Name
                    </label>
                    <Field
                      name="first_name"
                      className="p-4 border rounded-lg w-full"
                      readOnly
                    />
                  </div>

                  <div className="flex flex-col grow">
                    <label className="text-[#22222280] pb-2.5">Last Name</label>
                    <Field
                      name="last_name"
                      className="p-4 border rounded-lg w-full"
                      readOnly
                    />
                  </div>
                </div>

                <div className="flex flex-col my-4">
                  <label className="text-[#22222280] pb-2.5">Email</label>
                  <Field
                    name="email"
                    type="email"
                    className="p-4 border rounded-lg"
                    readOnly
                  />
                </div>

                <div className="flex flex-col my-4">
                  <label className="text-[#22222280] pb-2.5">Phone</label>
                  <Field name="phone" className="p-4 border rounded-lg" />
                </div>

                <div className="flex flex-col my-4">
                  <label className="text-[#22222280] pb-2.5">Address</label>
                  <Field name="address" className="p-4 border rounded-lg" />
                </div>
              </div>

              <button
                type="submit"
                className="bg-[#D9176C] w-70 mt-10  text-white py-[11.5px] rounded-lg"
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

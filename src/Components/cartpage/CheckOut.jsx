import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderAPI } from "../../API/Auth";
import { useEffect } from "react";
import { NavLink } from "react-router-dom";

export default function CheckOut() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const { data: ordardata, isLoading } = useQuery({
    queryKey: ["ordar", token],
    queryFn: async () => {
      try {
        const res = await OrderAPI();                
        return res.data.data;
      } catch (error) {
        if (error.response?.status === 404) {
          return {
            subTotal: 0,
            tax: 0,
            total: 0,
            books: [],
          };
        }
        throw error;
      }
    },
    staleTime: 0,
  });

  const result = ordardata?.subTotal?.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });

  const result2 = ordardata?.total?.toLocaleString("en-US", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 2,
  });
  useEffect(() => {
    console.log("order data:", ordardata);
  }, [ordardata]);

  return (
    <>
      <div className="flex sm:max-md:flex-row lg:flex-row flex-col bg-[#3B2F4A1A] lg:mx-15 px-5 gap-15 lg:px-15 sm:max-md:px-5 sm:max-md:items-center pt-10 pb-10 lg:gap-20 sm:max-md:gap-10 mt-15  mb-20">
        <div className="  lg:w-[60%] sm:max-md:w-95  ">
          <div className="pb-23.5">
            <p className="text-[26px] font-bold pb-4">Payment Summary</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et
              ultricies est. Aliquam in justo varius, sagittis neque ut,
              malesuada leo.
            </p>
          </div>
          <div>
            <p>Have a discount code?</p>
            <div className="flex gap-5 relative pt-6">
              <img
                className="absolute top-[51%] left-4 w-5 h-5"
                src="/ticket.png"
                alt=""
              />
              <input
                className="ps-10 border   rounded-lg py-3 w-75"
                type="text"
                placeholder="Enter Promo Code"
              />
              <button className="bg-[#3B2F4A]  px-4 py-2 text-white  rounded-lg">
                Apply
              </button>
            </div>
          </div>
        </div>
        <div className="lg:w-[40%] sm:max-md:w-95 flex flex-col justify-start">
          <div className="flex w-full justify-between pb-5">
            <p className="text-[20px] text-[#22222280] self-center ">
              Subtotal
            </p>
            <p className="text-[#D9176C] text-[28px] font-bold">${result}</p>
          </div>
          <div className="flex w-full justify-between pb-5">
            <p className="text-[20px] text-[#22222280] self-center ">Tax</p>
            <p className="text-[#D9176C] text-[28px] font-bold">
              {ordardata?.tax}
            </p>
          </div>
          <div className="flex w-full justify-between">
            <p className="text-[20px] text-[#22222280] self-center ">Total</p>
            <p className="text-[#D9176C] text-[28px] font-bold">${result2}</p>
          </div>
          <div className="flex flex-col w-full gap-3 pt-10">
            <NavLink
              to={"/Ordar"}
              className="bg-[#D9176C] text-white py-3.25 rounded-lg flex justify-center"
            >
              Check out
            </NavLink>
            <NavLink
              to={"/Books"}
              className="text-[#D9176C] border border-[#D9176C] py-3.25 rounded-lg flex  justify-center"
            >
              Keep Shopping
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

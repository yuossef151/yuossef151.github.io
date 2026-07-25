import React, { useState } from "react";
import Book from "../bookspage/Book";
import { useQuery } from "@tanstack/react-query";
import { OrdardataAPI, OrdarHestoryAPI } from "../../API/Auth";
import { FaArrowRight, FaBoxOpen } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im"; 

export default function MyOrdarhistory() {
  const [SelectedOrderId, setSelectedOrderId] = useState(null);
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  
  const { data, isLoading, error } = useQuery({
    queryKey: ["ordar"],
    queryFn: async () => {
      const res = await OrdarHestoryAPI();
      return res.data;
    },
  });
  const myordar = data?.data;

  const { data: orderDetails, isLoading: loding } = useQuery({
    queryKey: ["orderDetails", expandedOrderId],
    queryFn: async () => {
      const res = await OrdardataAPI(expandedOrderId);
      return res.data.data;
    },
    enabled: !!expandedOrderId,
  });

  return (
    <>
      <div className="min-h-screen bg-[#F5F5F5]">
        <Book />

        <div className="flex flex-col gap-10 lg:p-10 p-5">
          {isLoading ? (
            <div className="flex items-center justify-center py-20 text-gray-500 gap-2 text-lg">
              <ImSpinner2 className="animate-spin text-[#D9176C]" size={28} />
              Loading order history...
            </div>
          ) : myordar && myordar.length > 0 ? (
            myordar.map((el, index) => {
              const isExpanded = expandedOrderId === el.id;

              return (
                <div
                  key={index}
                  className="bg-white lg:p-10 p-5 border-[#D9176C33] border rounded-[20px] transition-all duration-300"
                >
                  <div className="flex justify-between">
                    <div className="flex flex-col gap-5 text-[#22222280] font-normal lg:text-[20px]">
                      <p>Order Code :</p>
                      <p>Status :</p>
                      <p>Date :</p>
                      <p>Address :</p>
                    </div>
                    <div className="flex flex-col gap-5 font-semibold lg:text-[20px]">
                      <p>{el.order_code}</p>
                      <p>{el.status}</p>
                      <p>{el.created_at}</p>
                      <p>{el.address}</p>
                    </div>
                  </div>

                  <div className="pt-10 flex items-center gap-4 text-[18px] font-medium text-[#D9176C]">
                    <button
                      onClick={() => {
                        setSelectedOrderId(el.id);
                        setExpandedOrderId(
                          expandedOrderId === el.id ? null : el.id
                        );
                      }}
                      className="flex items-center gap-2 focus:outline-none cursor-pointer"
                    >
                      <span>
                        {isExpanded ? "Hide order detail" : "View order detail"}
                      </span>
                      <FaArrowRight
                        className={`transition-transform duration-300 ${
                          isExpanded ? "rotate-90" : "rotate-0"
                        }`}
                      />
                    </button>
                  </div>

                  <div
                    className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded
                        ? "grid-rows-[1fr] opacity-100 mt-10 pt-3 border-t-2"
                        : "grid-rows-[0fr] opacity-0 mt-0 pt-0 border-t-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <h3 className="font-bold mb-2">Order Items</h3>

                      {loding && isExpanded ? (
                        <div className="flex items-center justify-center py-6 text-gray-500 gap-2 text-sm">
                          <ImSpinner2 className="animate-spin text-[#D9176C]" size={20} />
                          Loading items...
                        </div>
                      ) : (
                        <div className="flex flex-col gap-6 py-8 max-h-112.5 pr-4 overflow-y-auto scrollbar-thin scrollbar-thumb-[#D9176C] scrollbar-track-gray-100/30">
                          {orderDetails?.Details?.map((item, i) => {
                            return (
                              <div
                                key={item.bookId || i}
                                className="flex gap-4 bg-white shadow-md rounded-xl border-[#d2d0d0] border-2 p-4 hover:shadow-lg transition-shadow duration-300"
                              >
                                <div className="flex flex-col justify-between w-full">
                                  <div>
                                    <p className="text-[16px] font-semibold text-gray-900 line-clamp-1">
                                      {item?.book?.bookName}
                                    </p>

                                    <p className="text-gray-500 text-sm">
                                      Author:
                                      <span className="text-gray-900">
                                        {item?.book?.author}
                                      </span>
                                    </p>
                                  </div>

                                  <div className="flex justify-between items-center mt-2">
                                    <p className="lg:text-lg font-bold text-gray-900">
                                      ${(item?.price * item?.qty).toFixed(2)}
                                    </p>

                                    <p className="lg:text-lg font-medium text-gray-700">
                                      Qty: {item?.qty}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="flex flex-col items-center justify-center bg-white border border-[#D9176C33] rounded-[20px] lg:p-12 md:p-8 p-6 text-center shadow-sm my-10">
              <div className="p-4 bg-pink-50 rounded-full text-[#D9176C] mb-4">
                <FaBoxOpen size={48} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">No Orders Found Yet</h3>
              <p className="text-gray-500 text-base max-w-md">
                You haven't placed any orders yet. Browse available books and place your first order now!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
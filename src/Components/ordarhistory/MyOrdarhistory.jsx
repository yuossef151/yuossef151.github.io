import React, { useState } from "react";
import Book from "../bookspage/Book";
import { useQuery } from "@tanstack/react-query";
import { OrdardataAPI, OrdarHestoryAPI } from "../../API/Auth";
import { FaArrowRight } from "react-icons/fa";

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

  const { data: orderDetails } = useQuery({
    queryKey: ["orderDetails", expandedOrderId],
    queryFn: async () => {
      const res = await OrdardataAPI(expandedOrderId);
      return res.data.data;
    },
    enabled: !!expandedOrderId,
  });

  console.log(myordar);

  return (
    <>
      <div className="bg-[#F5F5F5]">
        <Book />

        <div className="flex flex-col gap-10 lg:p-10 p-5">
          {myordar?.map((el, index) => {
            return (
              <div
                key={index}
                className=" bg-white lg:p-10 p-5  border-[#D9176C33] border rounded-[20px] "
              >
                <div className="flex  justify-between">
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
                {expandedOrderId === el.id && orderDetails && (
                  <div className="mt-10 pt-3  border-t-2">
                    <h3 className="font-bold mb-2">Order Items</h3>
                    <div
                      className="flex flex-col gap-6 py-8  mt-10
               max-h-112.5 pr-4 overflow-y-auto 
               scrollbar-thin scrollbar-thumb-[#D9176C] scrollbar-track-gray-100/30"
                    >
                      {orderDetails?.Details?.map((item, index) => (
                        <div
                          key={item.bookId || index}
                          className="flex gap-4 bg-white shadow-md rounded-xl p-4 hover:shadow-lg transition-shadow duration-300"
                        >
                          <img
                            className="w-24 h-36 object-cover rounded-lg"
                            src={item?.book?.image || "/book-1.png"}
                            alt={item?.book?.bookName}
                          />

                          <div className="flex flex-col justify-between w-full">
                            <div>
                              <p className="text-[16px] font-semibold text-gray-900 line-clamp-1">
                                {item?.book?.bookName}
                              </p>

                              <p className="text-gray-500 text-sm">
                                Author:{" "}
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
                      ))}
                    </div>
                  </div>
                )}
                <div className="pt-10 flex items-center gap-4 text-[18px] font-medium text-[#D9176C]">
                  <button
                    onClick={() => {
                      console.log(el.id);
                      console.log(orderDetails);

                      setSelectedOrderId(el.id);
                      setExpandedOrderId(
                        expandedOrderId === el.id ? null : el.id,
                      );
                    }}
                    className=""
                  >
                    View order detail
                  </button>
                  <FaArrowRight />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

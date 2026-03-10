import React, { useContext, useEffect, useState } from "react";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import { WishlistContext } from "./WishlistContext";
import { CartContext } from "../cartpage/CartContext";
import { NavLink } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";

export default function Wishlistdata() {
  const { wishlist, removeFromWishlist } = useContext(WishlistContext);
  const mycart = wishlist;
  const { addToCart } = useContext(CartContext);
  const [loadingId, setLoadingId] = useState(null);

  const removeItem = (bookId) => {
    removeFromWishlist(bookId);
    setLoadingId(bookId.bookId);
    const removePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          removeFromWishlist(bookId);
          resolve();
        } catch (err) {
          reject();
        } finally {
          setLoadingId(null);
        }
      }, 1000);
    });

    toast.promise(
      removePromise,
      {
        pending: "Removing item...",
        success: "Item removed! ",
        error: "Failed to remove item ",
      },
      {
        position: "bottom-right",
        autoClose: 2000,
        theme: "colored",
        iconTheme: {
          primary: "#D9176C",
          secondary: "#fff",
        },
      },
    );
  };

  useEffect(() => {
    if (loadingId && !mycart.some((el) => el.bookId === loadingId)) {
      setLoadingId(null);
    }
  }, [mycart]);
  console.log(mycart.length);

  return (
    <>
      <div className=" w-full lg:h-30 h-25 inset-0">
        <img
          className=" object-cover w-full h-full rotate-180   top-0 "
          src="/imglogin.png"
          alt=""
        />
        <div className="absolute w-full lg:h-30 h-25 inset-0 bg-[#00000099] flex items-center justify-center "></div>
      </div>
      {mycart.length === 0 ? (
        <div className="py-20 w-full flex items-center justify-center">
          <p className="text-3xl text-[#18181880]">The Wishlis is empty</p>
        </div>
      ) : (
        <div className="pb-20">
          <div className="lg:px-15 bg-[#F5F5F5]">
            <table
              className="hidden2 sm:max-md:table  w-full table-auto bg-[#F5F5F5] "
              style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
            >
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="py-4 px-6 text-left font-semibold w-175 text-gray-700">
                    Item
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700"></th>
                </tr>
              </thead>
              <tbody
                style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
                className="bg-[#F5F5F5]"
              >
                {mycart.map((el, index) => (
                  <tr
                    key={el.id || index}
                    className="bg-white "
                    style={{ borderRadius: "8px" }}
                  >
                    <td className="flex gap-4 items-start py-6 px-6 ">
                      <img
                        src={el.image || `/book-${index + 1}.png`}
                        alt={el.bookName}
                        className="w-42.5 h-62.5 object-cover rounded"
                      />
                      <div className="flex flex-col">
                        <h3 className="text-lg font-semibold">{el.bookName}</h3>
                        <p className="text-gray-600 text-sm">
                          Author:{" "}
                          <span className="font-medium">{el.author}</span>
                        </p>
                        <p className="text-gray-500 text-sm mt-1 line-clamp-3">
                          {el.description}
                        </p>
                        <p className="text-xs text-gray-400 mt-10">
                          ASIN: {el.asin || "B09TWSRMCB"}
                        </p>
                        <div className="pt-5">
                          <NavLink
                            onClick={() => {
                              addToCart(el);
                              toast.success("Added to shopping cart", {
                                position: "bottom-right",
                                duration: 4000,
                                iconTheme: {
                                  primary: "#D9176C",
                                  secondary: "#fff",
                                },
                              });
                            }}
                            className="flex mybtn bg-[#D9176C] py-3.25 px-7.5 justify-center rounded-lg items-center text-white"
                          >
                            Add To Cart
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 512 512"
                            >
                              <circle
                                cx={176}
                                cy={416}
                                r={16}
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={32}
                              ></circle>
                              <circle
                                cx={400}
                                cy={416}
                                r={16}
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={32}
                              ></circle>
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={32}
                                d="M48 80h64l48 272h256"
                              ></path>
                              <path
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={32}
                                d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128"
                              ></path>
                            </svg>
                          </NavLink>
                        </div>
                      </div>
                    </td>

                    <td className="text-center py-6 px-6 font-semibold">
                      ${el.price.toFixed(2)}
                    </td>

                    <td className="text-center py-6 px-6 text-pink-600">
                      <NavLink
                        onClick={() => removeItem(el)}
                        aria-label="Remove item"
                      >
                        {loadingId === el.bookId ? (
                          <ImSpinner2
                            className="animate-spin text-red-500"
                            size={18}
                          />
                        ) : (
                          <FaTrashAlt size={18} />
                        )}
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="sm:max-md:hidden lg:hidden  space-y-6 px-5 py-5">
              {mycart.map((el, index) => (
                <div
                  key={el.id || index}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex gap-4 items-start">
                    <img
                      src={el.image || `/book-${index + 1}.png`}
                      alt={el.bookName}
                      className="w-24 h-32 object-cover rounded"
                    />
                    <div>
                      <h3 className="font-semibold text-lg">{el.bookName}</h3>
                      <p className="text-gray-600 text-sm">
                        Author: {el.author}
                      </p>
                      <p className="text-gray-500 text-xs mt-1 line-clamp-3">
                        {el.description}
                      </p>
                      <p className="text-gray-400 text-xs mt-3">
                        ASIN: {el.asin || "B09TWSRMCB"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <p className="text-pink-600 font-bold text-xl">
                      ${el.price.toFixed(2)}
                    </p>

                    <NavLink
                      onClick={() => removeItem(el)}
                      aria-label="Remove item"
                    >
                      {loadingId === el.bookId ? (
                        <ImSpinner2
                          className="animate-spin text-red-500"
                          size={18}
                        />
                      ) : (
                        <FaTrashAlt size={18} className="text-[#D9176C]" />
                      )}
                    </NavLink>
                  </div>
                  <NavLink
                    onClick={() => {
                      addToCart(el);
                      toast.success("Added to shopping cart", {
                        position: "bottom-right",
                        duration: 4000,
                        iconTheme: {
                          primary: "#D9176C",
                          secondary: "#fff",
                        },
                      });
                    }}
                    className="flex gap-2 items-center justify-center bg-[#D9176C] py-3 rounded-lg text-white font-semibold"
                  >
                    Add To Cart
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width={20}
                      height={20}
                      viewBox="0 0 512 512"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={32}
                    >
                      <circle cx={176} cy={416} r={16}></circle>
                      <circle cx={400} cy={416} r={16}></circle>
                      <path d="M48 80h64l48 272h256"></path>
                      <path d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128"></path>
                    </svg>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

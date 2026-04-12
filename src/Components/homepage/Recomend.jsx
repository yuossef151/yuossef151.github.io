import { useContext, useEffect, useState } from "react";
import { getbooks } from "../../API/Auth";
import Star from "./Star";
import { CartContext } from "../cartpage/CartContext";
import { WishlistContext } from "../Wishlistpage/WishlistContext";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { ImSpinner2 } from "react-icons/im";

export default function Recomend() {
  const { addToCart, handleAddToCart, loadingId, setLoadingId } =
    useContext(CartContext);
  const {
    wishlist,
    addToWishlist,
    isInWishlist,
    handleAddToWishlist,
    loadingId2,
    setLoadingId2,
  } = useContext(WishlistContext);
  const token = localStorage.getItem("token");

  const {
    data: bookData = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["books"],
    queryFn: async () => {
      try {
        const res = await getbooks();
        return res.data.data.recommended;
      } catch (error) {
        console.log(error);
      }
    },
  });

  useEffect(() => {
    loadingId2.forEach((id) => {
      const exists = wishlist.some((el) => el.bookId === id);

      if (exists) {
        toast.success("Added to Wishlist", {
          position: "bottom-right",
          duration: 4000,
          iconTheme: { primary: "#D9176C", secondary: "#fff" },
        });
      }
    });
    setLoadingId2((prev) => {
      const newArr = prev.filter(
        (id) => !wishlist.some((item) => item.bookId === id),
      );
      if (newArr.length === prev.length) return prev;

      return newArr;
    });
  }, [wishlist]);
  const bookimg = ["/book-1.png", "/book-5.png"];

  return (
    <>
      <div className="lg:py-30 py-3 px-8 sm:max-md:py-15 lg:px-15 bg-[#F5F5F5]">
        <p className="pb-10 lg:text-[26px] pt-5 lg:pt-0 sm:max-md:pt-0 text-[20px] font-bold">
          Recomended For You
        </p>
        <div className="flex flex-col lg:flex-row lg:justify-center gap-6 w-full">
          {bookData
            ?.filter((el) => el.stock >= 1)
            .map((el, index) => (
              <div
                key={el.id || index}
                className="flex flex-col sm:max-md:flex-row md:flex-row lg:flex-row items-center lg:items-start sm:max-md:items-start lg:p-10 px-2 py-4 bg-white gap-9.75
        md:w-full  "
              >
                <img
                  className="lg:h-80 sm:max-md:h-60 h-70
          w-full sm:max-md:w-80 lg:w-80"
                  src={bookimg[index]}
                  alt=""
                />

                <div className="h-full flex flex-col justify-between">
                  <h3 className="text-[18px] font-bold">{el.bookName}</h3>
                  <p className="pb-2 pt-1 text-[#22222280]">
                    Author:
                    <span className="text-black font-medium">{el.author}</span>
                  </p>
                  <p className="text-[#22222280] hidden sm:block ">
                    {el.description}
                  </p>
                  <div className="flex justify-between lg:items-center pt-6 gap-0 lg:gap-0">
                    <div>
                      <Star rate={el.rate} countReview={el.countReview} />
                      <p>{el.rate}</p>
                    </div>
                    <div>
                      <p className="text-green-500 text-end">
                        Discount: {el.discount}%
                      </p>
                      <div className="flex gap-1 items-end ">
                        <p className="lg:text-[18px] sm:max-md:text-[18px] text-[16px] font-medium">
                          ${el.final_price}
                        </p>
                        <span className="text-red-500">
                          <del>${el.price}</del>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 pt-4">
                    <NavLink
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (loadingId.includes(el.bookId)) return;
                        handleAddToCart(el);
                      }}
                      className={`relative flex  grow-4 bg-[#D9176C] py-3.25 justify-center rounded-lg items-center text-white 
                      ${loadingId.includes(el.bookId) ? "bg-gray-400 " : "bg-[#D9176C]"}
                    `}
                    >
                      {loadingId.includes(el.bookId) ? (
                        <ImSpinner2
                          className="animate-spin text-[#D9176C]"
                          size={18}
                        />
                      ) : (
                        <>
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
                        </>
                      )}
                    </NavLink>

                    <NavLink
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (loadingId2.includes(el.bookId)) return;
                        handleAddToWishlist(el);
                      }}
                      className={`relative flex mybtn2 grow py-3.25 justify-center rounded-lg border border-[#D9176C] text-[#D9176C]
                      ${loadingId2.includes(el.bookId) ? "bg-gray-400 " : ""}`}
                    >
                      {loadingId2.includes(el.bookId) ? (
                        <ImSpinner2
                          className="animate-spin text-[#ffff]"
                          size={18}
                        />
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill={isInWishlist(el.bookId) ? "#D9176C" : "none"}
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79"
                          ></path>
                        </svg>
                      )}
                    </NavLink>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

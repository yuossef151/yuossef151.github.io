import React, { useContext, useEffect, useState } from "react";
import Star from "../homepage/Star";
import { CartContext } from "../cartpage/CartContext";
import { WishlistContext } from "../Wishlistpage/WishlistContext";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function Bookdata({
  page,
  settpage,
  book,
  pages,
  booktotal,
  cart,
}) {
  const linth = Math.ceil(pages.total / pages.per_page);
  const mypages = Math.ceil(booktotal / pages.per_page);
  const { addToCart, Cart } = useContext(CartContext);
  const { wishlist, addToWishlist, setWishlist, isInWishlist } =
    useContext(WishlistContext);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const requireLoginAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "You must be logged in!",
      text: "Please log in to add items to your cart or wishlist.",
      showConfirmButton: true,
      confirmButtonText: "OK",
      footer: '<a href="/login">Go to login page</a>',
      position: "center",
    });
  };
  return (
    <>
      <div className="lg:pt-15 sm:max-md:pt-5 pt-5 sm:max-md:w-full lg:w-270   pb-24 lg:border-e-2  border-none border-[#22222233]">
        <div className="lg:w-189 sm:max-md:w-[calc(100%-40px)] ms-6 w-85 border-[#22222233] border  rounded-[50px] relative overflow-hidden">
          <input
            className="bg-white lg:py-4 sm:max-md:py-4 py-3 lg:px-6 px-3 lg:w-179 sm:max-md:w-full w-70 text-[13px] sm:max-md:text-[15px] lg:text-[18px] rounded-l-2xl h-full   focus:border-none focus:outline-none "
            type="search"
            placeholder="Search"
          />
          <div className="lg:w-26.25 w-20 bg-white  absolute right-0 top-0 h-full flex items-center justify-between sm:max-md:pe-5 lg:pe-6 pe-4 ">
            <div className="border-e-2   border-[#22222233]  h-full px-3 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className=" text-[#22222280] lg:w-6 w-5 lg:h-6 h-5"
                viewBox="0 0 24 24"
              >
                <g
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                >
                  <path d="M16 6.429C16 4.535 14.21 3 12 3S8 4.535 8 6.429v5.142C8 13.465 9.79 15 12 15s4-1.535 4-3.429z"></path>
                  <path d="M5 11a7 7 0 1 0 14 0m-7 7v3m-4 0h8"></path>
                </g>
              </svg>
            </div>
            <div className="h-full lg:px-3 sm:max-md:px-1 flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#D9176C] lg:w-6 w-5 lg:h-6 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 10a7 7 0 1 0 14 0a7 7 0 1 0-14 0m18 11l-6-6"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-5  w-full">
            {book.map((el, index) => {
              return (
                <div
                  onClick={() => navigate(`/single/${el.bookId}`)}
                  key={el.id || index}
                  className="flex cursor-pointer flex-col items-center  sm:max-md:flex-row lg:flex-row lg:w-full sm:max-md:w-full w-full px-5 lg:ps-6 md:ps-6 lg:pe-41 md:pe-6 mt-10 gap-9.75  "
                >
                  <img
                    className=" lg:h-full lg:w-75 h-55 w-50 sm:max-md:h-60 sm:max-md:w-40"
                    src={`/book-4.png`}
                    alt=""
                  />
                  <div></div>
                  <div className="flex sm:max-md:w-full w-full flex-col grow justify-between">
                    <div>
                      <div className="sm:max-md:w-full">
                        <h3 className="text-[18px] font-bold">{el.bookName}</h3>
                        <p className="text-[#22222280] hidden sm:block">
                          {el.description}
                        </p>
                      </div>
                      <div className="flex justify-start gap-30 py-5">
                        <div className="">
                          <p className="pb-2 pt-1 text-[#22222280]">Author</p>
                          <p className="text-black font-medium">{el.author}</p>
                        </div>
                        <div>
                          <p className="pb-2 pt-1 text-[#22222280]">Year</p>
                          <p className="text-black font-medium">
                            {el.publicationYear}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 pt-4 lg;flex-row sm:max-md:flex-col flex-col lg:justify-between sm:max-md:justify-between lg:items-center">
                        <div className="flex  w-full sm:max-md:w-full  gap-3 justify-between lg:gorw">
                          <div>
                            <div className="flex  justify-between items-center">
                              <Star
                                rate={el.rate}
                                countReview={el.countReview}
                              />
                              <p>{el.rate}</p>
                            </div>
                          </div>
                          <div>
                            <div className="flex gap-1  items-end ">
                              <p className="text-[18px] font-medium">
                                ${el.price}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-4  lg:w-full">
                          <NavLink
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              !token ? requireLoginAlert() : addToCart(el);
                              !token
                                ? requireLoginAlert()
                                : toast.success("Added to shopping cart", {
                                    position: "bottom-right",
                                    duration: 4000,
                                    iconTheme: {
                                      primary: "#D9176C",
                                      secondary: "#fff",
                                    },
                                  });
                            }}
                            className="flex grow mybtn bg-[#D9176C] py-3.25 px-7.5 justify-center rounded-lg items-center text-white"
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
                          <NavLink
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();

                              if (!token) {
                                requireLoginAlert();
                              } else {
                                if (isInWishlist(el.bookId)) {
                                  toast.error(
                                    "This item is already in your wishlist",
                                    {
                                      position: "bottom-right",
                                      duration: 4000,
                                      iconTheme: {
                                        primary: "#D9176C",
                                        secondary: "#fff",
                                      },
                                    },
                                  );
                                } else {
                                  addToWishlist(el);
                                  toast.success("Added to Wishlist", {
                                    position: "bottom-right",
                                    duration: 4000,
                                    iconTheme: {
                                      primary: "#D9176C",
                                      secondary: "#fff",
                                    },
                                  });
                                }
                              }
                            }}
                            className="flex mybtn2  py-3.25 px-3.5 justify-center items-center rounded-lg border border-[#D9176C] text-[#D9176C] "
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width={20}
                              height={20}
                              viewBox="0 0 24 24"
                              className=""
                            >
                              <path
                                fill={
                                  isInWishlist(el.bookId) ? "#D9176C" : "none"
                                }
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79"
                              ></path>
                            </svg>
                          </NavLink>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="w-full flex justify-center items-center pt-10">
            {page - 1 == 0 ? (
              ""
            ) : (
              <button
                onClick={() => {
                  settpage(page--);
                }}
                className="p-5 text-[#D9176C] me-4 flex items-center text-[16px]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="M31 36L19 24l12-12"
                  ></path>
                </svg>
                Previous
              </button>
            )}
            {page - 2 == 0 || page - 2 == -1 ? (
              ""
            ) : (
              <button
                onClick={() => {
                  settpage(page - 2);
                }}
                className=" w-10 h-10 rounded-lg  bg-white text-[#D9176C] me-4"
              >
                {page - 2}
              </button>
            )}
            {page - 1 == 0 ? (
              ""
            ) : (
              <button
                onClick={() => {
                  settpage(page--);
                }}
                className="w-10 h-10 rounded-lg  bg-white text-[#D9176C] me-4"
              >
                {page - 1}
              </button>
            )}
            <button className="w-10 h-10 rounded-lg text-white bg-[#D9176C] me-4">
              {" "}
              {page}
            </button>

            {page + 1 > mypages ? (
              ""
            ) : (
              <button
                onClick={() => {
                  settpage(page++);
                }}
                className="w-10 h-10 rounded-lg  bg-white text-[#D9176C] me-4"
              >
                {page + 1}
              </button>
            )}
            {page + 1 > mypages || page + 2 > mypages ? (
              ""
            ) : (
              <button
                onClick={() => {
                  settpage(page + 2);
                }}
                className="w-10 h-10 rounded-lg  bg-white text-[#D9176C] me-4"
              >
                {page + 2}
              </button>
            )}
            {page + 1 > mypages ? (
              ""
            ) : (
              <button
                onClick={() => {
                  settpage(page++);
                }}
                className="p-5 text-[#D9176C] me-4 flex items-center"
              >
                Next
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={4}
                    d="m19 12l12 12l-12 12"
                  ></path>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

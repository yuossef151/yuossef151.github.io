import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../cartpage/CartContext";
import { useQuery } from "@tanstack/react-query";
import { singleBookAPI } from "../../../API/Auth";
import { NavLink, useParams } from "react-router-dom";
import Star from "../../homepage/Star";
import { WishlistContext } from "../../Wishlistpage/WishlistContext";
import Details from "./Details";
import Reviews from "./Reviews";
import Recomended from "./Recomended";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";

export default function Singlbook() {
  const { addToCart, Cart, handleAddToCart, loadingId, setLoadingId } =
    useContext(CartContext);
  const {
    wishlist,
    addToWishlist,
    isInWishlist,
    handleAddToWishlist,
    loadingId2,
    setLoadingId2,
  } = useContext(WishlistContext);
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const { data, isLoading } = useQuery({
    queryKey: ["singleBook", id],
    queryFn: () => singleBookAPI(id),
  });

  const book = data?.data?.data?.book;
  const boookdata = data?.data?.data;
  console.log(book);

  const [activeTab, setactiveTab] = useState(1);
  const requireLoginAlert = () => {
    Swal.fire({
      icon: "warning",
      title: "You must be logged in!",
      text: "Please log in to add items to your cart or wishlist.",
      showConfirmButton: true,
      confirmButtonText: "OK",
      footer:
        '<a href="/login" class="underline text-pink-600 font-bold">Go to login page</a>',
      position: "center",
      customClass: {
        confirmButton: "swal-ok-btn",
      },
    });
  };

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
    setLoadingId2((prev) =>
      prev.filter((id) => !wishlist.some((item) => item.bookId === id)),
    );
  }, [wishlist]);
  return (
    <>
      <div className=" px-5 py-5 lg:py-10 lg:px-10">
        <div className="flex flex-col sm:max-md:flex-row lg:flex-row lg:w-full sm:max-md:w-full w-full lg:ps-0   sm:max-md:ps-6  sm:max-md:pe-6 mt-10 gap-9.75  ">
          <img
            className=" lg:h-full lg:w-70 h-35 w-30 sm:max-md:h-60 sm:max-md:w-40"
            src={`/book-4.png`}
            alt=""
          />

          <div className="flex sm:max-md:w-full flex-col grow justify-between">
            <div className="flex gap-9.5">
              <div className="sm:max-md:w-full lg:w-[80%]">
                <h3 className="text-[18px] font-bold">{book?.bookName}</h3>
                <p className="text-[#22222280]">{book?.description}</p>
              </div>
            </div>

            <div>
              <div className="flex flex-wrap lg:flex-row gap-10 pt-5 justify-between lg:justify-start">
                <div className="flex flex-col lg:flex-row lg:gap-10 gap-4">
                  <div className="">
                    <p className="pb-2 pt-1 text-[#22222280]">Author</p>
                    <p className="text-black font-medium">{book?.author}</p>
                  </div>
                  <div>
                    <p className="pb-2 pt-1 text-[#22222280]">
                      Publication Year
                    </p>
                    <p className="text-black font-medium">
                      {book?.publicationYear}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col lg:flex-row lg:gap-10 gap-4">
                  <div>
                    <p className="pb-2 pt-1 text-[#22222280]">Pages</p>
                    <p className="text-black font-medium">
                      {book?.numberOfPages}
                    </p>
                  </div>
                  <div>
                    <p className="pb-2 pt-1 text-[#22222280]">Language</p>
                    <p className="text-black font-medium">{book?.lang}</p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex pt-10 justify-between items-center">
                  <Star rate={book?.rate} countReview={book?.countReview} />
                  <p>{book?.rate}</p>
                </div>
              </div>
              <div className="flex  gap-2 pt-4 lg:flex-row sm:max-md:flex-col flex-col lg:justify-between sm:max-md:justify-between lg:items-center">
                <div>
                  <div className="flex gap-1 items-end ">
                    <p className="text-[18px] font-medium">
                      ${book?.final_price}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4 ">
                  <NavLink
                    onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      if (loadingId.includes(book.bookId)) return;

                      handleAddToCart(book);
                    }}
                    className={`flex relative bg-[#D9176C] py-3.25 px-7.5 justify-center rounded-lg items-center text-white ${loadingId.includes(book?.bookId) ? "bg-gray-400  w-[163.16px] h-12.5" : "bg-[#D9176C]"}`}
                  >
                    {loadingId.includes(book?.bookId) ? (
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
                      if (loadingId2.includes(book.bookId)) return;

                      handleAddToWishlist(book);
                    }}
                    className={`relative flex py-3.25 px-3.5 justify-center items-center rounded-lg border text-[#D9176C] border-[#D9176C]
                        ${
                          loadingId2.includes(book?.bookId)
                            ? "bg-gray-400 "
                            : ""
                        }`}
                  >
                    {loadingId2.includes(book?.bookId) ? (
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
                          fill={isInWishlist(book?.bookId) ? "#D9176C" : "none"}
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
          </div>
        </div>
      </div>

      <div className="flex  gap-3 sm:max-md:gap-8 lg:gap-15 lg:mx-12.5 mx-4  border-b-2 border-gray-300">
        <NavLink
          onClick={() => {
            setactiveTab(1);
          }}
          className={`pb-3 border-b-2 -mb-0.5 px-3 transition-all duration-300 text-[10px] md:text-[16px] lg:text-[18px] ${
            activeTab === 1
              ? "border-[#EAA451] text-black "
              : "border-transparent text-gray-400 hover:text-black "
          }`}
        >
          Product Details
        </NavLink>

        <NavLink
          onClick={() => {
            setactiveTab(2);
          }}
          className={`pb-3 border-b-2 -mb-0.5 px-3 transition-all duration-300 text-[10px] md:text-[16px] lg:text-[18px]  ${
            activeTab === 2
              ? "border-[#EAA451] text-black"
              : "border-transparent text-gray-400 hover:text-black"
          }`}
        >
          Customer Reviews
        </NavLink>

        <NavLink
          onClick={() => {
            setactiveTab(3);
          }}
          className={`pb-3 border-b-2 -mb-0.5 px-3 transition-all duration-300 text-[10px] md:text-[16px] lg:text-[18px]  ${
            activeTab === 3
              ? "border-[#EAA451] text-black"
              : "border-transparent text-gray-400 hover:text-black"
          }`}
        >
          Recommended For You
        </NavLink>
      </div>
      <div className="pb-40">
        {activeTab === 1 ? (
          <Details boookdata={boookdata} book={book} />
        ) : activeTab === 2 ? (
          <Reviews boookdata={boookdata} book={book} />
        ) : activeTab === 3 ? (
          <Recomended boookdata={boookdata} book={book} />
        ) : null}
      </div>
    </>
  );
}

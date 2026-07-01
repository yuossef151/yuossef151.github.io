import React, { useContext, useEffect, useState } from "react";
import Star from "../homepage/Star";
import { CartContext } from "../cartpage/CartContext";
import { WishlistContext } from "../Wishlistpage/WishlistContext";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { BeatLoader, ClipLoader } from "react-spinners";

export default function Bookdata({

  book,
  pages,
  booktotal,
  search,
  setsearch,
  bookData,
  isLoading,
  isFetching,
}) {
  const mypages = pages?.last_page || 1;
  const { addToCart, handleAddToCart, loadingId, setLoadingId, Cart  ,page, settpage,} =
    useContext(CartContext);
  const {
    wishlist,
    addToWishlist,
    isInWishlist,
    handleAddToWishlist,
    loadingId2,
    setLoadingId2,
  } = useContext(WishlistContext);

  const navigate = useNavigate();

  useEffect(() => {
    setLoadingId((prev) => {
      const newArr = prev.filter(
        (id) => !Cart.some((el) => el.bookDetails.bookId === id),
      );

      if (newArr.length === prev.length) return prev;

      return newArr;
    });
  }, [Cart]);

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


  const hasBooks = book?.length > 0;


console.log(book);


useEffect(() => {
  localStorage.setItem("currentBookPage", page);
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}, [page]);




  return (
    <div className="lg:pt-15 sm:max-md:pt-10 pt-10 sm:max-md:w-full lg:w-full pb-24 lg:border-e-2 border-none border-[#22222233]">
      <div className="w-full px-4">
        <div className="w-full border border-[#22222233] rounded-[50px] relative overflow-hidden">
          <input
            className="bg-white py-3 lg:py-4 px-4 w-full text-[13px] sm:text-[15px] lg:text-[18px] rounded-[50px] h-full focus:outline-none"
            type="search"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
            placeholder="Search books..."
          />
          <div className="lg:w-26.25 w-20 bg-white absolute right-0 top-0 h-full flex items-center justify-between sm:max-md:pe-5 lg:pe-6 pe-4">
            <div className="border-e-2 border-[#22222233] h-full px-3 flex justify-center items-center">
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
            <div className="h-full lg:px-3 sm:max-md:px-1 flex justify-center px-1  items-center">
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
      </div>
      <div className="flex px-10 flex-col gap-5 w-full">
        {isLoading ? (
          <div className="text-center py-10 text-[#D9176C] flex items-center justify-center gap-3">
            <p>Loading books </p> <BeatLoader color="#D9176C" size={10} />
          </div>
        ) : book.length > 0 ? (
book.map((el, index) => (
  <div
    onClick={() => navigate(`/single/${el.bookId}`)}
    key={el.id || index}
    className="flex cursor-pointer flex-col md:flex-row items-stretch w-full  mt-10 gap-6 border border-gray-100 rounded-2xl p-6 transition-all hover:shadow-lg bg-white"
  >
    {/* الصورة */}
    <div className="w-full md:w-50 shrink-0">
      <div className="aspect-3/4 w-full overflow-hidden rounded-lg">
        <img
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
          src={el?.bookImage[0]?.image}
          alt={el.bookName}
        />
      </div>
    </div>

    {/* المحتوى */}
    <div className="flex flex-col grow justify-between w-full">
      <div>
        <h3 className="text-[17px] md:text-[18px] font-bold text-black leading-snug line-clamp-2">
          {el.bookName}
        </h3>
        <p className="text-[#22222280] text-sm mt-2 hidden sm:block line-clamp-2">
          {el.description}
        </p>
      </div>

      {/* Author & Year */}
      <div className="flex gap-8 py-4 border-y border-gray-100 my-4">
        <div>
          <p className="text-[11px] text-[#22222280] uppercase">Author</p>
          <p className="text-black font-medium text-sm">{el.author}</p>
        </div>
        <div>
          <p className="text-[11px] text-[#22222280] uppercase">Year</p>
          <p className="text-black font-medium text-sm">{el.publicationYear}</p>
        </div>
      </div>

      {/* التقييم، السعر، والأزرار */}
      <div className="flex flex-col   items-center justify-between gap-4">
        <div className="flex items-center gap-3 w-full justify-between ">
          <div className="flex items-center gap-1">
            <Star rate={el.rate} countReview={el.countReview} />
            <span className="text-sm font-medium">{el.rate}</span>
          </div>
          <p className="text-[18px] font-bold">${el.price}</p>
        </div>

        <div className="flex gap-2 w-full ">
          {el.stock <= 0 ? (
            <div className="grow text-center py-2.5 px-4 rounded-lg text-[#D9176C] border-2 border-[#D9176C] text-sm font-medium">
              Out of stock
            </div>
          ) : (
            <NavLink
              onClick={async (e) => {
                e.preventDefault();
                e.stopPropagation();
                if (loadingId.includes(el.bookId)) return;
                handleAddToCart(el);
              }}
              className={` grow hover:bg-[#c41661] hover:text-[#dbdbdb] flex items-center justify-center gap-2 py-2.5 px-6 rounded-lg text-white text-sm font-medium transition-colors ${
                loadingId.includes(el.bookId) ? "bg-gray-400" : "bg-[#D9176C]"
              }`}
            >
              {loadingId.includes(el.bookId) ? (
                <ImSpinner2 className="animate-spin" size={18} />
              ) : (
                <>
                  Add To Cart
                  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 512 512">
                    <circle cx={176} cy={416} r={16} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
                    <circle cx={400} cy={416} r={16} fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} />
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M48 80h64l48 272h256" />
                    <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={32} d="M160 288h249.44a8 8 0 0 0 7.85-6.43l28.8-144a8 8 0 0 0-7.85-9.57H128" />
                  </svg>
                </>
              )}
            </NavLink>
          )}

          {/* زر الـ Wishlist */}
          <NavLink
            onClick={async (e) => {
              e.preventDefault();
              e.stopPropagation();
              if (loadingId2.includes(el.bookId)) return;
              handleAddToWishlist(el);
            }}
            className={`py-2.5 px-3 rounded-lg  hover:text-[#c41661] hover:bg-[#dbdbdb] border border-[#D9176C] text-[#D9176C] flex items-center justify-center transition-colors ${
              loadingId2.includes(el.bookId) ? "bg-gray-400" : ""
            }`}
          >
            {loadingId2.includes(el.bookId) ? (
              <ImSpinner2 className="animate-spin text-white" size={18} />
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
                <path
                  fill={isInWishlist(el.bookId) ? "#D9176C" : "none"}
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79"
                />
              </svg>
            )}
          </NavLink>
        </div>
      </div>
    </div>
  </div>
))
        ) : (
          <div className="text-center py-10 text-gray-500 flex items-center justify-center gap-3">
            <p>There's no book by that name. </p>
          </div>
        )}

        {mypages > 1 && hasBooks && (
          <div className="w-full flex justify-center items-center pt-10">
            {page - 1 > 0 && (
              <button
                onClick={() => settpage(page - 1)}
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
                  />
                </svg>
                Previous
              </button>
            )}

            {[page - 2, page - 1].map(
              (p) =>
                p > 0 && (
                  <button
                    key={p}
                    onClick={() => settpage(p)}
                    className="w-10 h-10 rounded-lg bg-white text-[#D9176C] me-4"
                  >
                    {p}
                  </button>
                ),
            )}

            <button className="w-10 h-10 rounded-lg text-white bg-[#D9176C] me-4">
              {page}
            </button>

            {[page + 1, page + 2].map(
              (p) =>
                p <= mypages && (
                  <button
                    key={p}
                    onClick={() => settpage(p)}
                    className="w-10 h-10 rounded-lg bg-white text-[#D9176C] me-4"
                  >
                    {p}
                  </button>
                ),
            )}

            {page + 1 <= mypages && (
              <button
                onClick={() => settpage(page + 1)}
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
                  />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

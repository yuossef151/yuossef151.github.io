import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import CheckOut from "./CheckOut";
import { NavLink } from "react-router-dom";
import { ImSpinner10, ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";

export default function Mycart() {
  const {
    Cart,
    setCart,
    addToCart,
    removeFromCart,
    isLoading,
    updateQuantityMutation,
  } = useContext(CartContext);
  console.log(Cart);
  const mycart = Cart;
  const [loadingId, setLoadingId] = useState([]);
  const [stock, setstock] = useState("");

  const increaseQty = (item) => {
    const updatedCart = mycart.map((el) =>
      el.bookDetails.bookId === item.bookDetails.bookId
        ? { ...el, qty: el.qty + 1 }
        : el,
    );
    setCart(updatedCart);
    const newQty = item.qty + 1;

    updateQuantityMutation.mutate({
      bookId: item.bookDetails.bookId,
      qty: newQty,
    });
  };

  const decreaseQty = (item) => {
    if (item.qty > 1) {
      const updatedCart = mycart.map((el) =>
        el.bookDetails.bookId === item.bookDetails.bookId
          ? { ...el, qty: el.qty - 1 }
          : el,
      );
      setCart(updatedCart);
      const newQty = item.qty - 1;

      updateQuantityMutation.mutate({
        bookId: item.bookDetails.bookId,
        qty: newQty,
      });
    }
  };

  const removeItem = async (item) => {
    const id = item.bookDetails.bookId;

    if (loadingId.includes(id)) return;

    setLoadingId((prev) => [...prev, id]);

    await removeFromCart(item);
  };

  useEffect(() => {
    loadingId.forEach((id) => {
      const stillExists = Cart.some((el) => el.bookDetails.bookId === id);

      if (!stillExists) {
        toast.success("Item removed!", {
          position: "bottom-right",
          duration: 4000,
          iconTheme: { primary: "#D9176C", secondary: "#fff" },
        });

        setLoadingId((prev) => prev.filter((i) => i !== id));
      }
    });
  }, [Cart, loadingId]);
console.log(mycart);

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
        <div className="flex w-full justify-center items-center  pt-20">
          <p className="lg:text-3xl text-[20px] sm:max-md:text-[26px] text-[#18181880]">
            The shopping cart is empty
          </p>
        </div>
      ) : (
        <div>
          <div className="lg:px-15 bg-[#F5F5F5]">
            <table
              className="w-full sm:max-md:table table-auto bg-[#F5F5F5] hidden2  "
              style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
            >
              <thead className="mytable">
                <tr className="bg-[#F5F5F5] mytr">
                  <th className="py-4 px-3 text-left font-semibold text-gray-700">
                    Item
                  </th>
                  <th className="py-4 px-3 text-center font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="py-4 px-3 text-center font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="py-4 px-3 text-center font-semibold text-gray-700">
                    Total Price
                  </th>
                  <th className="py-4 px-3 text-center font-semibold text-gray-700"></th>
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
                    <td className=" py-6 px-4  align-top">
                      <div className="flex gap-4  max-w-lg h-full">
                        <img
                          src={el.bookDetails?.bookImage[0]?.image}
                          alt={el.bookName}
                          className="w-42.5 h-62.5 object-cover rounded"
                        />
                        <div className="flex flex-col justify-between">
                          <h3 className="text-lg font-semibold">
                            {el.bookDetails.bookName}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            Author:
                            <span className="font-medium">
                              {el.bookDetails.author}
                            </span>
                          </p>
                          <p className="text-gray-500 text-sm mt-1 line-clamp-3 sm:max-md:hidden lg:flex hidden">
                            {el.bookDetails.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-10">
                            ASIN: {el.asin || "B09TWSRMCB"}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="text-center py-6 px-4  relative">
                      <div className="inline-flex items-center gap-3 text-pink-600">
                        <NavLink
                          onClick={() => {
                            el.qty == 1 ? removeItem(el) : decreaseQty(el);
                            setstock("");
                          }}
                          aria-label="Decrease quantity"
                        >
                          <FaMinusCircle size={20} />
                        </NavLink>
                        <span className="text-lg font-semibold">
                          {el.qty || 1}
                        </span>
                        <NavLink
                          onClick={() => {
                            el.qty >= el.bookDetails?.stock
                              ? setstock("Out of stock")
                              : (() => {
                                  increaseQty(el);
                                  setstock("");
                                })();
                          }}
                          aria-label="Increase quantity"
                        >
                          <FaPlusCircle size={20} />
                        </NavLink>
                      </div>
                      <div className="absolute bottom-10 text-red-600 left-[50%] -translate-x-1/2">
                        <p className="text-[18px]">{stock}</p>
                      </div>
                    </td>

                    <td className="text-center py-6 px-4 font-semibold">
                      ${el.bookDetails.price.toFixed(2)}
                    </td>

                    <td className="text-center py-6 px-4 font-semibold">
                      ${(el.bookDetails.price * el.qty).toFixed(2)}
                    </td>

                    <td className="text-center py-6 px-4 text-pink-600">
                      <NavLink
                        className="flex items-center justify-center"
                        onClick={() => {
                          removeItem(el);
                        }}
                        aria-label="Remove item"
                      >
                        {loadingId.includes(el.bookDetails.bookId) ? (
                          <ImSpinner2
                            className="animate-spin text-red-500"
                            size={18}
                          />
                        ) : (
                          <div>
                            <FaTrashAlt size={18} />
                          </div>
                        )}
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="sm:max-md:hidden lg:hidden space-y-6 py-5 px-5">
              {mycart.map((el, index) => (
                <div
                  key={el.id || index}
                  className="bg-white rounded-lg p-4 shadow-sm"
                >
                  <div className="flex gap-4">
                    <img
                      src={el.bookDetails?.bookImage[0]?.image}
                      alt={el.bookName}
                      className="w-24 h-32 object-cover rounded"
                    />

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-semibold text-base sm:max-md:line-clamp-2 line-clamp-1">
                          {el.bookDetails.bookName}
                        </h3>

                        <p className="text-sm text-gray-600">
                          {el.bookDetails.author}
                        </p>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-3">
                          {el.bookDetails.description}
                        </p>
                      </div>

                      <p className="text-pink-600 font-bold text-lg">
                        ${el.bookDetails.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-5">
                    <div className="inline-flex items-center gap-4 text-pink-600">
                      <button
                        onClick={() =>{
                          el.qty == 1 ? removeItem(el) : decreaseQty(el)
                          setstock("");
                        }
                        }
                      >
                        <FaMinusCircle size={20} />
                      </button>

                      <span className="font-semibold text-lg">{el.qty}</span>

                      <button
                        onClick={() => {
                          el.qty >= el.bookDetails?.stock
                            ? setstock("Out of stock")
                            : (() => {
                                increaseQty(el);
                                setstock("");
                              })();
                        }}
                      >
                        <FaPlusCircle size={20} />
                      </button>
                    </div>

                    <NavLink
                      onClick={() => {
                        if (loadingId.includes(el.bookDetails.bookId)) return;
                        removeItem(el);
                      }}
                      style={{
                        pointerEvents: loadingId.includes(el.bookDetails.bookId)
                          ? "none"
                          : "auto",
                        opacity: loadingId.includes(el.bookDetails.bookId)
                          ? 0.5
                          : 1,
                      }}
                      aria-label="Remove item"
                    >
                      {loadingId.includes(el.bookDetails.bookId) ? (
                        <ImSpinner2
                          className="animate-spin text-red-500"
                          size={18}
                        />
                      ) : (
                        <div>
                          <FaTrashAlt className="text-pink-600" size={18} />
                        </div>
                      )}
                    </NavLink>
                  </div>
                  <div className="w-full flex items-center justify-center text-red-600 text-[18px]">
                    <p>{stock}</p>
                  </div>

                  <div className="border-t mt-4 pt-3 flex flex-wrap justify-between font-semibold">
                    <span>Total</span>
                    <span>${(el.bookDetails.price * el.qty).toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <CheckOut />
        </div>
      )}
    </>
  );
}

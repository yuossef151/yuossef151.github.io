import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import CheckOut from "./CheckOut";
import { NavLink } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
import toast from "react-hot-toast";

export default function Mycart() {
  const {
    Cart,
    setCart,
    removeFromCart,
    updateQuantityMutation,
  } = useContext(CartContext);
  
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

  return (
    <>
      <div className="w-full lg:h-30 h-25 inset-0 relative">
        <img
          className="object-cover w-full h-full rotate-180 top-0"
          src="/imglogin.png"
          alt=""
        />
        <div className="absolute w-full lg:h-30 h-25 inset-0 bg-[#00000099] flex items-center justify-center"></div>
      </div>

      {mycart.length === 0 ? (
        <div className="flex flex-col items-center justify-center bg-white border border-[#D9176C33] rounded-[20px] lg:p-12 md:p-8 p-6 text-center shadow-sm my-16 mx-5 lg:mx-20">
          <div className="p-4 bg-pink-50 rounded-full text-[#D9176C] mb-4">
            <FaShoppingCart size={48} />
          </div>
          <h3 className="lg:text-3xl text-[20px] sm:max-md:text-[26px] font-bold text-gray-800 mb-2">
            The shopping cart is empty
          </h3>
          <p className="text-gray-500 text-base max-w-md">
            You haven't added any books to your shopping cart yet. Explore our collection and find something you love!
          </p>
        </div>
      ) : (
        <div className="pb-20">
          <div className="lg:px-15 bg-[#F5F5F5]">
            <table
              className="hidden sm:max-md:table w-full table-auto bg-[#F5F5F5]"
              style={{ borderCollapse: "separate", borderSpacing: "0 1rem" }}
            >
              <thead>
                <tr className="bg-[#F5F5F5]">
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
                    className="bg-white"
                    style={{ borderRadius: "8px" }}
                  >
                    <td className="py-6 px-4 align-top">
                      <div className="flex gap-4 max-w-lg h-full">
                        <img
                          src={el.bookDetails?.bookImage[0]?.image}
                          alt={el.bookDetails.bookName}
                          className="w-42.5 h-62.5 object-cover rounded"
                        />
                        <div className="flex flex-col justify-between">
                          <div>
                            <h3 className="text-lg font-semibold">
                              {el.bookDetails.bookName}
                            </h3>
                            <p className="text-gray-600 text-sm">
                              Author:{" "}
                              <span className="font-medium">
                                {el.bookDetails.author}
                              </span>
                            </p>
                            <p className="text-gray-500 text-sm mt-1 line-clamp-3">
                              {el.bookDetails.description}
                            </p>
                            <p className="text-xs text-gray-400 mt-10">
                              ASIN: {el.asin || "B09TWSRMCB"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="text-center py-6 px-4 relative">
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
                      <div className="absolute bottom-2 text-red-600 left-[50%] -translate-x-1/2">
                        <p className="text-[14px] whitespace-nowrap">{stock}</p>
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
                        onClick={() => removeItem(el)}
                        aria-label="Remove item"
                      >
                        {loadingId.includes(el.bookDetails.bookId) ? (
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

            <div className="sm:max-md:hidden md:hidden lg:hidden space-y-6 py-5 px-5">
              {mycart.map((el, index) => (
                <div
                  key={el.id || index}
                  className="bg-white rounded-xl p-4 shadow-sm flex flex-col gap-4"
                >
                  <div className="flex gap-4 items-start">
                    <img
                      src={el.bookDetails?.bookImage[0]?.image}
                      alt={el.bookDetails.bookName}
                      className="w-24 h-32 object-cover rounded"
                    />

                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <h3 className="font-semibold text-base line-clamp-2">
                          {el.bookDetails.bookName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {el.bookDetails.author}
                        </p>
                        <p className="text-gray-500 text-xs mt-1 line-clamp-3">
                          {el.bookDetails.description}
                        </p>
                      </div>

                      <p className="text-pink-600 font-bold text-lg mt-2">
                        ${el.bookDetails.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="inline-flex items-center gap-4 text-pink-600">
                      <button
                        onClick={() => {
                          el.qty == 1 ? removeItem(el) : decreaseQty(el);
                          setstock("");
                        }}
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
                        <FaTrashAlt className="text-pink-600" size={18} />
                      )}
                    </NavLink>
                  </div>

                  {stock && (
                    <div className="w-full flex items-center justify-center text-red-600 text-sm">
                      <p>{stock}</p>
                    </div>
                  )}

                  <div className="border-t pt-3 flex justify-between font-semibold">
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
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from "react-icons/fa";
import CheckOut from "./CheckOut";
import { NavLink } from "react-router-dom";
import { ImSpinner2 } from "react-icons/im";
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
  const [loadingId, setLoadingId] = useState(null);

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

  const removeItem = (item) => {
    setLoadingId(item.bookDetails.bookId);
    removeFromCart(item);
    const removePromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          removeFromCart(item);
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
    if (loadingId && !Cart.some((el) => el.bookDetails.bookId === loadingId)) {
      setLoadingId(null);
    }
  }, [Cart]);

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
          <p className="text-3xl text-[#18181880]">
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
                  <th className="py-4 px-6 text-left font-semibold text-gray-700">
                    Item
                  </th>
                  <th className="py-4 px-6 text-center font-semibold text-gray-700">
                    Quantity
                  </th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700">
                    Price
                  </th>
                  <th className="py-4 px-6 text-right font-semibold text-gray-700">
                    Total Price
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
                    <td className="flex gap-4 items-start py-6 px-6 max-w-lg">
                      <img
                        src={el.image || `/book-${index + 1}.png`}
                        alt={el.bookName}
                        className="w-42.5 h-62.5 object-cover rounded"
                      />
                      <div className="flex flex-col">
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
                    </td>

                    <td className="text-center py-6 px-6">
                      <div className="inline-flex items-center gap-3 text-pink-600">
                        <NavLink
                          onClick={() => {
                            el.qty == 1 ? removeItem(el) : decreaseQty(el);
                          }}
                          aria-label="Decrease quantity"
                        >
                          <FaMinusCircle size={20} />
                        </NavLink>
                        <span className="text-lg font-semibold">
                          {el.qty || 1}
                        </span>
                        <NavLink
                          onClick={() => increaseQty(el)}
                          aria-label="Increase quantity"
                        >
                          <FaPlusCircle size={20} />
                        </NavLink>
                      </div>
                    </td>

                    <td className="text-right py-6 px-6 font-semibold">
                      ${el.bookDetails.price.toFixed(2)}
                    </td>

                    <td className="text-right py-6 px-6 font-semibold">
                      ${(el.bookDetails.price * el.qty).toFixed(2)}
                    </td>

                    <td className="text-center py-6 px-6 text-pink-600">
                      <NavLink
                        onClick={() => {
                          removeItem(el);
                        }}
                        aria-label="Remove item"
                      >
                        {loadingId === el.bookDetails.bookId ? (
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
                      src={el.image || `/book-${index + 1}.png`}
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
                        onClick={() =>
                          el.qty == 1 ? removeItem(el) : decreaseQty(el)
                        }
                      >
                        <FaMinusCircle size={20} />
                      </button>

                      <span className="font-semibold text-lg">{el.qty}</span>

                      <button onClick={() => increaseQty(el)}>
                        <FaPlusCircle size={20} />
                      </button>
                    </div>

                    <NavLink
                      onClick={() => {
                        removeItem(el);
                      }}
                      aria-label="Remove item"
                    >
                      {loadingId === el.bookDetails.bookId ? (
                        <ImSpinner2
                          className="animate-spin text-red-500"
                          size={18}
                        />
                      ) : (
                        <div>
                          <FaTrashAlt size={18} className="text-pink-600" />
                        </div>
                      )}
                    </NavLink>
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

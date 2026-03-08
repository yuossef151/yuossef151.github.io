import { createContext, useState, useEffect } from "react";
import {
  addToCartAPI,
  getcartAPI,
  removeCartAPI,
  updateCartQuantityAPI,
} from "../../API/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const queryClient = useQueryClient();

  const { data: CartData, isLoading } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await getcartAPI();
      return res.data.data;
    },
    onSuccess: (data) => {
      setCart(data.cart || []);
    },
  });

  useEffect(() => {
    if (CartData?.cart) setCart(CartData.cart);
  }, [CartData]);

  const addMutation = useMutation({
    mutationFn: (bookId) => addToCartAPI(bookId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => console.log(err.response?.data),
  });

  const addToCart = (book) => {
    const currentItem = CartData.cart.find(
      (item) => item.bookDetails.bookId === book.bookId,
    );
    const currentQty = currentItem?.qty || 0;

    if (currentQty >= 10) {
      alert("You cannot add more than 10 units of this book!");
      console.log(CartData.cart);

      return;
    }

    addMutation.mutate(book);
  };

  const updateQuantityMutation = useMutation({
    mutationFn: ({ bookId, qty }) => updateCartQuantityAPI(bookId, qty),

    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["order"]);
    },

    onError: (err) => {
      console.log("Error message:", err.message);
    },
  });

  const removeMutation = useMutation({
    mutationFn: (cartId) => removeCartAPI(cartId),
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]);
      queryClient.invalidateQueries(["order"]);
    },
  });

  const removeFromCart = (item) => {
    if (!item?.cartId) {
      console.warn("Cannot remove: bookId not found", item);
      return;
    }
    removeMutation.mutate(item.cartId);
  };

  return (
    <CartContext.Provider
      value={{
        Cart: cart,
        setCart,
        tax: CartData?.tax,
        subTotal: CartData?.subTotal,
        total: CartData?.total,
        removeFromCart,
        updateQuantityMutation,
        isLoading,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

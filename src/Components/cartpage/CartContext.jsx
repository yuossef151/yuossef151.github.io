import { createContext, useState, useEffect } from "react";
import {
  addToCartAPI,
  getcartAPI,
  removeCartAPI,
  updateCartQuantityAPI,
} from "../../API/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [loadingId, setLoadingId] = useState([]);

  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

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
    mutationFn: (book) => addToCartAPI(book),
    onSuccess: (data) => {
      if (data?.data?.cartItem) {
        setCart((prev) => [...prev, data.data.cartItem]); // إضافة للـ state بدل استبداله
      }
      queryClient.invalidateQueries(["cart"]);
    },
  });

  const addToCart = (book) => {
    const currentItem = cart.find(
      (item) => item.bookDetails.bookId === book.bookId,
    );
    const currentQty = currentItem?.qty || 0;

    if (currentQty >= 10) {
      alert("You cannot add more than 10 units of this book!");
      return;
    }

    setCart((prev) => {
      if (currentItem) {
        return prev.map((item) =>
          item.bookDetails.bookId === book.bookId
            ? { ...item, qty: item.qty + 1 }
            : item,
        );
      } else {
        return [...prev, { bookDetails: book, qty: 1 }];
      }
    });

    addMutation.mutate(book);
  };


    const requireLoginAlert = () => {
      return Swal.fire({
        icon: "warning",
        title: "You must be logged in!",
        text: "Please log in to add items to your cart or wishlist.",
        confirmButtonText: "OK",
        footer: '<a href="#" id="login-link">Go to login page</a>',
        position: "center",
        didOpen: () => {
          const link = document.getElementById("login-link");
          if (link) {
            link.addEventListener("click", (e) => {
              e.preventDefault();
              Swal.close();
              navigate("/login");
            });
          }
        },
      });
    };
    
  const handleAddToCart = async (book) => {
    if (!token) {
      await requireLoginAlert();
      return;
    }

    setLoadingId((prev) => [...prev, book.bookId]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 400));
      addToCart(book);

      toast.success("Added to shopping cart", {
        position: "bottom-right",
        duration: 4000,
        iconTheme: { primary: "#D9176C", secondary: "#fff" },
      });
    } finally {
      setLoadingId((prev) => prev.filter((id) => id !== book.bookId));
    }
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
        handleAddToCart,
        loadingId,
        setLoadingId,
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

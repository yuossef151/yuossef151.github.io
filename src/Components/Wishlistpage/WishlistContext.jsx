import React, { createContext, useContext, useEffect, useState } from "react";
import {
  addToWishlistAPI,
  getWishlistAPI,
  removeWishlistAPI,
} from "../../API/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const queryClient = useQueryClient();
  const [loadingId2, setLoadingId2] = useState([]);
  const { user } = useContext(AuthContext);

  const token = localStorage.getItem("token");

  const {
    data: wishlistData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist", token],

    queryFn: async () => {
      if (!token) return [];
      const res = await getWishlistAPI();
      return res.data.data.map((item) => item.book);
    },
  });

  const wishlist = wishlistData || [];

  const addMutation = useMutation({
    mutationFn: (bookId) => addToWishlistAPI(bookId),
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
  });

  const removeMutation = useMutation({
    mutationFn: (bookId) => removeWishlistAPI(bookId),
    onSuccess: () => queryClient.invalidateQueries(["wishlist"]),
  });

  const addToWishlist = async (book) => {
    await addMutation.mutateAsync(book.bookId);
  };

  const removeFromWishlist = async (book) => {
    if (!book?.bookId) return;
    console.log("Attempting to remove from wishlist, bookId:", book.bookId);

    try {
      await removeMutation.mutateAsync(book.bookId);
    } catch (err) {
      console.warn(
        "Failed to remove from wishlist (maybe API needs wishlistItemId):",
        err.message,
      );
    }
  };

const requireLoginAlert = () => {
  toast.custom(
    (t) => (
      // أضفنا الكلاس هنا
      <div className="toast-animation bg-white p-5 rounded-xl shadow-lg w-full max-w-sm text-center">
        <p className="font-semibold mb-3">You should log in first!</p>

        <button
          onClick={() => {
            toast.remove(t.id); 
            window.location.hash = "login";
          }}
          className="block bg-[#D9176C] text-white py-2 rounded-lg w-full mb-2"
        >
          Log in
        </button>

        <button
          onClick={() => {
            toast.remove(t.id);
            window.location.hash = "Regester";
          }}
          className="block bg-white text-[#D9176C] py-2 border border-[#D9176C] rounded-lg w-full"
        >
          Create account
        </button>
      </div>
    ),
    { 
      id: "login-toast", 
      duration: 5000,
      // تأكد أن الـ toast يظهر في المكان الصحيح (مثلاً الأعلى)
      position: 'top-center' 
    }
  );
};

  const handleAddToWishlist = async (book) => {
    if (!token) {
      await requireLoginAlert();
      return;
    }

    if (isInWishlist(book.bookId)) {
      toast.error("This product is already in your Wishlist", {
        position: "bottom-right",
        duration: 4000,
        iconTheme: { primary: "#D9176C", secondary: "#fff" },
      });
      return;
    }

    setLoadingId2((prev) => [...prev, book.bookId]);

    try {
      await new Promise((resolve) => setTimeout(resolve, 200));
      addToWishlist(book);
    } catch (err) {
      setLoadingId2((prev) => prev.filter((id) => id !== book.bookId));
    }
  };

  const isInWishlist = (bookId) =>
    wishlist.some((book) => book.bookId === bookId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        handleAddToWishlist,
        loadingId2,
        setLoadingId2,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isLoading,
        isError,
        error,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

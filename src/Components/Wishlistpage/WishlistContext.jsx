import React, { createContext, useState } from "react";
import {
  addToWishlistAPI,
  getWishlistAPI,
  removeWishlistAPI,
} from "../../API/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const queryClient = useQueryClient();
  const [loadingId2, setLoadingId2] = useState([]);
  const token = localStorage.getItem("token");

  const {
    data: wishlistData = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["wishlist"],
    queryFn: async () => {
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

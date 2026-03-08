import { createContext, useEffect, useState } from "react";
import { addToWishlistAPI, getWishlistAPI, removeWishlistAPI } from "../../API/Auth";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
      const queryClient = useQueryClient();

const {data:wishlist = [] , isLoading , isError ,error } = useQuery({

    queryKey:["wishlist"],
    queryFn:async()=>{
        const res = await getWishlistAPI();
        return res.data.data.map(item => item.book);
    }
})


const addMutation = useMutation({
    mutationFn:(bookId) =>addToWishlistAPI(bookId),
  onSuccess: () => {
    queryClient.invalidateQueries(["wishlist"]);
  }
})

const addToWishlist = (bookId)=>{
    addMutation.mutate(bookId);
}
const removeMutation = useMutation({
    mutationFn:(bookId) =>removeWishlistAPI(bookId),
  onSuccess: () => {
    queryClient.invalidateQueries(["wishlist"]);
  }
})

const removeFromWishlist = (item) => {
  if (!item?.bookId) {
    console.warn("Cannot remove: bookId not found", item);
    return;
  }
  removeMutation.mutate(item.bookId);
};

  const isInWishlist = (bookId) =>
    wishlist.some(book => book.bookId === bookId);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        isLoading,
        isError,
        error
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

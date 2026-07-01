import { createContext, useState, useEffect, useContext } from "react";
import {
  addToCartAPI,
  getbooksAPI,
  getcartAPI,
  removeCartAPI,
  updateCartQuantityAPI,
} from "../../API/Auth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [page, settpage] = useState(() => {
    const savedPage = localStorage.getItem("currentBookPage");
    return savedPage ? Number(savedPage) : 1;
  });
  const [cart, setCart] = useState([]);
  const [loadingId, setLoadingId] = useState([]);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const token = localStorage.getItem("token");

  const {
    data: bookData,
    isLoading:isLoading2,
    isFetching,
  } = useQuery({
    queryKey: ["books", page, searchValue, selectedCategories.join(",")],

    queryFn: async ({ queryKey }) => {
      const [, page, search, categories] = queryKey;

      const res = await getbooksAPI(page, {
        search: search || "",
        category_id: categories || "",
      });

      return res.data.data;
    },
  });
const booksData = bookData;
  const { data: CartData, isLoading } = useQuery({
    queryKey: ["cart", token],
    queryFn: async () => {
      if (!token) return [];
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
        setCart((prev) => [...prev, data.data.cartItem]);
      }
      queryClient.invalidateQueries(["cart"]);
    },
    onError: (err) => {
      console.log("ERROR FULL:", err);
      console.log("ERROR DATA:", err.response?.data);
      console.log("MESSAGE:", err.response?.data?.message);
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
        position: "top-center",
      },
    );
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
        bookData,
        booksData,
        selectedCategories,
        searchValue,
        setSearchValue ,
        isLoading2,
        isFetching,
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
        page,
        settpage,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

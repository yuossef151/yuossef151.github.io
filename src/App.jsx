import { RouterProvider } from "react-router-dom";
import router from "./routes/RoutesrApp";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./Components/cartpage/CartContext";
import { WishlistProvider } from "./Components/Wishlistpage/WishlistContext";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <>
      <Toaster />

      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <RouterProvider router={router} />
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

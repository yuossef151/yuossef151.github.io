import { createBrowserRouter, createHashRouter } from "react-router-dom";
import Mainlayout from "../layouts/Mainlayout";
import Home from "../page/home/Home";
import Books from "../page/books/Books";
import About from "../page/About/About";
import Login from "../page/login/Login";
import Regester from "../page/sign/Regester";
import { GuestRoute, ProtectedRoute } from "../Components/GuestRoute";
import Profile from "../page/profile/Profile";
import Password from "../page/Password/Password";
import Cart from "../page/cart/Cart";
import Wishlist from "../page/wishlist/Wishlist";
import Singl from "../page/books/Singl";

const router = createHashRouter(
  [
    {
      path: "/",
      element: <Mainlayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "Books",
          element: <Books />,
        },
        {
          path: "single/:id",
          element: <Singl />,
        },
        {
          path: "About",
          element: <About />,
        },
        {
          path: "Profile",
          element: (
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          ),
        },
        {
          path: "Password",
          element: <Password />,
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          ),
        },
        {
          path: "Wishlist",
          element: (
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          ),
        },
        {
          path: "login",
          element: (
            <GuestRoute>
              <Login />
            </GuestRoute>
          ),
        },
        {
          path: "Regester",
          element: (
            <GuestRoute>
              <Regester />
            </GuestRoute>
          ),
        },
      ],
    },
  ],
  {
    basename: "/",
  },
);

export default router;

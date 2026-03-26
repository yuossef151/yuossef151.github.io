import { createContext, useContext, useEffect, useState } from "react";
import api from "../API/axios";
import { useQueryClient } from "@tanstack/react-query";
import { WishlistContext } from "../Components/Wishlistpage/WishlistContext";
import { CartContext } from "../Components/cartpage/CartContext";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isAuthReady, setIsAuthReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuthReady(true);
      return;
    }

    api
      .get("/profile")
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("contactData", JSON.stringify(res.data));
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("contactData");
          setUser(null);
        }
      })
      .finally(() => {
        setIsAuthReady(true);
      });
  }, []);

  const login = (data, token) => {
    localStorage.setItem("contactData", JSON.stringify(data));
    localStorage.setItem("token", data.token);
    setToken(data.token);
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("contactData");
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    queryClient.clear();
  };

  if (!isAuthReady) return null;

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

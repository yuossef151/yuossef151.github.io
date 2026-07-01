import { Outlet, useLocation } from "react-router-dom";
import Header from "../Components/header/Header";
import Footar from "../Components/footar/Footar";
import ScrollToTop from "../Components/ScrollToTop";
import { CartContext } from "../Components/cartpage/CartContext";
import { useContext, useEffect } from "react";

export default function Mainlayout() {
    const {page, settpage,} =
      useContext(CartContext);
const location = useLocation();

      useEffect(() => {

    if (!location.pathname.includes("/Books")) {
      settpage(1);
    }
    
    // مثال: إذا خرجت من صفحة الطلبات (Ordar)
    // if (!location.pathname.includes("/Ordar")) {
    //   setOrderPage(1);
    // }
    
  }, [location.pathname]);
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footar />
    </>
  );
}

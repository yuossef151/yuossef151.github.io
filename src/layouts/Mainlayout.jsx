import { Outlet } from "react-router-dom";
import Header from "../Components/header/Header";
import Footar from "../Components/footar/Footar";
import ScrollToTop from "../Components/ScrollToTop";

export default function Mainlayout() {
  return (
    <>
      <Header />
      <ScrollToTop />
      <Outlet />
      <Footar />
    </>
  );
}

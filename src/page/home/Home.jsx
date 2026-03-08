import React, { useEffect } from "react";
import Img from "../../Components/homepage/img";
import Feature from "../../Components/homepage/Feature";
import BestSeller from "../../Components/homepage/BestSeller";
import Recomend from "../../Components/homepage/Recomend";
import { useLocation } from "react-router-dom";
import toast from "react-hot-toast";

export default function Home() {



  return (
    <>
      <Img />
      <Feature />
      <BestSeller />
      <Recomend />
    </>
  );
}

import React from "react";
import { NavLink } from "react-router-dom";

export default function Logo() {
  return (
    <>
      <NavLink to="/" className="flex gap-2">
        <img src="/logo.png" alt="" />
        <p className="">Bookshop</p>
      </NavLink>
    </>
  );
}

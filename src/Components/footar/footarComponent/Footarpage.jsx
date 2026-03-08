import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
export default function Footarpage() {
  const [language, setLanguage] = useState("English");
  return (
    <>
      <div className="bg-[#3B2F4A] text-white pt-10 px-5 lg:pt-30 lg:px-15 lg:pb-40 pb-10">
        <div className="flex flex-col md:gap-5 lg:flex-row justify-between">
          <div className="flex flex-col md:justify-between  md:flex-row lg:flex-row lg:gap-4 gap-6">
            <NavLink to="/" className="flex gap-2">
              <img src="./public/logo.png" alt="" />
              <p className="">Bookshop</p>
            </NavLink>
            <ul className="flex  md:gap-5 lg:gap-10 text-[18px]">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="Books">Books</NavLink>
              </li>
              <li>
                <NavLink to="About">About us</NavLink>
              </li>
            </ul>
          </div>

          <div className="flex  lg:flex-row gap-3 pt-4 lg:pt-0">
            <Link>
              <img className="w-6 h-6" src="./public/facbok.png" alt="" />
            </Link>
            <Link>
              <img className="w-6 h-6" src="./public/inst.png" alt="" />
            </Link>
            <Link>
              <img className="w-6 h-6" src="./public/you.png" alt="" />
            </Link>
            <Link>
              <img className="w-6 h-6" src="./public/X.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-[#FFFFFF33] mt-4 pt-4 flex flex-col md:flex-row lg:flex-row justify-between">
          <p className="text-[13px] md:text-[16px]  lg:text-[16px] pb-4 lg:pb-0">
            &lt;Developed By&gt; EraaSoft &lt;All Copy Rights Reserved @2024
          </p>
          <div className="flex items-center justify-end gap-3">
            <img className="w-6 h-6" src="./public/earth.png" alt="" />
            <div className="navbar-end w-27.5">
              <div className="dropdown">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost border border-[#FFFFFF80] w-27.5"
                >
                  <p>{language}</p>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={4}
                      d="m19 12l12 12l-12 12"
                    ></path>
                  </svg>
                </div>
                <ul
                  tabIndex="-1"
                  className="menu menu-sm dropdown-content  rounded-box z-1 w-28 bg-black"
                >
                  <li>
                    <a onClick={() => setLanguage("Français")}>Français</a>
                  </li>
                  <li>
                    <a onClick={() => setLanguage("English")}>English</a>
                  </li>
                  <li>
                    <a onClick={() => setLanguage("عربي")}>عربي</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

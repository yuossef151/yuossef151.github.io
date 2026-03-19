import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
export default function Footarpage() {
  const [language, setLanguage] = useState("English");
  const [langOpen, setLangOpen] = useState(false);
  return (
    <>
      <div className="bg-[#3B2F4A] text-white pt-10 px-5 lg:pt-30 lg:px-15 lg:pb-40 pb-50">
        <div className="flex flex-col sm:max-md:gap-5 lg:flex-row justify-between">
          <div className="flex flex-col sm:max-md:justify-between  sm:max-md:flex-row lg:flex-row lg:gap-4 gap-6">
            <NavLink to="/" className="flex gap-2">
              <img src="/logo.png" alt="" />
              <p className="">Bookshop</p>
            </NavLink>
            <ul className="flex gap-6 sm:max-md:gap-5 lg:gap-10 text-[18px]">
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
              <img className="w-6 h-6" src="/facbok.png" alt="" />
            </Link>
            <Link>
              <img className="w-6 h-6" src="/inst.png" alt="" />
            </Link>
            <Link>
              <img className="w-6 h-6" src="/you.png" alt="" />
            </Link>
            <Link>
              <img className="w-6 h-6" src="/X.png" alt="" />
            </Link>
          </div>
        </div>
        <div className="border-t-2 border-[#FFFFFF33] mt-4 pt-4 flex flex-col sm:max-md:flex-row lg:flex-row justify-between">
          <p className="text-[13px] sm:max-md:text-[16px]  lg:text-[16px] pb-4 lg:pb-0">
            &lt;Developed By&gt; EraaSoft &lt;All Copy Rights Reserved @2024
          </p>
          <div className="flex items-center justify-end gap-3">
            <img className="w-6 h-6" src="/earth.png" alt="" />
            <div className="navbar-end w-27.5">
              <div
                onClick={() => setLangOpen((prev) => !prev)}
                className="dropdown relative"
              >
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost border border-[#FFFFFF80] w-27.5 flex py-1 px-2 rounded-lg cursor-pointer justify-between"
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
                  className={`menu menu-sm dropdown-content absolute rounded-box z-10 mt-2  w-28 bg-black px-2 py-3 rounded-lg flex flex-col  ${langOpen ? "istrue" : "isfalse"}`}
                >
                  <li className="">
                    <NavLink onClick={() => setLanguage("Français")}>Français</NavLink>
                  </li>
                  <li className="pt-3">
                    <NavLink onClick={() => setLanguage("English")}>English</NavLink>
                  </li>
                  <li className="pt-3">
                    <NavLink onClick={() => setLanguage("عربي")}>عربي</NavLink>
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

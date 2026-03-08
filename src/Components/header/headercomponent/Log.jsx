import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { getcartAPI } from "../../../API/Auth";
import { CartContext } from "../../cartpage/CartContext";
import { WishlistContext } from "../../Wishlistpage/WishlistContext";

export default function Log() {
  const { user, logout } = useContext(AuthContext);
  const [prof, setprof] = useState(false);
  const { Cart } = useContext(CartContext);
  console.log(Cart);

  const { wishlist, setWishlist } = useContext(WishlistContext);

  return (
    <>
      <div className="">
        {user ? (
          <div className="flex items-center gap-7">
            <div className="flex gap-4">
              <div className="relative">
                <NavLink
                  to="cart"
                  className={({ isActive }) =>
                    ` ${isActive ? "text-[#EAA451]" : "text-white"}`
                  }
                >
                  <div className="w-4.5 h-4.5 bg-[#D9176C] border border-white flex items-center justify-center rounded-3xl absolute bottom-4 left-3">
                    <span className="text-[10px] text-white">
                      {Cart?.length ?? 0}
                    </span>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 56 56"
                  >
                    <path
                      fill="currentColor"
                      d="M20.008 39.649H47.36c.913 0 1.71-.75 1.71-1.758s-.797-1.758-1.71-1.758H20.406c-1.336 0-2.156-.938-2.367-2.367l-.375-2.461h29.742c3.422 0 5.18-2.11 5.672-5.461l1.875-12.399a7 7 0 0 0 .094-.89c0-1.125-.844-1.899-2.133-1.899H14.641l-.446-2.976c-.234-1.805-.89-2.72-3.28-2.72H2.687c-.937 0-1.734.822-1.734 1.76c0 .96.797 1.781 1.735 1.781h7.921l3.75 25.734c.493 3.328 2.25 5.414 5.649 5.414m31.054-25.454L49.4 25.422c-.188 1.453-.961 2.344-2.344 2.344l-29.906.023l-1.993-13.594ZM21.86 51.04a3.766 3.766 0 0 0 3.797-3.797a3.78 3.78 0 0 0-3.797-3.797c-2.132 0-3.82 1.688-3.82 3.797c0 2.133 1.688 3.797 3.82 3.797m21.914 0c2.133 0 3.82-1.664 3.82-3.797c0-2.11-1.687-3.797-3.82-3.797c-2.109 0-3.82 1.688-3.82 3.797c0 2.133 1.711 3.797 3.82 3.797"
                    ></path>
                  </svg>
                </NavLink>
              </div>
              <div className="relative">
                <NavLink
                  to="Wishlist"
                  className={({ isActive }) =>
                    ` ${isActive ? "text-[#EAA451]" : "text-white"}`
                  }
                >
                  <div className="w-4.5 h-4.5 bg-[#D9176C] border border-white flex items-center justify-center rounded-3xl absolute bottom-4 left-3">
                    <span className="text-[10px] text-white">
                      {wishlist?.length ?? 0}
                    </span>
                  </div>

                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={24}
                    height={24}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7.75 3.5C5.127 3.5 3 5.76 3 8.547C3 14.125 12 20.5 12 20.5s9-6.375 9-11.953C21 5.094 18.873 3.5 16.25 3.5c-1.86 0-3.47 1.136-4.25 2.79c-.78-1.654-2.39-2.79-4.25-2.79"
                    ></path>
                  </svg>
                </NavLink>
              </div>
            </div>
            <div>
              <div
                onClick={() => {
                  setprof((prev) => !prev);
                }}
                className="flex gap-4 cursor-pointer"
              >
                <div className="dropdown">
                  <div
                    tabIndex={0}
                    role="button"
                    className="flex items-center btn-ghost"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-11.25 h-11.25   relative">
                        <div className="bg-[#25D994] w-[9.6px] h-[9.6px] rounded-[50%] absolute border-2  top-[3%] right-[3%]"></div>
                        <img
                          className="w-full h-full rounded-[50%] "
                          src="/profile.jpg"
                          alt=""
                        />
                      </div>
                      <div className="user">
                        <p className="text-start text-[16px]">
                          {user.user.first_name} {user.user.last_name}
                        </p>
                        <p className="text-[14px] text-[#FFFFFF80]">
                          {user.user.email}
                        </p>
                      </div>
                    </div>

                    <svg
                      className="user"
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
                    className={`menu  dropdown-content mt-5  rounded-box z-1 lg:w-full w-40 md:w-full -left-20 lg:left-0 md:left-0 bg-white text-black flex flex-col gap-4  ${prof ? "istrue" : "isfalse"}`}
                  >
                    <li className="">
                      <div className="flex py-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="none"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.618 21.25c0-3.602-4.016-6.53-7.618-6.53s-7.618 2.928-7.618 6.53M12 11.456a4.353 4.353 0 1 0 0-8.706a4.353 4.353 0 0 0 0 8.706"
                          ></path>
                        </svg>
                        <Link to={"Profile"}>Profile</Link>
                      </div>
                    </li>
                    <li className="">
                      <div className="flex py-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10s-4.477 10-10 10m0-2a8 8 0 1 0 0-16a8 8 0 0 0 0 16m1-8h4v2h-6V7h2z"
                          ></path>
                        </svg>
                        <Link to={"/"}>Order History</Link>
                      </div>
                    </li>
                    <li className="">
                      <div className="flex py-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 0 1 7-7m0 2a5 5 0 0 0-5 5c0 1 0 3 5 9.71C17 12 17 10 17 9a5 5 0 0 0-5-5"
                          ></path>
                        </svg>
                        <Link to={""}>Address</Link>
                      </div>
                    </li>
                    <li className="">
                      <div className="flex py-3">
                        <svg
                          width={20}
                          height={20}
                          viewBox="0 0 20 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <g clipPath="url(#clip0_78_1160)">
                            <path
                              d="M10 0C8.02219 0 6.08879 0.58649 4.4443 1.6853C2.79981 2.78412 1.51809 4.3459 0.761209 6.17317C0.00433286 8.00043 -0.193701 10.0111 0.192152 11.9509C0.578004 13.8907 1.53041 15.6725 2.92894 17.0711C4.32746 18.4696 6.10929 19.422 8.0491 19.8079C9.98891 20.1937 11.9996 19.9957 13.8268 19.2388C15.6541 18.4819 17.2159 17.2002 18.3147 15.5557C19.4135 13.9112 20 11.9778 20 10C19.9971 7.34872 18.9426 4.80684 17.0679 2.9321C15.1932 1.05736 12.6513 0.00286757 10 0ZM10 18.3333C8.35183 18.3333 6.74066 17.8446 5.37025 16.9289C3.99984 16.0132 2.93174 14.7117 2.30101 13.189C1.67028 11.6663 1.50525 9.99076 1.82679 8.37425C2.14834 6.75774 2.94201 5.27288 4.10745 4.10744C5.27289 2.94201 6.75774 2.14833 8.37425 1.82679C9.99076 1.50525 11.6663 1.67027 13.189 2.301C14.7118 2.93173 16.0132 3.99984 16.9289 5.37025C17.8446 6.74066 18.3333 8.35182 18.3333 10C18.3309 12.2094 17.4522 14.3276 15.8899 15.8899C14.3276 17.4522 12.2094 18.3309 10 18.3333Z"
                              fill="#222222"
                            />
                            <path
                              d="M9.99992 8.33301H9.16659C8.94557 8.33301 8.73361 8.42081 8.57733 8.57709C8.42105 8.73337 8.33325 8.94533 8.33325 9.16634C8.33325 9.38735 8.42105 9.59932 8.57733 9.7556C8.73361 9.91188 8.94557 9.99967 9.16659 9.99967H9.99992V14.9997C9.99992 15.2207 10.0877 15.4327 10.244 15.5889C10.4003 15.7452 10.6122 15.833 10.8333 15.833C11.0543 15.833 11.2662 15.7452 11.4225 15.5889C11.5788 15.4327 11.6666 15.2207 11.6666 14.9997V9.99967C11.6666 9.55765 11.491 9.13372 11.1784 8.82116C10.8659 8.5086 10.4419 8.33301 9.99992 8.33301Z"
                              fill="#222222"
                            />
                            <path
                              d="M10 6.66699C10.6904 6.66699 11.25 6.10735 11.25 5.41699C11.25 4.72664 10.6904 4.16699 10 4.16699C9.30964 4.16699 8.75 4.72664 8.75 5.41699C8.75 6.10735 9.30964 6.66699 10 6.66699Z"
                              fill="#222222"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_78_1160">
                              <rect width="20" height="20" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                        <Link to={""}>Help</Link>
                      </div>
                    </li>
                    <li className="">
                      <div className="flex py-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={20}
                          height={20}
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
                          ></path>
                        </svg>
                        <Link
                          onClick={() => {
                            logout();
                          }}
                        >
                          Log Out
                        </Link>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex items-center"></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-4">
            <button className="bg-[#D9176C] px-4 py-2  rounded-[10px]  ">
              <NavLink to="login">Log in</NavLink>
            </button>

            <button className="bg-white px-4 py-2 text-[#D9176C] rounded-[10px]">
              <NavLink to="Regester">Sign up</NavLink>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

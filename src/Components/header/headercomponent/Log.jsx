import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { CartContext } from "../../cartpage/CartContext";
import { WishlistContext } from "../../Wishlistpage/WishlistContext";

export default function Log() {
  const { user, logout } = useContext(AuthContext);
  const [prof, setprof] = useState(false);

  const { Cart } = useContext(CartContext);

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
                <div className="dropdown relative ">
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
                          {user?.user?.first_name||user?.data?.first_name} {user?.user?.last_name||user?.data?.last_name}
                        </p>
                        <p className="text-[14px] text-[#FFFFFF80]">
                          {user?.user?.email||user?.data?.email}
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
                    className={`menu dropdown-content absolute mt-5 rounded-box z-10 lg:w-full w-40 sm:max-md:w-full -left-20 lg:left-0 sm:max-md:left-0 bg-white text-black flex flex-col gap-4 px-2 rounded-lg ${prof ? "istrue" : "isfalse"}`}
                  >
                    <li className="">
                      <div className="flex py-3 items-center gap-2">
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
                        <NavLink to="Profile">Profile</NavLink>
                      </div>
                    </li>
                    <li className="">
                      <div className="flex py-3 items-center gap-2">
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
                        <NavLink to="/">Order History</NavLink>
                      </div>
                    </li>

                    <li className="">
                      <div className="flex py-3 items-center gap-2 ">
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
                        <NavLink
                          onClick={() => {
                            logout();
                          }}
                        >
                          Log Out
                        </NavLink>
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
            <NavLink
              to="login"
              className="bg-[#D9176C] mybtn  px-4 py-2  rounded-[10px]  "
            >
              Log in
            </NavLink>

            <NavLink
              to="Regester"
              className="bg-white px-4 py-2 mybtn2 text-[#D9176C] rounded-[10px]"
            >
              Sign up
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

import React, { useEffect, useRef, useState } from "react";
import Logo from "./headercomponent/logo";
import Nav from "./headercomponent/nav";
import Log from "./headercomponent/Log";

export default function Header() {
  const [opn, setopn] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setopn(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <div className="w-full flex bg-[#ffffff4d] text-white lg:justify-between md:justify-between lg:px-35 px-3 py-6  items-center absolute  top-0 z-20">
        <div ref={navRef} className="  flex  lg:gap-20 md:gap-10 lg:w-[35%] grow">
          <Logo />
          <Nav opn={opn} setopn={setopn} />
        </div>
        <div className="flex items-center gap-4">
          <Log />
          <svg
            onClick={(e) => {
              e.stopPropagation();
              setopn((prev) => !prev);
            }}
            className="bar"
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              fillRule="evenodd"
              d="M3 16h18v2H3zm0-5h18v2H3zm0-5h18v2H3z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}

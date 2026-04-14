import { useEffect, useRef, useState } from "react";

export default function Categories({
  category,
  handleCategoryChange,
  selectedCategories,
}) {
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
      <div className="lg:w-100 pt-10  h-full lg:pt-15 sm:max-md:pt-5 lg:pb-24 sm:max-md:pb-5 ps-10 pe-5">
        <div ref={navRef} className="flex gap-2">
          <button
            onClick={() => {
              opn ? setopn(false) : setopn(true);
            }}
            className="flex gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              className={
                opn
                  ? "text-black lg:text-black sm:max-md:text-black"
                  : " text-[#D9176C] lg:text-black sm:max-md:text-black"
              }
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
                d="M21.25 12H8.895m-4.361 0H2.75m18.5 6.607h-5.748m-4.361 0H2.75m18.5-13.214h-3.105m-4.361 0H2.75m13.214 2.18a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm-9.25 6.607a2.18 2.18 0 1 0 0-4.36a2.18 2.18 0 0 0 0 4.36Zm6.607 6.608a2.18 2.18 0 1 0 0-4.361a2.18 2.18 0 0 0 0 4.36Z"
              ></path>
            </svg>
            <p>Filter</p>
          </button>
        </div>
        <div
          className={
            opn
              ? "  bg-white lg:w-full p-5 mt-5 sm:max-md:w-full opn"
              : "  bg-white w-full lg:w-full p-5 mt-5 sm:max-md:w-full close"
          }
        >
          <p>Categories</p>
<div className="flex flex-col sm:max-md:flex-row sm:max-md:flex-wrap  gap-x-4 gap-y-2 py-5">
  {category.map((el, index) => (
    <div
      key={index}
      className="flex items-center gap-5 w-full sm:max-md:w-75 lg:w-full"
    >
      <input
        id={el.categoryName}
        type="checkbox"
        checked={selectedCategories.includes(el.id)}
        onChange={() => handleCategoryChange(el.id)}
        className="cursor-pointer accent-[#D9176C] w-4 h-4"
      />
      <label
        htmlFor={el.categoryName}
        className="flex justify-between w-full cursor-pointer"
      >
        <p>{el.categoryName}</p>
        <p className="text-[14px] text-[#22222280]">({el.books_count})</p>
      </label>
    </div>
  ))}
</div>
        </div>
      </div>
    </>
  );
}

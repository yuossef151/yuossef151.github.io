import { NavLink } from "react-router-dom";

export default function Nav({ opn, setopn }) {
  const nav = [
    {
      link: "Home",
      to: "/",
    },
    {
      link: "Books",
      to: "Books",
    },
    {
      link: "About us",
      to: "About",
    },
  ];
  return (
    <>
      <ul
        className={`flex flex-col lg:flex-row sm:max-md:flex-row md:flex-row  sm:max-md:gap-5 justify-around gap-9 text-[18px]  ${opn ? "mynav1" : "mynav"}`}
      >
        {nav.map((el, index) => {
          return (
            <li key={index}>
              <NavLink
                onClick={(e) => {
                  e.stopPropagation();
                  setopn((prev) => !prev);
                }}
                className={({ isActive }) =>
                  ` ${isActive ? "text-[#EAA451]" : ""}`
                }
                to={el.to}
              >
                {el.link}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </>
  );
}

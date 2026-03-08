import { Link, NavLink } from 'react-router-dom'

export default function Nav({opn , setopn}) {
  return (
    <>
      <ul className={`flex flex-col lg:flex-row md:flex-row  md:gap-5 justify-around gap-9 text-[18px]  ${opn ? "mynav1" : "mynav"}`}>
        <li><NavLink className={({ isActive }) => ` ${isActive ? "text-[#EAA451]" : ""}`}  to="/">Home</NavLink></li>
        <li><NavLink className={({ isActive }) => ` ${isActive ? "text-[#EAA451]" : ""}`} to="Books">Books</NavLink></li>
        <li><NavLink className={({ isActive }) => ` ${isActive ? "text-[#EAA451]" : ""}`} to="About">About us</NavLink></li>
      </ul>
    </>
  )
}

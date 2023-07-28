import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UserState } from "../Redux/Users/Interface"
import { AppDispatch, RootState } from "../Redux/store"
import { BiMenuAltRight } from "react-icons/bi"
import { BsFillCalendar3EventFill } from "react-icons/bs"
import { RiLogoutBoxFill } from "react-icons/ri"
import { FaUserAlt } from "react-icons/fa"
import { NavLink, useLocation } from "react-router-dom"
import { logout } from "../Redux/Users/Slice"
import { MdLeaderboard, MdOutlineLeaderboard } from "react-icons/md"

const Nav: React.FC<{}> = ({ }) => {
    const dispatch = useDispatch<AppDispatch>()
    const UserReducer: UserState = useSelector((state: RootState) => state.user)
    const [navOpen, setNavOpen] = useState(false)


    
    const lct = useLocation()
        // console.log(lct.pathname)

    useEffect(() => {       
        const container = document.getElementById("page_container")
    const bg_container = document.getElementById("bg_container")
        if(lct.pathname === "/events_management"){
        bg_container.style.backgroundColor = "rgba(5,150,105)"
      }
      else {
        container.addEventListener("scroll", e => {
            const value = (container.scrollTop / 300)
            if (container.scrollTop > 10) {
                bg_container.style.backgroundColor = "rgba(5,150,105, alpha)".replace("alpha", value.toString())
                bg_container.classList.add("shadow-lg")
            } else {
                bg_container.style.backgroundColor = "unset"
                bg_container.classList.remove("shadow-lg")
            }
        })
}}, [lct.pathname])

console.log(lct.pathname)

    return (
        <div className="fixed top-0 left-0 w-full z-50 rounded-b-lg" id="bg_container">
            <div className="flex justify-between items-center px-3  rounded-b-md  h-12">
                <div>
                    <NavLink to={"/events"}><img className="object-cover w-32" src="assets\logo\logo.png" alt="LOGO" /></NavLink>

                </div>

                <BiMenuAltRight onClick={e => setNavOpen(!navOpen)} className="block md:hidden text-white text-3xl cursor-pointer" />
                <div className="hidden md:flex gap-8 pr-5">
                    <NavLink className="flex items-center gap-2 text-white hover" to={"/profile/" + (UserReducer.current.user === null ? "" : UserReducer.current.user.id)}>
                        <FaUserAlt />
                        Профил
                    </NavLink>
                    <NavLink className="flex items-center gap-2 text-white" to={"/events"}>
                        <BsFillCalendar3EventFill />
                        Настани
                    </NavLink>
                    <NavLink className="flex items-center gap-2 text-white" to={"/leader_board"}>
                        <MdLeaderboard />
                        Табела на поени
                    </NavLink>
                    <NavLink onClick={e => dispatch(logout())} className="flex items-center gap-2 text-white" to={"/auth/login"}>
                        <RiLogoutBoxFill />
                        Одјави ме
                    </NavLink>
                </div>
            </div>
            <div className={
                navOpen === true ? "block md:hidden transition-all transition-200 p-2 h-[130px] bg-white w-[98%] rounded mx-auto mt-2 shadow-md" :
                    "block md:hidden transition-all transition-200 h-[0px] bg-white w-[98%] rounded mx-auto mt-2 shadow-md overflow-hidden"
            }>
                <NavLink className="mb-1 flex items-center gap-2 text-slate-600 hover:text-emerald-600" to={"/profile/" + UserReducer.current.user.id}>
                    <FaUserAlt />
                    Профил
                </NavLink>
                <NavLink className="mb-1 flex items-center gap-2 text-slate-600 hover:text-emerald-600" to={"/events"}>
                    <BsFillCalendar3EventFill />
                    Настани
                </NavLink>
                <NavLink className="mb-1 flex items-center gap-2 text-slate-600 hover:text-emerald-600" to={"/leader_board"}>
                        <MdLeaderboard />
                        Табела на поени
                    </NavLink>
                    {/* <NavLink className="mb-1 flex items-center gap-2 text-slate-600 hover:text-emerald-600" to={"/leader_board"}>
                        <MdLeaderboard />
                        Креирај настан
                    </NavLink> */}
                <NavLink onClick={e => dispatch(logout())} className="flex items-center gap-2 text-slate-600 hover:text-emerald-600" to={"/auth/login"}>
                    <RiLogoutBoxFill />
                    Одјави се
                </NavLink>
            </div>
        </div>
    )
}

export default Nav
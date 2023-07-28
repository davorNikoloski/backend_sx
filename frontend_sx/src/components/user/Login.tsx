import React, { useEffect, useState } from "react"
import { UserState } from "../../../Redux/Users/Interface"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../Redux/store"
import { UserActions } from "../../../Redux/Users/Actions"
import { IonLoading } from "@ionic/react"
import { setUserState } from "../../../Redux/Users/Slice"
import { Redirect } from "react-router"
import { NavLink } from "react-router-dom"

const Login: React.FC<{}> = ({ }) => {
    const dispatch = useDispatch<AppDispatch>()

    const UserReducer: UserState = useSelector((state: RootState) => state.user)

    const [user, setUser] = useState<{ email: string, password: string }>({
        email: "", password: ""
    })

    useEffect(() => {
        dispatch(setUserState({
            current: {
                ...UserReducer.current,
                loginStatus: {
                    ...UserReducer.current.loginStatus,
                    status: "idle"
                }
            }
        }))
    }, [])

    const handleSubmit = e => {
        e.preventDefault()
        const data = new FormData()
        data.append("email", user.email)
        data.append("password", user.password)

        dispatch(UserActions.login({ user: data }))
    }

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name] : e.target.value
        })
        dispatch(setUserState({
            current: {
                ...UserReducer.current,
                loginStatus: {
                    ...UserReducer.current.loginStatus,
                    status: "idle"
                }
            }
        }))
    }


    return (
        <div className="bg-no-repeat bg-cover bg-center relative" style={{
            "background": "url(https://wallpapers.com/images/featured/8g9017acqfddycrl.jpg)",
            "backgroundPosition": "center center",
            "backgroundSize": "contain"
        }}>
            <div className="hidden md:block absolute bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0">
            {UserReducer.current.user !== null && UserReducer.current.loginStatus.status === "fulfilled" ?  <Redirect to={"/profile/" + UserReducer.current.user.id} /> : null}
            </div>
            <div className="min-h-screen md:flex sm:flex-row mx-auto justify-center w-full md:max-w-[90%] shadow">
                <div className="w-full h-[200px] md:hidden" style={{
                    "background": "url(https://wallpapers.com/images/featured/8g9017acqfddycrl.jpg)",
                    "backgroundPosition": "center center",
                    "backgroundSize": "cover"
                }}>
                    <div className="flex justify-center items-center w-full h-full bg-gradient-to-b from-green-500 to-green-400 opacity-75 inset-0 z-0">
                        <h1 className="text-5xl text-center text-white animate-pulse">Зелена Оаза</h1>
                    </div>
                </div>
                <div className="flex justify-center self-center z-10 w-full md:w-auto">
                    <div className="p-12 min-h-screen md:min-h-[20px] bg-white mx-auto md:shadow-xl md:rounded-2xl w-full md:w-100 ">
                        <div className="mb-4">
                            <h3 className="font-semibold text-2xl text-gray-800">Најави се</h3>
                            <p className="text-gray-500">Внесете ги вашите информации за најава.</p>
                        </div>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-gray-700 tracking-wide">Е-Пошта</label>
                                <input name="email" value={user.email} onChange={e => handleChange(e)} className=" w-full text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="email" placeholder="mail@gmail.com" />
                            </div>
                            <div className="space-y-2">
                                <label className="mb-5 text-sm font-medium text-gray-700 tracking-wide">
                                    Лозинка
                                </label>
                                <input name="password" value={user.password} onChange={e => handleChange(e)} className="w-full content-center text-base px-4 py-2 border  border-gray-300 rounded-lg focus:outline-none focus:border-green-400" type="password" placeholder="Внесете ја вашата лозинка" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="text-sm flex flex-col gap-1">
                                    <a href="#" className="text-green-400 hover:text-green-500">
                                        Ја заборавив лозинката
                                    </a>
                                    <NavLink to="/auth/register" className='underline underline-offset-2'>Немате корисничка сметка?</NavLink>
                                </div>
                            </div>
                            {UserReducer.current.loginStatus.status === "pending" ? <div className="-full flex justify-center bg-blue-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-100">{UserReducer.current.loginStatus.message}</div> : 
                            UserReducer.current.loginStatus.status === "rejected" ? <div className="-full flex justify-center bg-red-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-100">{UserReducer.current.loginStatus.message}</div> :
                            UserReducer.current.loginStatus.status === "fulfilled" ? <div className="-full flex justify-center bg-emerald-600 text-gray-100 p-3  rounded-full tracking-wide font-semibold shadow-lg cursor-pointer transition ease-in duration-100">{UserReducer.current.loginStatus.message}</div> :
                            <div>
                                <button onClick={e => handleSubmit(e)} type="submit" className="w-full flex justify-center bg-green-400  hover:bg-green-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500">
                                    Најави се
                                </button>
                            </div>}
                        </div>
                        <div className="pt-5 text-center text-gray-400 text-xs">
                            <span>Copyright &copy; ZelenaOaza 2023</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
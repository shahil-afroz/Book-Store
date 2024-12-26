import { Link, useNavigate } from "react-router-dom"
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { FaHouseUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { authActions } from "../../Store/auth"
export default function Sidebar({ data }) {
    const history = useNavigate();
    const role = useSelector((state) => state.auth.role);
    const dispatch = useDispatch();
    return (
        <div className="p-4 rounded bg-gradient-to-r from-pink-500 to-red-500 flex flex-col justify-between items-center h-[100%]">
            <div className="flex flex-col justify-center items-center ">
                <div className="bg-white rounded-full text-6xl p-2 mt-4 text-blue-500"><FaHouseUser /></div>
                <p className="mt-3 text-xl font-semibold text-white">{data.username}</p>
                <p className="mt-1 text-normal text-white">{data.email}</p>
                <div className="bg-yellow-200 w-full mt-4 h-[1px]"></div>
            </div>
            {
                role === "user" && <div className="w-full flex flex-col justify-center items-center">
                    <Link to="/Profile" className="font-semibold w-full py-2 text-center text-white bg-teal-700 hover:bg-teal-600 rounded transition-all">Favourites</Link>
                    <Link to="/Profile/OrderHistory" className="font-semibold w-full py-2   text-white bg-teal-700 text-center mt-4 hover:bg-teal-600 rounded transition-all">Order History</Link>
                    <Link to="/Profile/Settings" className="font-semibold w-full text-white  bg-teal-700 py-2 text-center mt-4 hover:bg-teal-600 rounded transition-all">Settings</Link>

                </div>
            }
            {
                role === "admin" && <div className="w-full flex flex-col justify-center items-center">
                    <Link to="/Profile" className="font-semibold w-full py-2 text-center text-white bg-teal-700 hover:bg-teal-600 rounded transition-all">All Orders</Link>
                    <Link to="/Profile/AddBooks" className="font-semibold w-full py-2   text-white bg-teal-700 text-center mt-4 hover:bg-teal-600 rounded transition-all">Add Books </Link>


                </div>
            }
            <button className="w-5/6 mt-4 font-semibold flex items-center text-white justify-center py-2 rounded bg-teal-600 hover:bg-teal-500 transition-all duration-100 "
                onClick={() => {
                    dispatch(authActions.logout());
                    dispatch(authActions.changeRole("user"));
                    localStorage.clear("id");
                    localStorage.clear("token");
                    localStorage.clear("role");
                    history("/");
                }}
            >LogOut <FaArrowRightFromBracket className="ms-4" /></button>
        </div>
    )
}
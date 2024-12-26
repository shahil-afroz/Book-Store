import axios from "axios"
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { useEffect, useState } from "react"
import { IoOpenOutline } from "react-icons/io5";
import Loader from "../Components/Loader/Loader";
import SeeUsersData from "./SeeUsersData";
export default function AllOrders() {
    const [AllOrders, setAllOrders] = useState()
    const [userDiv,setUserDiv]=useState("hidden")
   const[userDivData,setUserDivData]= useState()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,

    };
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:8081/api/v1/get-all-order", { headers }
            )
            setAllOrders(response.data.data);
        }
        fetch();
    }, [])
    return (
        <>
            {!AllOrders && <div className="h-[100%] flex items-center justify-center"><Loader /></div>
            }
            {
                AllOrders && AllOrders.length > 0 &&
                (
                    <div className="h-[100%] overflow-scroll  p-4">
                        <h1 className="text-5xl font-medium text-zinc-800 mb-8">All Orders</h1>
                        <div className="mt-4 bg-black w-full rounded text-xl py-2 px-4 flex gap-2 text-zinc-300">
                            <div className="w-[3%]">
                                <h1 className="text-center">Sr.</h1>
                            </div>
                            <div className="w-[22%]">
                                <h1 className="">Books</h1>
                            </div>
                            <div className="w-[45%]">
                                <h1 className="">Description</h1>
                            </div>
                            <div className="w-[9%]">
                                <h1 className="">Price</h1>
                            </div>
                            <div className="w-[16%]">
                                <h1 className="">Status</h1>
                            </div>
                            <div className="w-[5%]">
                                <h1 className=""><FaUserLarge /></h1>
                            </div>

                        </div>

                        {
                            AllOrders.map((items, i) => (
                                <div className="mt-4 bg-black w-full rounded text-xl py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer text-zinc-300 " key={items.id}>
                                    <div className="w-[3%]">
                                        <h1 className="text-center">{i+1}</h1>
                                    </div>
                                    <div className="w-[22%]">
                                     <Link to={`/view-book-details/${items._id}`} className="hover:bg-blue-300">
                                     {items.book.title}
                                     </Link>
                                    </div>
                                    <div className="w-[45%]">
                                        <h1 className="">{items.book.description.slice(0,50)}...</h1>
                                    </div>
                                    <div className="w-[9%]">
                                        <h1 className="">{items.book.price}</h1>
                                    </div>
                                    <div className="w-[16%]">
                                        <h1 className="font-semibold">
                                            <button className="hover:scale-105 transition-all duration-300">
                                            {
                                                items.status === "Ordered Placed" ? (
                                                    <div className="text-green-800">{items.status}</div>
                                                ) : items.status === "Ordered Canceled" ? (
                                                    <div className="text-red-500">{items.status}</div>
                                                ) : (
                                                    items.status
                                                )
                                            }
                                            </button>
                                        </h1>
                                    </div>
                                    <div className="w-[5%]">
                                       <button className="text-xl hover:text-orange-400"
                                       onClick={()=>{
                                        setUserDiv("fixed")
                                        setUserDivData(items.user)
                                       }

                                       }
                                       ><IoOpenOutline /></button>
                                    </div>

                                </div>
                            )

                            )
                        }
                    </div>
                )
            }
            {
                userDivData &&(
                    <SeeUsersData
                    userDiv={userDiv}
                    userDivData={userDivData}
                    setUserDiv={setUserDiv}
                    />
                )
            }
        </>
    )
}
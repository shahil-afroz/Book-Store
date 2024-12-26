import { useEffect, useState } from "react"
import Loader from "../Loader/Loader";
import axios from "axios";
import { Link } from "react-router-dom";
export default function OrderHistory() {
    const [OrderHistory, setOrderHistory] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:8081/api/v1/get-order-history", { headers }
            );
            setOrderHistory(response.data.data)
           
        }
        fetch();
    }
        , [])
    return (
        <>
            {
                !OrderHistory && (<div className="flex flex-col h-[100%] justify-center items-center"><Loader /></div>)
            }
            {
                OrderHistory && OrderHistory.length === 0 &&
                (<div className="h-[80vh] p-4 text-zinc-700">
                    <div className="h-[100%] flex flex-col items-center justify-center">
                        <h1 className="font-semibold text-5xl text-zinc-700">No Order History</h1>
                    </div>
                </div>)
            }
            {
                OrderHistory && OrderHistory.length > 0 && (
                    <div className="h-[100%] overflow-scroll  p-4">
                        <h1 className="text-5xl font-medium text-zinc-800 mb-8">Your Order History</h1>
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
                                <h1 className="">Mode</h1>
                            </div>
                        </div>
                        {
                            OrderHistory.map((items, i) => (
                                <div className="hover:bg-zinc-700 hover:cursor-pointer bg-zinc-800 text-white w-full  py-2 px-4  flex gap-2" key={items._id}>
                                 
                                    <div className="w-[3%]">

                                        <h1 className="text-center">{i + 1}.</h1>
                                    </div>
                                    <div className="w-[22%]">
                                        <Link to={`/view-book-details/${items._id}`}
                                            className="hover:text-blue-400"
                                        >{items.book.title}</Link>
                                    </div>
                                    <div className="w-[45%]">
                                        <h1 className="">{items.book.description.slice(0, 50)}...</h1>
                                    </div>
                                    <div className="w-[9%]">
                                        <h1 className="">₹{items.book.price}</h1>
                                    </div>
                                    <div className="w-[16%]">
                                        <h1 className="font-semibold text-green-500">
                                            {
                                                items.status === "Ordered Placed" ? (
                                                    <div className="text-green-800">{items.status}</div>
                                                ) : items.status === "Ordered Canceled" ? (
                                                    <div className="text-red-500">{items.status}</div>
                                                ) : (
                                                    items.status
                                                )
                                            }
                                        </h1>
                                    </div>
                                    <div className="w-[5%] ">
                                        <h1 className="text-zinc-700">COD</h1>
                                    </div>
                                    
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </>
    )
}
import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Components/Loader/Loader"
import BookCard from "../Components/BookCard/BookCard"
export default function AllBooks() {
    const [Data, setData] = useState();
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:8081/api/v1/get-all-book"
            );
            setData(response.data.data);
        }
        fetch();
    }
        , [])
    return (

        <div className="px-10 h-screen py-8">
            <h1 className="text-3xl  font-semibold">All Books</h1>
            {!Data && (<div className="flex justify-center items-center my-8"><Loader /></div>)}
            <div className="my-8 flex gap-2">
                {Data && Data.map((items, i) => (
                    <div key={i} className="w-[39vh] ">
                        <BookCard data={items} />{""}
                    </div>
                ))}
            </div>
        </div>

    )
}

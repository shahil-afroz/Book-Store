import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../Loader/Loader";
import BookCard from "../BookCard/BookCard";
export default function Favourites(){
 const [favourites,setFavourites]=useState()
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`
      }
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:8081/api/v1/get-favourite-books",{headers}
            );
          setFavourites(response.data.data);
        }
        fetch();
    }
        , [favourites])
    return(
<>
{!favourites && (<div className="flex justify-center items-center my-8"><Loader /></div>)}
        {
          favourites &&  favourites.length===0&& (<div className="flex justify-center h-[100%] items-center text-5xl font-semibold text-zinc-700 ">No Favourite Book</div>)
        }
        <div className="my-8 grid grid-cols-4 gap-4">
                {favourites && favourites.map((items, i) => (
                <div key={i}>
                    <BookCard data={items} favourite={true}/>{""}
                </div>
            ))}
        </div>
       
        </>
    )
}
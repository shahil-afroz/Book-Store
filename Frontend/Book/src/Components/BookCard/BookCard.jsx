import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import img from "../../../assets/Haunted.jpg"
export default function BookCard({ data, favourite }) {
  const [Data, setData] = useState();


  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  }
  const handelRemove = async () => {
    const response = await axios.delete(
      "http://localhost:8081/api/v1/delete-book-from-favourites",

      { headers }
    );
    alert(response.data.message);
  };

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
    <div className="  font-custom group inline-block focus:outline-none focus:ring ">
      <div className="rounded   p-10 bg-[#b1d0b0] border-current group-active:text-opacity-75 flex-col inline-block border-2" >
        <Link to={`/view-book-details/${data._id}`}>
          <div className="text-black ">
            <div className=" rounded flex items-center justify-center">
              <img src={img} alt="/"  className="h-[25vh] w-[25vh]"/>
            </div>
            <h1 className="mt-4 text-xl font-medium">{data.title}</h1>
            <p className="mt-2 font-medium">By:{data.author}</p>
            <p className="mt-2 font-medium text-xl">₹{data.price}</p>
          </div>
        </Link>
        {favourite && (
          <button className="bg-white  text-black rounded-lg border px-4 mt-4 justify-center items-center " onClick={handelRemove}>Remove From Favourite</button>
        )}

      </div>

    </div>


  )
}
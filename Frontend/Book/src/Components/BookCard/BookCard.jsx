import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import img from "../../../assets/Haunted.jpg";

export default function BookCard({ data, favourite }) {
  const [Data, setData] = useState();

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: data._id
  };

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
    };
    fetch();
  }, []);

  return (
    <div className="group relative">
      <div className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 bg-[#b1d0b0]">
        <Link to={`/view-book-details/${data._id}`}>
          <div className="p-4">
            <div className="overflow-hidden rounded-md">
              <img
                src={img}
                alt="Book Cover"
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="mt-4 space-y-2">
              <h1 className="text-lg font-semibold text-gray-800 truncate">
                {data.title}
              </h1>
              <p className="text-sm text-gray-600">By: {data.author}</p>
              <div className="flex items-center justify-between">
                <p className="text-lg font-bold text-gray-800">
                  ₹{data.price}
                </p>
              </div>
            </div>
          </div>
        </Link>
        {favourite && (
          <div className="p-4 pt-0">
            <button
              onClick={handelRemove}
              className="w-full py-2 text-sm font-medium text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition-colors duration-300"
            >
              Remove From Favourite
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
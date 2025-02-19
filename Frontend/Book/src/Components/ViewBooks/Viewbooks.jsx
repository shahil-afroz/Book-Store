import { Link, useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import { IoHeartOutline } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader"
import { GrLanguage } from "react-icons/gr";
import { useSelector } from "react-redux";

import img from "../../../assets/Haunted.jpg"
export default function ViewBooks() {
    const { id } = useParams();
    const navigate=useNavigate();
    const [Data, setData] = useState();

    //for login users
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const role = useSelector((state) => state.auth.role);

    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid: id
    };
const handleFavourite = async () => {
    try {
        // Send PUT request
        const response = await axios.put(
            "http://localhost:8081/api/v1/add-book-to-favourite", {},
            // Request data is passed as the second argument
            { headers }  // Headers as the third argument
        );
        // Log the book ID and the response
        alert(response.data.message);     
    } catch (error) {
        // Log any errors for debugging
        console.error("Error adding book to favourites:", error.response ? error.response.data : error.message);
    }
};
  const handelRemove = async () => {
  const response = await axios.delete(
      "http://localhost:8081/api/v1/delete-book", 
      { headers }  // Headers as the third argument
    );
    alert(response.data.message);
    navigate("/All-books");
  };
    //for cart
    const handleCart = async () => {
        try {
            // Send PUT request
            const response = await axios.put(
                "http://localhost:8081/api/v1/add-to-cart", {},
  
                { headers }  // Headers as the third argument
            );
            // Show response message
            alert(response.data.message); // Assuming the API returns a message in the response
        } catch (error) {
            // Log any errors for debugging
            console.error("Error adding product to cart:", error.response ? error.response.data : error.message);
            alert("Failed to add product to cart.");
        }
    };
    //individual book data which is get by the headers id
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                `http://localhost:8081/api/v1/get-book-by-id/${id}`
            );
            setData(response.data.data);
        }
        fetch();
    }
        , [])
    return (
        <>
            {Data &&
                <div className="px-12 py-8 flex gap-8 min-h-screen  bg-zinc-900 items-start">
                    <div className=" w-3/6  ">
                        <div className=" mt-[10vh] bg-zinc-700 p-12 rounded flex justify-around">
                            <img src={img} alt="/"  className="h-[96vh] w-[80vh]"/>
                            {
                                isLoggedIn === true && role === "user" && <div className="flex flex-col ml-5">
                                    <button className="bg-white rounded-full text-3xl p-2" onClick={handleFavourite}><IoHeartOutline /></button>
                                    <button className="bg-white rounded-full text-3xl p-2 text-blue-500 mt-4" onClick={handleCart}><FaCartPlus /></button>
                                </div>
                            }
                            {
                                isLoggedIn === true && role === "admin" && <div className="flex flex-col ml-5">
                                    <Link to={`/UpdateBooks/${id}`}className="bg-white rounded-full text-3xl p-2"><FaEdit /></Link>
                                    <button className="bg-white rounded-full text-3xl p-2 text-blue-500 mt-4" onClick={handelRemove}><MdDelete /></button>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="p-4 w-3/6">
                        <h1 className="text-4xl text-zinc-100 font-semibold">{Data.title}</h1>
                        <p className="text-zinc-300 mt-1 "> By {Data.author}</p>
                        <p className="text-zinc-400 mt-4 text-xl">{Data.description}</p>
                        <p className="flex mt-4 items-center justify-start text-zinc-300"><GrLanguage className="me-2" />{Data.language}</p>
                        <p className="mt-4 text-zinc-100 text-3xl font-semibold">

                            Price : ₹{Data.price}
                        </p>
                    </div>
                </div>
                         }
            {!Data && <div className="h-screen flex items-center justify-center bg-zinc-700"><Loader /></div>}

        </>

    )
}
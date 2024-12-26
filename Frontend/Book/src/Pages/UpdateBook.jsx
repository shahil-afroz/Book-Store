import axios from "axios";
import { useState,useEffect } from "react";
import { useParams,useNavigate } from "react-router-dom";
export default function UpdateBooks() {
    const [Data, setData] = useState({
        url: "",
        title: "",
        author: "",
        price: "",
        description: "",
        language: ""
    });
    const { id } = useParams();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
        bookid:id
    };
    const change = (e) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value })
    }
    const navigate=useNavigate();
    const submit = async () => {

        try {
            if (
                Data.url === "" ||
                Data.title === "" ||
                Data.author === "" ||
                Data.price === "" ||
                Data.description === "" ||
                Data.language === ""
            ) {
                alert("All Fields Are required")
            } else {
                const response = await axios.put(
                    "http://localhost:8081/api/v1/Update-book", Data, { headers }
                );
               
            
            setData({
                url: "",
                title: "",
                author: "",
                price: "",
                description: "",
                language: ""
            });
            
            alert(response.data.message)
            navigate(`/view-book-details/${id}`)
        }
    }

        catch (error) {
            alert(error)
        }

    }

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
            <div className="h-[100%] p-4 overflow-auto">
                <h1 className="text-3xl font-normal text-black mb-8">Update Books Here</h1>
                <div className="p-4 bg-zinc-800 rounded ">
                    <div>
                        <label htmlFor="" className="text-zinc-400">
                            Image
                        </label>
                        <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 "
                            placeholder="URL of the Image"
                            name="url"
                            required
                            value={Data.url}
                            onChange={change}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="text-zinc-400">
                            Title
                        </label>
                        <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 "
                            placeholder=" Title of the Book"
                            name="title"
                            required
                            value={Data.title}
                            onChange={change}
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="text-zinc-400">
                            Author 
                        </label>
                        <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 "
                            placeholder="  Author Of Book"
                            name="author"
                            required
                            value={Data.author}
                            onChange={change}
                        />
                    </div>
                    <div className="mt-4 flex gap-4">
                        <div className="w-3/6">
                            <label htmlFor="" className="text-zinc-400">
                              Language
                            </label>
                            <input type="text" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 "
                                placeholder="Language Of Book"
                                name="language"
                                required
                                value={Data.language}
                                onChange={change}
                            />
                        </div>
                        <div className="w-3/6">
                            <label htmlFor="" className="text-zinc-400">
                              Price
                            </label>
                            <input type="number" className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 "
                                placeholder="PriceOf Book"
                                name="price"
                                required
                                value={Data.price}
                                onChange={change}
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <label htmlFor="" className="text-zinc-400">
                      Description of the book
                        </label>
                      <textarea name="description" rows="5"
                       placeholder="Description  Of Book"
                   className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 "
                       required
                       value={Data.description}
                       onChange={change}
                      />
                    </div>
                    <button className="mt-4 px-3 bg-blue-500 text-white font-light py-2 rounded" onClick={submit}>
                        Add Book
                    </button>
                </div>

            </div>
        </>
    )
}
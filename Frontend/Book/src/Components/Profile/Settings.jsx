import axios from "axios";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
export default function Settings() {
    const [Value, setValue] = useState({ adress: "" });
    const [ProfileData, setProfileData] = useState();
    const headers = {
        id: localStorage.getItem("id"),
        authorization: `Bearer ${localStorage.getItem("token")}`,
    }
    useEffect(() => {
        const fetch = async () => {
            const response = await axios.get(
                "http://localhost:8081/api/v1/get-user-info", { headers }
            );

            setProfileData(response.data);
            setValue({ adress: response.data.adress });

        }
        fetch();
    }
        , [])
    const change = (e) => {
        const { name, value } = e.target;
        setValue({ ...Value, [name]: value })
    }


    const submitAdress = async () => {
        try {
            const response = await axios.put(
                "http://localhost:8081/api/v1/update-adress",
                Value,
                { headers }
            );
            alert(response.data.message);


            setProfileData(response.data.updatedProfileData);
        } catch (error) {
            if (error.response) {
                console.error("Server Error:", error.response.status, error.response.data);
            } else if (error.request) {
                console.error("No Response:", error.request);
            } else {
                console.error("Request Error:", error.message);
            }
        }
    };
    return (
        <>
            {!ProfileData && (<div className="flex justify-center items-center h-[100%] w-full"><Loader /></div>)}
            {
                ProfileData && (
                    <div className="h-[100%] p-4 text-zinc-700">
                        <h1 className="text-3xl font-semibold text-zinc-700 mb-8">Settings</h1>
                        <div className="flex gap-12">
                            <div className="">
                                <label htmlFor="">Username</label>
                                <p className="p-2 rounded bg-zinc-500 mt-2 font-semibold">{ProfileData.username}</p>
                            </div>
                            <div className="">
                                <label htmlFor="">Email</label>
                                <p className="p-2 rounded bg-zinc-500 mt-2 font-semibold">{ProfileData.email}</p>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-col">
                            <label htmlFor="">Adress</label>
                            <textarea onChange={change} name="adress" rows={5} placeholder="Adress" value={Value.adress} className="p-2 rounded bg-zinc-500 mt-2 font-semibold" />
                        </div>
                        <div className="justify-end flex mt-4">
                            <button className="bg-yellow-500 text-zinc-900 px-3 py-2 font-semibold rounded hover:bg-yellow-300" onClick={submitAdress}>Update</button>
                        </div>
                    </div>
                )
            }
        </>
    )
}
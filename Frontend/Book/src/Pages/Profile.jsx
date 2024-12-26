import { Outlet } from "react-router-dom";
import Sidebar from "../Components/Profile/Sidebar";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import Loader from "../Components/Loader/Loader";
import axios from "axios";
export default function Profile() {
  //   const isLoggedIn=useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`
  }


  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:8081/api/v1/get-user-info", { headers }
      );

      setProfile(response.data);
    }
    fetch();
  }
    , [])
  return (
    <div className="px-11  flex flex-row h-screen gap-4 py-8">
      {
        !Profile && (<div className="w-full h-[100%] flex justify-center items-center "><Loader /></div>)
      }
      {
        Profile && (<> <div className="w-1/6"><Sidebar data={Profile} /></div>
          <div className="w-5/6"><Outlet /></div></>)
      }
    </div>
  )
}
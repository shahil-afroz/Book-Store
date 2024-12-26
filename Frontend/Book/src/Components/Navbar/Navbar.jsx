import img from "../../../assets/Logo.png"

import { useSelector } from "react-redux"
import { links } from "./Navigation"
import { Link } from "react-router-dom"
export default function Navbar() {
   //redux
   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role=useSelector((state) => state.auth.role);
  

   return (
      <div className=" bg-[#a5bfb2] font-custom text-white px-8 py-3 flex justify-between items-center ">
         <Link to="/" className="flex items-center gap-2">
          <img src={img} alt=""  className="h-[8vh]"/>
            <h1 className="text-xl font-medium text-black">Boi-Poka</h1>
         </Link>
         <div className="nav-links-book flex gap-4 items-center ">
            <div className="flex gap-5">
               {links.map((item, i) => (
                  <div className="flex items-center" key={i}>

                     {item.title === "Profile" || item.title === "Admin Profile" ?
                        <Link to={item.link} className=" px-4 py-1 text-xl border border-blue-700 bg-zinc-800 rounded  hover:bg-white  hover:text-zinc-800 transition-all" key={i}>{item.title}{" "}</Link>
                        : <Link to={item.link} className=" text-xl text-black  hover:text-blue-400 duration-300 transition-all" key={i}>{item.title}{" "}</Link>
                     }
                  </div>


               ))}
            </div>
            {
               isLoggedIn === false && (
                  <div className="flex gap-4">
                     <Link to="/LogIn" className="px-4 py-1 border border-blue-700 bg-zinc-800 rounded  hover:bg-white  hover:text-zinc-800 transition-all">LogIn</Link>
                     <Link to="/SignUp" className="px-4 py-1 bg-blue-500 text-zinc-800 rounded  hover:bg-white hover:text-zinc-800  transition-all">SignUp</Link>
                  </div>
               )
            }

         </div>
      </div>
   )
}
import img from "../../../assets/Poet.webp"
import { Link } from "react-router-dom"
export default function Style(){
    return(
        <div className="w-full border-double border-4 border-[#75b2d6] rounded relative">

        <div
            className="w-40 h-40 bg-[#ecbcd6] absolute mt-[10vh] ml-[12vh]"
            style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
        ></div>
          <div
            className="w-20 h-20 bg-[#ecbcd6] absolute mt-[24vh] ml-[29vh]"
            style={{
                clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)',
            }}
        ></div>
    
        <div className=" relative justify-center flex  items-start text-3xl ">
            <div className="w-[60%]" >
                <p className="mt-5 text-black  text-3xl">
                    "A good book is the precious lifeblood of a master spirit, embalmed and treasured up on purpose to a life beyond life."
                </p>
                <p className="ml-[50vh] font-thin text-2xl mt-3">-William Shakespeare</p>
                <div className=" group relative inline-block focus:outline-none focus:ring mt-11 ml-[50vh]">
                        <Link to="/All-books" className=" absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0  "></Link>
                        <Link to="/All-books" className="relative inline-block border-2 border-current px-8 py-3 bg-[#fedd8e] text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">Poetry Books</Link>
                    </div>
            </div>
            <div>
                <img src={img} alt="" className="h-[45vh] w-[45vh] " />
            </div>
        </div>
    </div>
    )
}
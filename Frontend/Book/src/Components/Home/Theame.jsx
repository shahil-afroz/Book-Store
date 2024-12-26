import { Link } from "react-router-dom"
import img from "../../../assets/Home_back.webp"

import { GiRoundStar } from "react-icons/gi";
export default function Theame() {
    return (
        <div className="h-[75vh] font-custom flex gap-4">

            <div className="w-[30%] h-[50vh] relative mt-[13vh]">
                <div className="rounded-full absolute  bg-[#e5d3a9] h-[30vh] w-[30vh] "></div>
                <div className=" flex flex-col relative mt-6 justify-center gap-9 items-center">
                    <div className=" group relative inline-block focus:outline-none focus:ring">
                        <Link to="/All-books" className=" absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0  "></Link>
                        <Link to="/All-books" className="relative inline-block border-2 border-current px-8 py-3 bg-[#feddd4] text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">Discover Books</Link>
                    </div>
                    <div className=" group relative inline-block focus:outline-none focus:ring">
                        <Link to="/All-books" className=" absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0  "></Link>
                        <Link to="/All-books" className="relative inline-block border-2 border-current px-8 py-3 bg-[#c8ebe7] text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">Discover Books</Link>
                    </div>
                    <div className=" group relative inline-block focus:outline-none focus:ring">
                        <Link to="/All-books" className=" absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0  "></Link>
                        <Link to="/All-books" className="relative inline-block border-2 border-current px-8 py-3 bg-[#f5dfeb] text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">Discover Books</Link>
                    </div>
                </div>

            </div>
            <div className="w-[30%] h-[100%] flex items-center justify-center ">
                <img src={img} alt="Play" className=" mr-7 h-[50vh] " />
            </div>
            <div className="w-[60%] flex flex-col items-start justify-center">
                <div className="flex">
                    <GiRoundStar className="text-3xl mt-10" />

                    <div className="rounded-full bg-[#c1dccd] h-[12vh] w-[12vh]"></div>
                    <div className="rounded-full bg-[#c1dccd] h-8 w-8 "></div>
                </div>

                <h1 className="font-medium text-6xl text-zinc-900 text-left">
                    Dig Deep Into The Knowledge Ocean
                </h1>
                <p className="mt-5 text-black font-medium">
                    Books encompass a vast universe of knowledge and imagination, offering insights into every facet of life. Whether fiction or non-fiction, they invite readers to explore new ideas, cultures, and emotions, enriching our minds and hearts along the way.
                </p>
                <div className="flex gap-[40vh]">

                    <div className=" group relative inline-block focus:outline-none focus:ring mt-3 ">
                        <Link to="/All-books" className=" absolute inset-0 translate-x-1.5 translate-y-1.5 bg-black transition-transform group-hover:translate-x-0 group-hover:translate-y-0 h-[7vh] "></Link>
                        <Link to="/All-books" className="relative inline-block border-2 border-current px-8 py-3  bg-[#c897b2] text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">Discover Books</Link>
                    </div>

                    <div className="flex ">
                        <GiRoundStar className="text-3xl" />

                        <div className="opacity-1">
                            <div className="rounded-full bg-[#c1dccd] h-[12vh] w-[12vh] "></div>
                            <div className="rounded-full bg-[#c1dccd] h-8 w-8 "></div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}
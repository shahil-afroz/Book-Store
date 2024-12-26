import { RxCross1 } from "react-icons/rx";
export default function SeeUsersData({userDivData,setUserDiv,userDiv}){
    return(
        <>
        <div className={`${userDiv} top-0 h-screen w-full bg-zinc-800 opacity-80`}></div>
        <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
            <div className="bg-white rounded p-4 w-[50%] text-zinc-800">
                <div className="flex items-center justify-center gap-[70vh]">
                       <h1 className="text-xl font-medium">Use Information</h1>
                       <button  className="h-3" onClick={()=>
                        setUserDiv("hidden")
                       }><RxCross1 /></button>
                </div>
                <div className="mt-2 ">
                    <label htmlFor="">Username:{" "}
                        <span className="font-normal">{userDivData.username}</span>
                    </label>
                </div>
                <div className="mt-4">
                <label htmlFor="">Email:{" "}
                        <span className="font-normal">{userDivData.email}</span>
                    </label>
                </div>
                <div className="mt-4">
                <label htmlFor="">Address:{" "}
                        <span className="font-normal">{userDivData.adress}</span>
                    </label>
                </div>
            </div>
        </div>
        </>
    )

}
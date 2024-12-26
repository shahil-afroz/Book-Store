import Theame from "../Components/Home/Theame"
import Style from "../Components/Home/Style"
import RecentlyAdded from "../Components/Home/RecentlyAdded"
export default function Home() {
    return (
        <div className="px-10 py-8 flex flex-col font-custom bg-[#e3eee8]">
            <Theame />
           <Style/>
            <RecentlyAdded />
        </div>
    )
}
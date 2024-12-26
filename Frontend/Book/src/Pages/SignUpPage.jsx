import axios from "axios";
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
export default function SignUpPage() {
    const [Values, setValus] = useState({
        username: "",
        email: "",
        password: "",
        adress: ""
    });
    //use for navigate one page to another
    const navigate = useNavigate();

    //use for change the values from value
    const change = (e) => {
        const { name, value } = e.target;
        setValus({ ...Values, [name]: value });
    }
    //so in the time of submission ithe frontend data connected to the backend 
    const submit = async () => {
        try {
            if (Values.username === "" || Values.email === "" || Values.password === "" || Values.adress === "") {
                alert("All Fields Are Required")
            } else {
                const response = await axios.post("http://localhost:8081/api/v1/sign-up", Values);
                console.log(response.data);
                navigate("/LogIn");

            }

        } catch (error) {
            console.log(error.response.data);
        }
    }
    return (
        <>
            <div className="h-auto bg-zinc-900 px-12 py-8 flex items-center justify-center">
                <div className="bg-zinc-800 rounded-lg px-8 py-5 w-2/6">
                    <p className="text-zinc-200 text-xl">SignUp</p>
                    <div className="mt-4">

                        <label htmlFor="" className="text-zinc-400">UserName</label>
                        <input type="text"
                            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                            placeholder="UserName"
                            name="username"
                            value={Values.username}
                            onChange={change}
                            required
                        />

                        <div className="mt-4">
                            <label htmlFor="" className="text-zinc-400">Email</label>
                            <input type="text"
                                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                                placeholder="Typer Your Email Adress"
                                name="email"
                                value={Values.email}
                                onChange={change}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="text-zinc-400">Password</label>
                            <input type="password"
                                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                                placeholder="Typer Your Password"
                                name="password"
                                value={Values.password}
                                onChange={change}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="" className="text-zinc-400">Address</label>
                            <textarea
                                className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
                                placeholder="Typer Your Address"
                                rows={5}
                                name="adress"
                                value={Values.adress}
                                onChange={change}
                                required
                            />
                        </div>
                        <div className="mt-4">

                            <button className="w-full bg-blue-600 py-2 text-white font-semibold rounded hover:bg-white hover:text-black" onClick={submit}>

                                SignUp
                            </button>
                        </div>

                        <p className="flex mt-4 items-center justify-center font-semibold text-zinc-200">Or</p>
                        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
                            Already Have Account? &nbsp;
                            <Link to="/Login" className="hover:text-blue-500">
                                <u>
                                    LogIn</u></Link>
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}
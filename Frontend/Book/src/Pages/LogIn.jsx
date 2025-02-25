import axios from "axios";
import { useState } from "react"
import {authActions} from "../Store/auth";
import {useDispatch} from "react-redux"
import { Link, useNavigate } from "react-router-dom"
export default function LogIn() {

    const [Values, setValus] = useState({
        username: "",
        password: "",
    });
const navigate=useNavigate();
const dispatch=useDispatch();

    const change = (e) => {
        const { name, value } = e.target;
        setValus({ ...Values, [name]: value });
    }

    const submit = async () => {
        try {
            if (Values.username === "" || Values.password === "") {
              
                alert("All Fields Are Required")
            } else {
                const response = await fetch("http://localhost:8081/api/v1/sign-in", {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                   
                    body: JSON.stringify(Values),
                  });
                  const result = await response.json();
              
                   
                dispatch(authActions.login(true));
                dispatch(authActions.changeRole(result.role));
               
                localStorage.setItem("id", result.id);
                localStorage.setItem("token", result.token);
                localStorage.setItem("role", result.role);

              
                 navigate("/Profile");

            }

        } catch (error) {
            if (error.response) {
                console.log(error.response.data);
            } else {
                console.log("Error:", error.message);
            }

        }
    }
    return (
        <>
            <div className="h-screen bg-zinc-900 px-12 py-8 flex items-center justify-center">
                <div className="bg-zinc-800 rounded-lg px-8 py-5 w-2/6">
                    <p className="text-zinc-200 text-xl">LogIn</p>
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

                            <button className="w-full bg-blue-600 py-2 text-white font-semibold rounded hover:bg-white hover:text-black" onClick={submit}>

                                LogIn
                            </button>
                        </div>

                        <p className="flex mt-4 items-center justify-center font-semibold text-zinc-200">Or</p>
                        <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
                            Don't  Have Account? &nbsp;
                            <Link to="/SignUp" className="hover:text-blue-500">
                                <u>
                                    SignUp</u></Link>
                        </p>

                    </div>
                </div>
            </div>
        </>
    )
}
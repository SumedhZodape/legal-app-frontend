import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    // const [selectedRole, setSelectedRole] = useState("Admin");
    // const role = ["Admin", "Lawyer", "Client"]
    const navigate = useNavigate();
    const [isLawyer, setIsLawyer] = useState(false)



    // onsubmit function 
    const onSubmit = async (data) => {
        console.log(data)

        try {
            let response = await fetch("http://localhost:8000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            let res = await response.json();
            console.log(res)
            if (res.success === true) {
                toast.success(res.message);
                localStorage.setItem("user", JSON.stringify(res));
                navigate("/dashboard")
            } else {

                if(res.message === "Please Complete your profile!"){
                    setIsLawyer(true)
                }else{
                    setIsLawyer(false)
                }

                toast.error(res.message)
            }
        } catch (error) {
            console.log(error)
            toast.error("Server Error!")
        }


    }



    return (
        <>
            <div className="w-full h-screen bg-gray-100 flex">
                <div className="w-1/2 h-screen flex justify-center items-center">
                    <div className="w-1/2 h-screen flex flex-col justify-center items-center">
                        <div className="flex gap-2 font-serif text-xl">
                            <i className="fa-solid fa-scale-balanced text-blue-500 text-xl pt-1"></i>
                            <h1 className="text-gray-900 font-bold text-center">LegalDesk</h1>
                        </div>

                        <h1 className="text-2xl font-serif font-bold pt-2 text-gray-900">Welcome Back</h1>
                        <p className="text-sm text-gray-400">Sign in to your account</p>

                        {/* <div className="w-full mt-3 mb-3 rounded-2xl bg-gray-200">

                            {
                                role.map((ele, index) => {
                                    return (
                                        <button key={index} className={selectedRole === ele ? `w-1/3 rounded-2xl pt-1 pb-1 text-gray-300 text-sm bg-gray-900
                                     cursor-pointer transition-all`: `w-1/3 rounded-2xl pt-1 pb-1 text-gray-400 text-sm hover:bg-gray-900
                                         hover:text-gray-300 focus:text-gray-200 focus:bg-gray-900 cursor-pointer 
                                         transition-all"`}
                                            onClick={() => { setSelectedRole(ele) }}
                                        >{ele}</button>
                                    )
                                })
                            }
                        </div> */}

                        <form onSubmit={handleSubmit(onSubmit)}>
                            <label htmlFor="email" className="text-l">Email</label>
                            <input type="email" id="email" placeholder=" ✉  you@example.com" className="w-full p-1 rounded-sm border-2 border-gray-200 outline-gray-200"
                                {...register('email', { required: true })} />
                            {errors.email && <sapn className="text-sm text-red-600 w-full">Email is required<br /></sapn>}

                            <label htmlFor="password" className="text-l">Password</label>
                            <input type="password" id="password" placeholder="🔒 ****" className="w-full p-1 rounded-sm border-gray-200 border-2 outline-gray-200"
                                {...register('password', { required: true })} />
                            {errors.password && <span className="text-sm text-red-600 w-full">Password is required</span>}

                            <button className="w-full bg-blue-600 rounded-md mt-2 p-1 text-sm text-gray-300 hover:bg-sky-700 hover:text-white cursor-pointer"
                                type="submit">Sign In</button>
                        </form>

                        <p className="text-sm text-gray-400 mt-5">Don't have an account? <span className="text-blue-600 hover:text-blue-700 hover:font-bold 
                        cursor-pointer"><Link to="/register">Register</Link></span> </p>

                        {
                            isLawyer ? (
                                <p className="text-sm text-gray-400 mt-5">Please Complete Your Profile <span className="text-blue-600 hover:text-blue-700 hover:font-bold 
                                cursor-pointer"><Link to="/profile">Profile</Link></span> </p>
                            ): null
                        }



                    </div>
                </div>

                <div className="w-1/2 h-screen bg-gray-900 flex justify-center items-center">
                    <div className="w-1/2 h-screen flex justify-center items-center flex-col">
                        <i className="fa-solid fa-scale-balanced text-blue-500 text-2xl "></i>
                        <h1 className="p-2 text-2xl text-gray-300 font-serif">
                            Justice, Simplifired
                        </h1>
                        <p className="text-wrap text-sm text-gray-400 text-center">
                            AI-powered legal case management, Contact with top laywers,
                            analyze your case, and get justice faster.
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Login;
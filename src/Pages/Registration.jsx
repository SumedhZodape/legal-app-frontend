import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function Registration() {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [selectedRole, setSelectedRole] = useState("Client");
    const role = ["Admin", "Lawyer", "Client"]
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();


    // registration function 
    async function submit(data) {
        console.log(data)

        const payload = {
            ...data,
            password,
            role: selectedRole?.toUpperCase()
        }

        if (password !== confirmPassword) {
            return toast.error("Please Enter correct password!")
        }

        try {
            const response = await fetch("http://localhost:8000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            })

            const res = await response.json();

            console.log(res)

            if (res.success === true) {
                toast.success(res.message)

                if(selectedRole.toLowerCase() === "lawyer"){
                    navigate("/profile")
                }else{
                    navigate("/")
                }
            } else {
                toast.error(res.message)
            }

        } catch (error) {
            toast.error("Server Error!")
            console.log(error)
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

                        <h1 className="text-2xl font-serif font-bold pt-2 text-gray-900">Welcome</h1>
                        <p className="text-sm text-gray-400">All Field Requierd in Create Account</p>

                        <div className="w-full mt-3 mb-3 rounded-2xl bg-gray-200">

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
                        </div>

                        <form onSubmit={handleSubmit(submit)}>
                            <label htmlFor="name" className="text-l">Full Name</label>
                            <input type="name" id="name" placeholder="Rahul Singh" className="w-full p-1 rounded-sm border-2 border-gray-200 outline-gray-900"
                                {...register('name', { required: true })} />

                            {errors.name && <span className="text-red-600">Name is Required<br /></span>}

                            <label htmlFor="Phone" className="text-l">Mobile Number</label>
                            <input type="Phone" id="Phone" placeholder="9988123456" className="w-full p-1 rounded-sm border-2 border-gray-200 outline-gray-900"
                                {...register('Phone', { required: true })} />

                            {errors.Phone && <span className="text-red-600">Mobile Number is Required<br /></span>}

                            <label htmlFor="email" className="text-l">Email</label>
                            <input type="email" id="email" placeholder=" ✉  you@example.com" className="w-full p-1 rounded-sm border-2 border-gray-200 outline-gray-900"
                                {...register('email', { required: true })} />

                            {errors.email && <span className="text-red-600">Email is Required<br /></span>}


                            <label htmlFor="password" className="text-l">Password</label>
                            <input type="password" id="password" placeholder="🔒 ****" className="w-full p-1 rounded-sm border-gray-200 border-2 outline-gray-900"
                                onKeyUp={(e) => { setPassword(e.target.value) }} />

                            <label htmlFor="password" className="text-l">Confirm Password</label>
                            <input type="password" id="password" placeholder="🔒 ****" className={
                                password.length > 0 ? password === confirmPassword ? "w-full p-1 rounded-sm border-green-800 border-2" : "w-full p-1 rounded-sm border-red-800 border-2 "
                                    : "w-full p-1 rounded-sm border-gray-200 border-2 outline-0"
                            }
                                onKeyUp={(e) => { setConfirmPassword(e.target.value) }} />


                            <button className="w-full bg-blue-600 rounded-md mt-2 p-1 text-sm text-gray-300 hover:bg-sky-700 hover:text-white cursor-pointer" type="submit">Sign Up</button>
                        </form>

                        <p className="text-sm text-gray-400 mt-5">Have account? <span className="text-blue-600 hover:text-blue-700 hover:font-bold 
                        cursor-pointer"><Link to="/">Log In</Link></span> </p>



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

export default Registration;
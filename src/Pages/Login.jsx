import { useState } from "react";

function Login() {

    const [selectedRole, setSelectedRole] = useState("Admin");


    const role = ["Admin", "Lawyer", "Client"]

    return (
        <>
            <div className="w-full bg-amber-300 h-screen flex">
                <div className="h-screen w-1/2 bg-gray-100 flex justify-center items-center">
                    <div className="w-[55%] h-screen flex
                    flex-col justify-center items-center">

                        <div className="flex items-center gap-2">
                            <i className="fa-solid fa-scale-balanced text-blue-600
                        text-2xl"></i>
                            <h1 className="text-gray-800 
                    text-xl mt-3 mb-3 font-semibold">LegalDesk</h1>

                        </div>

                        <h1 className="text-gray-800 
                    text-2xl mb-3 font-bold">Welcome Back</h1>
                        <p className="text-center text-gray-600 text-[14px]">Sign in to your account</p>

                        <div className="flex w-full bg-muted rounded-full bg-gray-200 p-1 gap-3 mt-4">

                            {
                                role?.map((ele, index) => {
                                    return (
                                        <button
                                            onClick={(e) => {
                                                setSelectedRole(ele)
                                            }}
                                            className={
                                                selectedRole === ele ?
                                                    "bg-black text-gray-200 rounded-full font-medium text-sm flex-1 px-3 py-2 transition-all" :
                                                    "bg-gray-200 text-black rounded-full font-medium text-sm flex-1 px-3 py-2 transition-all"
                                            }>{ele}</button>
                                    )
                                })
                            }

                        </div>


                        <form className="max-w-sm mx-auto">
                            <label for="input-group-1" className="block mb-2.5 text-sm font-medium text-heading">Email</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                                </div>
                                <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border 
                                border-default-medium text-heading text-sm rounded-base 
                                focus:ring-brand focus:border-brand shadow-xs 
                                placeholder:text-body rounded-xl" placeholder="name@flowbite.com"/>
                            </div>

                            <label for="input-group-1" className="block mb-2.5 text-sm font-medium text-heading">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-body" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m3.5 5.5 7.893 6.036a1 1 0 0 0 1.214 0L20.5 5.5M4 19h16a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1Z" /></svg>
                                </div>
                                <input type="text" id="input-group-1" className="block w-full ps-9 pe-3 py-2.5 bg-neutral-secondary-medium border 
                                border-default-medium text-heading text-sm rounded-base 
                                focus:ring-brand focus:border-brand shadow-xs 
                                placeholder:text-body rounded-xl" placeholder="*******"/>
                            </div>
                        </form>


                    </div>

                </div>


                <div className="h-screen w-1/2 bg-gray-900 flex
                    flex-col justify-center items-center">
                    <i className="fa-solid fa-scale-balanced text-blue-600
                        text-3xl"></i>
                    <h1 className="text-white 
                    text-2xl mt-4 mb-4">Justice, Simplified.</h1>
                    <p className="w-1/2 text-center text-gray-300 text-[14px]">AI-Powered legel case management. Connect with top Lawyers, analyze your case, and get justice faster.</p>
                </div>
            </div>
        </>
    )
}


export default Login;
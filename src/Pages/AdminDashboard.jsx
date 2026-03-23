import { useState } from "react";
import AdminPanel from "../Component/AdminPanel";
import AdminTable from '../Component/AdminTable'

function AdminDashboard() {

    const [panel, setPanel] = useState(true);
    const [selectedPanel, setSelectedPanel] = useState("Dashboard")

    const panelNames = [
        {
            name: "Dashboard",
            classData: "fa-regular fa-house text-sm"
        },
        {
            name: "Manage Lawyers",
            classData: "fa-solid fa-user-group"
        }
    ]


    return (
        <div className='w-full h-screen bg-gray-300 md:flex md:flex-row'>
            <div className={panel ? "w-full h-1/12 bg-gray-900 flex flex-row justify-between md:w-1/6 md:h-screen" :
                "w-full h-1/12 bg-gray-900 flex flex-row justify-between md:w-10 md:h-screen overflow-hidden"
            }>
                <div className="flex w-full flex-col justify-between    ">
                    <div className="flex flex-col w-full">
                        <div className="flex">
                            <div className="flex gap-2 font-serif text-xl p-3 ">
                                <i className="fa-solid fa-scale-balanced text-blue-500 text-xl pt-1"></i>
                                <h1 className="text-gray-300 font-bold text-center">LegalDesk</h1>
                            </div>

                            <div>
                                <i className="fa-solid fa-bars text-gray-200 p-5 mr-2 cursor-pointer" onClick={() => {
                                    setPanel(!panel)
                                }}></i>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-5 text-white">
                            {
                                panelNames?.map((ele) => {
                                    return (
                                        <div className={
                                            selectedPanel === ele.name ? `flex items-center gap-2 p-1.5 bg-gray-800 cursor-pointer
                        rounded-[5px] ps-3`: `flex items-center gap-2 p-1.5 cursor-pointer
                        rounded-[5px] ps-3`
                                        }
                                            onClick={() => {
                                                setSelectedPanel(ele.name)
                                            }}

                                        >
                                            <i className={ele.classData} />
                                            <h1>{ele.name}</h1>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className="p-5 border-t border-gray-800 text-white">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="h-[30px] w-[30px] bg-gray-800 flex justify-center items-center 
                            rounded-[50%]">
                                A
                            </div>
                            <div>
                                <h1>Admin</h1>
                                <p className="text-sm text-gray-500">Admin</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 cursor-pointer">
                            <i className="fa-solid fa-arrow-right-from-bracket text-[15px]" />
                            <h3>Sign Out</h3>
                        </div>
                    </div>
                </div>

            </div>
            <div className='md:w-full md:h-screen'>

                <div className='bg-gray-200 text-center p-3 text-gray-900 border-b-2 border-gray-400 md:flex'>
                    <h1 className='text-center'>Admin Panel</h1>
                </div>


                {
                    selectedPanel === "Dashboard" ? <AdminPanel /> : <AdminTable />
                }


            </div>

        </div>
    )
}

export default AdminDashboard;
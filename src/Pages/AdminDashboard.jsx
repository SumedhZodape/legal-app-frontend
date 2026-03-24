import { useEffect, useRef, useState } from "react";
import AdminPanel from "../Component/AdminPanel";
import AdminTable from '../Component/AdminTable';
import { toast } from "react-toastify";

function AdminDashboard() {
    const token = JSON.parse(localStorage.getItem("user")).token || ""
    const [panel, setPanel] = useState(true);
    const [selectedPanel, setSelectedPanel] = useState("Dashboard")
    const [lawyerData, setLawyerData] = useState([]);
    const panelNames = [
        {
            name: "Dashboard",
            classData: "fa-regular fa-house text-sm"
        },
        {
            name: "Manage Lawyers",
            classData: "fa-solid fa-user-group text-sm"
        }
    ]
    const KPI_Info = useRef({ total: 0, approved: 0, pending: 0, blocked: 0, rejected: 0, returned: 0 })


    // fetch lawyer function
    const fetchLawyers = async () => {
        try {

            const response = await fetch("http://localhost:8000/admin/getlawyers", {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const res = await response.json();

            if (res.success === false) {
                toast.error(res.message)
            } else {

                const pending = res.result.filter((ele) => ele.status === "PENDING")?.length;
                const approved = res.result.filter((ele) => ele.status === "APPROVED")?.length;
                const rejected = res.result.filter((ele) => ele.status === "REJECTED")?.length;
                const returned = res.result.filter((ele) => ele.status === "RETURNED")?.length;
                const blocked = res.result.filter((ele) => ele.status === "BLOCKED")?.length;


                KPI_Info.current = { total: res?.result?.length, approved: approved, pending: pending, blocked: blocked, rejected: rejected, returned: returned }

                setLawyerData(res.result);
            }

        } catch (error) {
            toast.error("Server Error!");
        }
    }


    useEffect(() => {
        if (token) {
            fetchLawyers()
        }
    }, [token])




    return (
        <div className='w-full h-screen bg-gray-100 md:flex md:flex-row'>
            <div className={panel ? "w-full h-1/12 bg-gray-900 flex flex-row justify-between md:w-1/6 md:h-screen" :
                "w-full h-1/12 bg-gray-900 flex flex-row justify-between md:w-10 md:h-screen overflow-hidden"
            }>
                <div className="flex w-full flex-col justify-between ">
                    <div className="flex flex-col w-full">
                        <div className="flex border-b border-gray-700">
                            <div className="flex gap-2 font-serif text-sm p-3 ">
                                <i className="fa-solid fa-scale-balanced text-blue-500  pt-1"></i>
                                <h1 className="text-gray-300 font-bold text-center">LegalDesk</h1>
                            </div>

                            <div>
                                <i className="fa-solid fa-bars text-gray-200 p-5 mr-2 cursor-pointer text-sm text-center " onClick={() => {
                                    setPanel(!panel)
                                }}></i>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3 p-5 text-gray-400">
                            {
                                panelNames?.map((ele, index) => {
                                    return (
                                        <div key={index} className={
                                            selectedPanel === ele.name ? `flex items-center text-gray-200  gap-2 p-1.5 bg-gray-800 cursor-pointer
                                            rounded-[5px] text-sm ps-3`: `flex items-center text-sm gap-2 p-1.5 cursor-pointer
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
                            <div className="h-7.5 w-7.5 bg-gray-800 flex justify-center text-sm items-center 
                            rounded-[50%]">
                                A
                            </div>
                            <div>
                                <h1 className="text-sm">Admin</h1>
                                <p className="text-sm text-gray-500">Admin</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-gray-500 cursor-pointer text-sm">
                            <i className="fa-solid fa-arrow-right-from-bracket text-sm" />
                            <h3>Sign Out</h3>
                        </div>
                    </div>
                </div>

            </div>
            <div className='md:w-full md:h-screen'>

                <div className='bg-gray-50 text-center p-3 text-gray-900 border-b border-gray-200 md:flex'>
                    <h1 className='text-center text-sm font-bold font-serif'>Admin Panel</h1>
                </div>


                {
                    selectedPanel === "Dashboard" ? <AdminPanel KPI_Info={KPI_Info.current} /> : <AdminTable lawyerData={lawyerData} />
                }


            </div>

        </div>
    )
}

export default AdminDashboard;
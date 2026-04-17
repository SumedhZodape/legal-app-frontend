import React, { useEffect, useState } from 'react'
import LawyerPanel from '../Component/LawyerPanel';
import { useNavigate } from 'react-router-dom';
import LawyerTable from '../Component/LawyerTable';


function LawyerDashboard() {
    const user = JSON.parse(localStorage.getItem("user")) || {}
    const [selectedPanel, setSelectedPanel] = useState("Dashboard");
    const navigate = useNavigate();
    const [caseData, setCaseData] = useState([])

    const panelNames = [
        {
            name: "Dashboard",
            classData: "fa-regular fa-house text-sm"
        },
        {
            name: "My Case",
            classData: "fa-solid fa-user-group text-sm"
        }
    ]


    // logout
    const logout = () => {

        localStorage.removeItem("user");
        navigate("/")

    }


    // fetch  all the cases

    const fetchCases = async () => {
        try {
            const response = await fetch("http://localhost:8000/client/mycases", {
                headers:{
                    "Authorization":`Bearer ${user.token}`
                }
            })

            const res = await response.json();

            if(res.success){
                setCaseData(res.result)
                console.log(res.result)
            }else{
                console.log("Error", res.message)
            }

        } catch (error) {
            console.log("Error:", error)
        }
    }

    useEffect(()=>{
        fetchCases()
    }, [])

    return (
        <>
            <div className='w-full h-screen bg-gray-100 md:flex md:flex-row'>
                <div className="w-full h-1/12 bg-gray-900 flex flex-row overflow-hidden justify-between md:w-1/6 md:h-screen"
                >
                    <div className="flex w-full flex-col justify-between ">
                        <div className="flex flex-col w-full">
                            <div className=" border-b border-gray-700">
                                <div className="flex gap-2 font-serif text-sm p-3 ">
                                    <i className="fa-solid fa-scale-balanced text-blue-500  pt-1"></i>
                                    <h1 className="text-gray-300 font-bold text-center">LegalDesk</h1>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 p-5 text-gray-400">
                                {
                                    panelNames?.map((ele, index) => {
                                        return (
                                            <div className={
                                                selectedPanel === ele.name ? `flex items-center text-gray-200  gap-2 p-1.5 bg-gray-800 cursor-pointer
                                            rounded-[5px] text-sm ps-3`: `flex items-center text-sm gap-2 p-1.5 cursor-pointer
                                            rounded-[5px] ps-3`
                                            }
                                                onClick={() => {
                                                    setSelectedPanel(ele.name)
                                                }}
                                                key={index}
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
                                    {user?.result?.name[0]}
                                </div>
                                <div>
                                    <h1 className="text-sm">{user?.result?.name}</h1>
                                    <p className="text-sm text-gray-500">LAWYER</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-gray-500 cursor-pointer text-sm" onClick={logout}>
                                <i className="fa-solid fa-arrow-right-from-bracket text-sm" />
                                <h3>Sign Out</h3>
                            </div>
                        </div>
                    </div>

                </div>
                <div className='md:w-full md:h-screen'>

                    <div className='bg-gray-50 text-center p-3 text-gray-900 border-b border-gray-200 md:flex'>
                        <h1 className='text-center text-sm font-bold font-serif'>Lawyer Portal</h1>
                    </div>


                    {

                        selectedPanel === "Dashboard" ? <LawyerPanel caseData={caseData} /> : <LawyerTable caseData={caseData} /> 

                    }


                </div>

            </div>
        </>
    )
}

export default LawyerDashboard;
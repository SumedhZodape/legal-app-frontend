import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const getStatusColor = (status) => {
    if (status === "APPROVED") return "bg-green-100 text-green-600";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-600";
    if (status === "BLOCKED") return "bg-red-100 text-red-600";
};

const AdminTable = ({ lawyerData }) => {
    const token = JSON.parse(localStorage.getItem("user")).token || ""
    const [userData, setUserData] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLawyer, setSelectedLawyer] = useState({});
    const [remark, setRemark] = useState("")

    useEffect(() => {
        if (lawyerData.length > 0) {
            setUserData(lawyerData)
        }
    }, [lawyerData])





    // update status api 

    const updateStatus = async(status) =>{
        try {
            console.log("Status: ", status);
            console.log("ProfileID: ", selectedLawyer._id);
            console.log("Remark: ", remark)

            if(!token){
                return toast.error("Unathorized!")
            }

            const payload = {
                status, 
                remark
            }

            const response = await fetch(`http://localhost:8000/admin/updateLawyerStatus/${selectedLawyer._id}`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(payload)
            })

            const res = await response.json();

            if(res.success){
                toast.success(res.message);
                setIsModalOpen(false);
                setSelectedLawyer({});
                setRemark("");
            }else{
                toast.error(res.message)
            }

        } catch (error) {
            toast.error("Server Error!")
        }
    }



    return (
        <>
            <div className="flex bg-gray-100">

                <div className="flex-1 md:p-2">

                    <div className="flex justify-between items-center mb-2">
                        <h1 className="text-lg font-serif font-bold text-gray-900 p-2">Manage Lawyer's</h1>

                        <select className="border-0 w-20 rounded px-3 py-2">
                            <option>All</option>
                            <option>Approved</option>
                            <option>Pending</option>
                            <option>Blocked</option>
                        </select>
                    </div>

                    <div className="bg-gray-50 pl-4 shadow rounded-lg overflow-x-auto">

                        <table className=" min-w-full text-sm border-0">
                            <thead className="bg-gray-50 text-gray-600">
                                <tr>
                                    <th className="p-2 text-left">Name</th>
                                    <th className="p-2 text-left">Specialization</th>
                                    <th className="p-2 text-left">Experience</th>
                                    <th className="p-2 text-left">Win Ratio</th>
                                    <th className="p-2 text-left">Fee Range</th>
                                    <th className="p-2 text-left">Status</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userData.map((lawyer, index) => (
                                    <tr key={index} className="border-0">

                                        <td className="p-2">
                                            <p className="font-medium text-gray-900">{lawyer?.userId?.name}</p>
                                            <p className="text-gray-400 text-xs">{lawyer?.userId?.email}</p>
                                        </td>

                                        <td className="p-2 text-sm">{lawyer.lawyerType}</td>

                                        <td className="p-2 text-gray-900">{lawyer.experienceYears} Years</td>

                                        <td className="p-2 text-sm font-medium text-gray-900">{lawyer.wonCases} Cases</td>

                                        <td className="p-2 text-sm text-gray-900">₹ {lawyer.feeMin} - ₹ {lawyer.feeMax}</td>

                                        <td className="p-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    lawyer.status
                                                )}`}
                                            >
                                                {lawyer.status.toUpperCase()}
                                            </span>
                                        </td>

                                        <td className="p-2 space-x-2">
                                            <button className="px-3 py-1 text-xs border-2 border-yellow-100 text-yellow-600 rounded cursor-pointer"
                                                onClick={(e) => {
                                                    setSelectedLawyer(lawyer)
                                                    setIsModalOpen(true)
                                                }}>
                                                Action
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>


            {/* model */}
            {
                isModalOpen ? (
                    <div className='h-screen w-full fixed left-0 top-0
                    flex justify-center items-center cl-model'>
                        <div className='p-4 w-[50%] bg-amber-50 rounded-2xl relative'>

                            <i className="fa-solid fa-circle-xmark absolute top-2 right-2 text-red-500
                                    text-2xl cursor-pointer" onClick={(e) => {
                                    setIsModalOpen(false)
                                }} />
                            <h2 className='text-3xl font-semibold'>Lawyer Information</h2>

                            <div className='w-full flex flex-wrap gap-3 mt-4 mb-5'>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Name</b>: <span className='text-[18px]'>{selectedLawyer?.userId?.name}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Email</b>: <span className='text-[18px]'>{selectedLawyer?.userId?.email}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Phone</b>: <span className='text-[18px]'>{selectedLawyer?.userId?.Phone}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Barcouncil ID</b>: <span className='text-[18px]'>{selectedLawyer?.barCouncilId}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Degree</b>: <span className='text-[18px]'>{selectedLawyer?.degree}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Lawyer Type</b>: <span className='text-[18px]'>{selectedLawyer?.lawyerType}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Experience</b>: <span className='text-[18px]'>{selectedLawyer?.experienceYears} Years</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Total Cases</b>: <span className='text-[18px]'>{selectedLawyer?.totalCases} Cases</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Won Cases</b>: <span className='text-[18px]'>{selectedLawyer?.wonCases} Cases</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Lost Cases</b>: <span className='text-[18px]'>{selectedLawyer?.lostCases} Cases</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Minimum Fees</b>: <span className='text-[18px]'>₹ {selectedLawyer?.feeMin}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Maximum Fees</b>: <span className='text-[18px]'>₹ {selectedLawyer?.feeMax}</span></h3>
                                </div>
                                <div className='flex w-[40%] gap-4'>
                                    <h3 className='text-[18px]'><b>Remark: </b></h3>
                                    <textarea type="text" placeholder='Enter Remark'
                                        className='border w-full' onKeyUp={(e)=>{
                                            setRemark(e.target.value)
                                        }} />
                                </div>
                            </div>

                            <div className='flex gap-5'>
                                <button className='border border-green-400 bg-green-400
                                    p-2 rounded-[5px] text-white cursor-pointer' onClick={()=>{updateStatus("APPROVED")}}>Approved</button>
                                <button className='border border-red-400 bg-red-400
                                    p-2 rounded-[5px] text-white cursor-pointer' onClick={()=>{updateStatus("REJECTED")}}>Rejected</button>
                                <button className='border border-orange-400 bg-orange-400
                                    p-2 rounded-[5px] text-white cursor-pointer' onClick={()=>{updateStatus("RETURNED")}}>Returned</button>
                                <button className='border border-red-400 bg-red-600
                                    p-2 rounded-[5px] text-white cursor-pointer' onClick={()=>{updateStatus("BLOCKED")}}>Blocked</button>
                            </div>

                        </div>
                    </div>
                ) : null
            }
        </>
    );
};

export default AdminTable;
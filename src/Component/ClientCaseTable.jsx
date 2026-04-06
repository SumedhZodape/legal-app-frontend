import { useState } from "react";

const getStatusColor = (status) => {
    if (status === "APPROVED") return "bg-green-100 text-green-600";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-600";
    if (status === "BLOCKED") return "bg-red-100 text-red-600";
};


function ClientCaseTable() {

    const [userData, setUserData] = useState([10, 30, 40]);
    const [caseModal, setCaseModal] = useState(false)
    const caseSeverity = "HIGH";
    const testData = [10,30,40]

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
                                    <th className="p-2 text-left">Problem Statement</th>
                                    <th className="p-2 text-left">Location</th>
                                    <th className="p-2 text-left">Case Date</th>
                                    <th className="p-2 text-left">Case Severity</th>
                                    <th className="p-2 text-left">Fee Range</th>
                                    <th className="p-2 text-left">Type Of LawyerNeeded</th>
                                    <th className="p-2 text-left">Actions</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userData.map((lawyer, index) => (
                                    <tr key={index} className="border-0">

                                        <td className="p-2">
                                            <p className="font-medium text-gray-900">Sumedh</p>
                                            <p className="text-gray-400 text-xs">sumedh@gmail.com</p>
                                        </td>

                                        <td className="p-2 text-sm">Criminal</td>

                                        <td className="p-2 text-gray-900">10 Years</td>

                                        <td className="p-2 text-sm font-medium text-gray-900">10 Cases</td>

                                        <td className="p-2 text-sm text-gray-900">₹ 1200 - ₹ 5000</td>

                                        <td className="p-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    "PENDING"
                                                )}`}
                                            >
                                                ABCD
                                            </span>
                                        </td>

                                        <td className="p-2 space-x-2">
                                            <button className="px-3 py-1 text-xs cursor-pointer"
                                            >
                                                <i className="fa-solid fa-eye text-2xl text-blue-400"
                                                onClick={()=>{
                                                    setCaseModal(true)
                                                }}></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>

            {
                caseModal ? (
                    <>
                        <div className="h-screen w-full cl-model fixed
                        left-0 top-0 flex justify-center items-center">
                            <div className="p-4 w-[80%] relative">
                                <i className="fa-solid fa-circle-xmark absolute top-2 right-2 text-red-500
                                    text-2xl cursor-pointer" onClick={()=>{
                                        setCaseModal(false)
                                    }} />
                                <div className="p-3 bg-gray-100  rounded-[10px]">

                                    <h1 className="text-2xl font-serif font-semibold mb-4">My Cases</h1>

                                    <div className="bg-white rounded-lg shadow p-6 border">

                                        <p className="text-gray-700 mb-3">
                                            Test Data
                                        </p>

                                        <div className="flex gap-4 text-sm text-gray-500 mb-4">
                                            <span>📍 Test Data</span>
                                            <span>📅 Test Data</span>
                                            <span className="ml-auto bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                                                Test Data
                                            </span>
                                        </div>

                                        <div className="border rounded-lg p-4 bg-gray-50">

                                            <h2 className="font-semibold text-purple-600 mb-2">
                                                ⚙ AI Case Analysis
                                            </h2>

                                            <div className="grid md:grid-cols-3 gap-4 text-sm">

                                                <div>
                                                    <p className="text-gray-500">Predicted Type</p>
                                                    <p className="font-medium">Test Data</p>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500 mb-1">Severity</p>
                                                    <span className={caseSeverity === "HIGH" ? "bg-red-500 text-white px-2 py-1 rounded" :
                                                        caseSeverity === "MEDIUM" ? "px-2 py-1 rounded bg-amber-600 text-white" : "px-2 py-1 rounded text-white bg-yellow-300"
                                                    }>
                                                        Test Data
                                                    </span>
                                                </div>

                                                <div>
                                                    <p className="text-gray-500">Estimated Fee</p>
                                                    <p className="font-medium">₹Test Data - ₹Test Data</p>
                                                </div>

                                            </div>

                                            <div className="mt-4 text-sm">
                                                <p className="text-gray-500">IPC Sections</p>
                                                <div className="flex gap-2 mt-1 flex-wrap">
                                                    {
                                                        testData?.map((ele, index) => {
                                                            return (
                                                                <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                                                                    Test Data
                                                                </span>
                                                            )
                                                        })
                                                    }
                                                </div>
                                            </div>

                                            <div className="mt-4 text-sm">
                                                <p className="text-gray-500">Worst Case Outcome</p>
                                                <p>Test Data</p>
                                            </div>

                                            <div className="mt-2 text-sm">
                                                <p className="text-gray-500">Remark</p>
                                                <p>Test Data</p>
                                            </div>

                                        </div>

                                        <div className="mt-4 text-sm">
                                            <p className="text-gray-500">Attachments</p>
                                            <span className="bg-gray-200 px-2 py-1 rounded">
                                                termination_letter.pdf
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </>
                ) : null
            }
        </>
    )
}

export default ClientCaseTable;
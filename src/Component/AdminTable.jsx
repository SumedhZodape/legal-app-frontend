import { useEffect, useState } from 'react'

const getStatusColor = (status) => {
    if (status === "APPROVED") return "bg-green-100 text-green-600";
    if (status === "PENDING") return "bg-yellow-100 text-yellow-600";
    if (status === "BLOCKED") return "bg-red-100 text-red-600";
};

const AdminTable = ({ lawyerData }) => {

    const [userData, setUserData] = useState([])

    useEffect(() => {
        if (lawyerData.length > 0) {
            setUserData(lawyerData)
        }
    }, [lawyerData])


    console.log(userData)

    return (
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
                                        {lawyer.status === "pending" && (
                                            <button className="px-3 py-1 text-xs border-2 border-green-100 text-green-600 rounded">
                                                Approve
                                            </button>
                                        )}

                                        <button className="px-3 py-1 text-xs border-2 border-red-100 text-red-600 rounded">
                                            Block
                                        </button>

                                        <button className="px-3 py-1 text-xs border-2 border-yellow-100 text-yellow-600 rounded">
                                            Reject
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    );
};

export default AdminTable;
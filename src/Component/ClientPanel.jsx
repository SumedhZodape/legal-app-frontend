import React from 'react'

function ClientPanel({caseData}) {
    return (
        <>
            <div className='flex justify-between items-center'>
                <h1 className='text-lg font-serif font-bold text-gray-900 p-2'>Client DashBoard</h1>
                <button className='bg-blue-500 text-gray-300 text-sm ps-2  pe-2 pb-1 pt-1 rounded-sm'>Create Case</button>
            </div>
            <div className='flex gap-5 flex-col lg:flex-row lg:p-5'>
                <div className='w-11/12 shadow-lg bg-gray-50 m-auto rounded-sm'>

                    <div className='flex flex-row gap-5 justify-start items-center p-2 m-2 '>
                        <div className='bg-gray-300 rounded-lg'>
                            <i className="fa-solid fa-user-group text-3xl text-gray-400 m-2 "></i>
                        </div>
                        <div className=" flex flex-col">
                            <p className='text-xl font-bold text-gray-900'>{caseData?.length}</p>
                            <h5 className='text-gray-500 text-sm font-semibold mb-1'>Total Cases</h5>
                        </div>
                    </div>

                </div>
                <div className='w-11/12 shadow-lg bg-gray-50 m-auto rounded-sm'>

                    <div className='flex flex-row gap-5 justify-start items-center p-2 m-2 '>
                        <div className='bg-gray-300 rounded-lg'>
                            <i className="fa-regular fa-clock text-3xl text-yellow-400 m-2"></i>
                        </div>
                        <div className=" flex flex-col">
                            <p className='text-xl font-bold text-gray-900'>{caseData?.filter((ele)=>ele.caseStatus === "NEW")?.length}</p>
                            <h5 className='text-gray-500 text-sm font-semibold mb-1'>New</h5>
                        </div>
                    </div>

                </div>
                <div className='w-11/12 shadow-lg bg-gray-50 m-auto rounded-sm'>

                    <div className='flex flex-row gap-5 justify-start items-center p-2 m-2 '>
                        <div className='bg-gray-300 rounded-lg'>
                            <i className="fa-regular fa-circle-check text-3xl text-green-400 m-2"></i>
                        </div>
                        <div className=" flex flex-col">
                            <p className='text-xl font-bold  text-gray-900'>{caseData?.filter((ele)=>ele.caseStatus === "COMPLETED")?.length}</p>
                            <h5 className='text-gray-500 text-sm font-semibold mb-1'>Completed</h5>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default ClientPanel
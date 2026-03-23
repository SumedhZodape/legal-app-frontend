function AdminPanel() {
    return (
        <>
            <h1 className='text-2xl font-bold text-gray-900 p-2 pt-2 pb-2'>Admin DashBoard</h1>
            <div className='flex gap-5 flex-col lg:flex-row lg:p-5'>
                {/* All Lawyers */}
                <div className='w-11/12 shadow-lg bg-gray-200 m-auto rounded-sm'>

                    <div className='flex flex-row gap-5 justify-start items-center p-2 m-2 '>
                        <div className='bg-gray-300 rounded-lg'>
                            <i className="fa-solid fa-users text-3xl text-gray-400 m-2 "></i>
                        </div>
                        <div className=" flex flex-col">
                            <p className='text-xl font-mono font-bold'>5</p>
                            <h5 className='text-gray-500 text-sm font-semibold mb-1'>Total Lawyers</h5>
                        </div>
                    </div>

                </div>
                {/* Approved */}
                <div className='w-11/12 shadow-lg bg-gray-200 m-auto rounded-sm'>

                    <div className='flex flex-row gap-5 justify-start items-center p-2 m-2 '>
                        <div className='bg-gray-300 rounded-lg'>
                            <i className="fa-regular fa-circle-check text-3xl text-green-400 m-2"></i>
                        </div>
                        <div className=" flex flex-col">
                            <p className='text-xl font-mono font-bold'>2</p>
                            <h5 className='text-gray-500 text-sm font-semibold mb-1'>Approved</h5>
                        </div>
                    </div>

                </div>
                {/* Pending */}
                <div className='w-11/12 shadow-lg bg-gray-200 m-auto rounded-sm'>

                    <div className='flex flex-row gap-5 justify-start items-center p-2 m-2 '>
                        <div className='bg-gray-300 rounded-lg'>
                            <i className="fa-regular fa-clock text-3xl text-yellow-400 m-2"></i>
                        </div>
                        <div className=" flex flex-col">
                            <p className='text-xl font-mono font-bold'>2</p>
                            <h5 className='text-gray-500 text-sm font-semibold mb-1'>Pending</h5>
                        </div>
                    </div>

                </div>
                {/* Blocked */}
                <div className='w-11/12 shadow-lg bg-gray-200 m-auto rounded-sm'>

                    <div className='flex flex-row gap-5 justify-start items-center p-2 m-2 '>
                        <div className='bg-gray-300 rounded-lg'>
                            <i className="fa-solid fa-triangle-exclamation text-3xl text-red-400 m-2"></i>
                        </div>
                        <div className=" flex flex-col">
                            <p className='text-xl font-mono font-bold'>1</p>
                            <h5 className='text-gray-500 text-sm font-semibold mb-1'>Blocked</h5>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default AdminPanel;
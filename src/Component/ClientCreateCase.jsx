import { useForm } from 'react-hook-form'


function ClientCreateCase() {
    const {register, handleSubmit, formState:{errors}} = useForm();

    function submit(data){
        console.log(data)
    }
    return (
        <>
            <div className="p-6 bg-gray-100  flex justify-center">

                <div className="bg-white shadow rounded-lg p-6 w-full max-w-2xl">

                    <h1 className="text-2xl font-serif font-semibold mb-6 text-center">
                        Create New Case
                    </h1>

                    <form className="space-y-4" onSubmit={handleSubmit(submit)}>

                        <div>
                            <label className="block text-sm font-medium mb-1">
                                Problem Statement 
                                {errors.problemStatement && <span className='text-sm text-red-600'> * </span>}
                            </label>

                            <textarea
                                placeholder="Describe your legal issue in detail..."
                                className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                {...register('problemStatement', {required:true})}
                            />
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">

                            <div>
                                <label className="text-sm font-medium">Location
                                {errors.location && <span className='text-sm text-red-600'> * </span>}

                                </label>

                                <input
                                    type="text"
                                    placeholder="Mumbai, Maharashtra"
                                    className="w-full border rounded-lg p-2 mt-1"
                                    {...register('location', {required:true})}

                                />
                            </div>

                            <div>
                                <label className="text-sm font-medium">Case Date
                                {errors.caseDate && <span className='text-sm text-red-600'> * </span>}
                                </label>

                                <input
                                    type="date"
                                    className="w-full border rounded-lg p-2 mt-1"
                                    {...register('caseDate', {required:true})}

                                />
                            </div>

                        </div>

                        <div>
                            <label className="text-sm font-medium">
                                Proof Files (optional)
                            </label>

                            <input
                                type="file"
                                className="w-full border rounded-lg p-2 mt-1"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                        >
                            Submit & Analyze
                        </button>

                    </form>

                </div>

            </div>

        </>
    )
}

export default ClientCreateCase
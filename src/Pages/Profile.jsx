import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LawyerProfile = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();



    // profile api call
    async function submit(data) {
        console.log(data);

        const payload = {
            email: data.email,
            barCouncilId: data.barCouncilId,
            degree: data.degree,
            lawyerType: data.lawyerType.split("")[0].toUpperCase() + data.lawyerType.split("c")[1],
            experienceYears: Number(data.experienceYears),
            totalCases: Number(data.wonCases) + Number(data.lostCases),
            wonCases: Number(data.wonCases),
            lostCases:Number(data.lostCases),
            winRatio:Number(data.wonCases),
            feeMin: Number(data.feeMin),
            feeMax:Number(data.feeMax)
        }


        try {
            const response = await fetch("http://localhost:8000/lawyer/profile", {
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body: JSON.stringify(payload)
            })

            const res = await response.json();

            if(res.success === true){
                toast.success(res.message)
                navigate("/")
            }else{
                toast.error(res.message)
            }

        } catch (error) {
            toast.error("Server Error!")
        }

        console.log(payload)

    }

    return (
        <>
            <div className="w-full h-screen flex flex-col justify-center items-center bg-gray-100 ">
                <div className="flex flex-col  justify-center font-serif gap-4 items-center text-center">
                    <div className="flex gap-2 text-xl items-center justify-center">
                        <i className="fa-solid fa-scale-balanced text-blue-500 text-2xl"></i>
                        <h1 className="text-gray-900 font-bold text-2xl">LegalDesk</h1>
                    </div>

                    <div>
                        <h1 className="text-gray-900 font-bold text-2xl">
                            Lawyer Profile Setup
                        </h1>
                        <p className="text-gray-600">Complete your professional details</p>
                    </div>
                </div>

                <div className="w-[40%] mx-auto py-6">
                    <form
                        onSubmit={handleSubmit(submit)}
                        className="flex flex-col gap-3 text-gray-600 font-semibold bg-white rounded-2xl shadow-xl p-4"
                    >
                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="email-id" className="text-lg">
                                    Email
                                </label>
                                <input
                                    type="text"
                                    id="email-id"
                                    placeholder="✉ abc@gmail.com"
                                    className=" bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("email", { required: true })}
                                />
                                {errors.email && (
                                    <span className="text-red-600">
                                        Email is Required
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="barcouncil-id" className="text-lg">
                                    Bar Council ID
                                </label>
                                <input
                                    type="text"
                                    id="barcouncil-id"
                                    placeholder="🔰 e.g. MH/1234/2020"
                                    className=" bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("barCouncilId", { required: true })}
                                />
                                {errors.barCouncilId && (
                                    <span className="text-red-600">
                                        Bar Council ID is Required
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="degree" className="text-lg">
                                    Degree
                                </label>
                                <input
                                    type="text"
                                    id="degree"
                                    placeholder="🎓 LL.B / LL.M"
                                    className="w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900 bg-gray-100"
                                    {...register("degree", { required: true })}
                                />
                                {errors.degree && (
                                    <span className="text-red-600">Degree is Required</span>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="specialization" className="text-lg">
                                    Specialization
                                </label>
                                <select
                                    id="specialization"
                                    className="  bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("lawyerType", { required: true })}
                                >
                                    <option value="">Select Type</option>
                                    <option value="criminal">Criminal</option>
                                    <option value="civil">Civil</option>
                                    <option value="domestic">Domestic</option>
                                </select>
                                {errors.lawyerType && (
                                    <span className="text-red-600">Lawyer Type is Required</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="experienceYears" className="text-lg">
                                    experienceYears (Years)
                                </label>
                                <input
                                    type="number"
                                    id="experienceYears"
                                    placeholder="⏳ 0"
                                    className="  bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("experienceYears", { required: true })}
                                />
                                {errors.experienceYears && (
                                    <span className="text-red-600">experienceYears is Required</span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col gap-2 w-1/3">
                                <label htmlFor="totalCases" className="text-lg">
                                    Total Cases
                                </label>
                                <input
                                    type="number"
                                    id="totalCases"
                                    placeholder="0"
                                    className="bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("totalCases", { required: true })}
                                />
                                {errors.totalCases && (
                                    <span className="text-red-600">this field is Required</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 w-1/3">
                                <label htmlFor="wonCases" className="text-lg">
                                    wonCases
                                </label>
                                <input
                                    type="number"
                                    id="wonCases"
                                    placeholder="0"
                                    className="bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("wonCases", { required: true })} />
                                {errors.wonCases && (
                                    <span className="text-red-600">this field is Required</span>
                                )}
                            </div>

                            <div className="flex flex-col gap-2 w-1/3">
                                <label htmlFor="lostCases" className="text-lg">
                                    lostCases
                                </label>
                                <input
                                    type="number"
                                    id="lostCases"
                                    placeholder="0"
                                    className="bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("lostCases", { required: true })} />
                                {errors.lostCases && (
                                    <span className="text-red-600">this field is Required</span>
                                )}

                            </div>
                        </div>
                        <div className="flex gap-4 w-full">
                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="feeMin" className="text-lg">
                                    Min Fees (₹)
                                </label>
                                <input
                                    type="number"
                                    id="feeMin"
                                    placeholder="₹ 0"
                                    className="bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("feeMin", { required: true })} />
                                {errors.feeMin && (
                                    <span className="text-red-600">this field is Required</span>
                                )}


                            </div>

                            <div className="flex flex-col gap-2 w-1/2">
                                <label htmlFor="feeMax" className="text-lg">
                                    Max Fees (₹)
                                </label>
                                <input
                                    type="number"
                                    id="feeMax"
                                    placeholder="₹ 0"
                                    className="bg-gray-100 w-full p-1 rounded-md border-2 border-gray-200 outline-gray-900"
                                    {...register("feeMax", { required: true })} />
                                {errors.feeMax && (
                                    <span className="text-red-600">this field is Required</span>
                                )}

                            </div>
                        </div>

                        <button
                            className="w-full bg-blue-600 rounded-md mt-2 p-2 text-sm text-gray-200 hover:bg-sky-700 hover:text-white cursor-pointer"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LawyerProfile;
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Loader from "./Loader";
import ClientCase from "./ClientCase";

function ClientCreateCase() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const fileInputRef = useRef(null);
    const [files, setFiles] = useState([]);
    const user = JSON.parse(localStorage.getItem("user"));
    const [loaderData, setLoaderData] = useState(false);
    const [caseData, setCaseData] = useState({})
    const [caseModal, setCaseModal] = useState(false)

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (files.length + selectedFiles.length > 2) {
            toast.error("You can upload maximum 2 files only");
            return;
        }

        // displaying file name
        const filesWithPreview = selectedFiles.map((file) => ({
            file,
            preview: file.type.startsWith("image/")
                ? URL.createObjectURL(file)
                : null,
        }));

        setFiles((prev) => [...prev, ...filesWithPreview]);
    };


    //  removing file options
    const removeFile = (index) => {
        const updatedFiles = [...files];

        if (updatedFiles[index].preview) {
            URL.revokeObjectURL(updatedFiles[index].preview);
        }

        updatedFiles.splice(index, 1);
        setFiles(updatedFiles);
    };


    // create case api integration
    async function submit(data) {
        setLoaderData(true)
        console.log(data);
        console.log(files);

        const formdata = new FormData();

        formdata.append("problemStatement", data.problemStatement);
        formdata.append("location", data.location);
        formdata.append("caseDate", data.caseDate);

        for (let i = 0; i < files.length; i++) {
            formdata.append("proofFiles", files[i])
        }

        try {
            const response = await fetch("http://localhost:8000/client/createcase", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${user?.token}`,
                },
                body: formdata
            })

            const res = await response.json();

            if (res.success) {
                toast.success(res.meesage);

                setCaseData(res);
                setCaseModal(true)

            } else {
                toast.error(res.message)
            }
        } catch (error) {
            toast.error("Server Error")
        } finally {
            setLoaderData(false)
        }




    }

    return (
        <>
            {
                !caseModal ?
                    (
                        <div className="p-6 bg-gray-100  flex justify-center">
                            <div className="bg-white shadow rounded-lg p-6 w-full max-w-2xl">
                                <h1 className="text-2xl font-serif font-semibold mb-6 text-center">
                                    Create New Case
                                </h1>

                                <form className="space-y-4" onSubmit={handleSubmit(submit)}>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">
                                            Problem Statement
                                            {errors.problemStatement && (
                                                <span className="text-sm text-red-600"> * </span>
                                            )}
                                        </label>

                                        <textarea
                                            placeholder="Describe your legal issue in detail..."
                                            className="w-full border rounded-lg p-3 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            {...register("problemStatement", { required: true })}
                                        />
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-sm font-medium">
                                                Location
                                                {errors.location && (
                                                    <span className="text-sm text-red-600"> * </span>
                                                )}
                                            </label>

                                            <input
                                                type="text"
                                                placeholder="Mumbai, Maharashtra"
                                                className="w-full border rounded-lg p-2 mt-1"
                                                {...register("location", { required: true })}
                                            />
                                        </div>

                                        <div>
                                            <label className="text-sm font-medium">
                                                Case Date
                                                {errors.caseDate && (
                                                    <span className="text-sm text-red-600"> * </span>
                                                )}
                                            </label>

                                            <input
                                                type="date"
                                                className="w-full border rounded-lg p-2 mt-1"
                                                {...register("caseDate", { required: true })}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-sm font-medium">
                                            Proof Files (optional)
                                        </label>

                                        <div>

                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />


                                            <button
                                                type="button"
                                                onClick={handleButtonClick}
                                                className="mt-1 px-2 py-1 bg-blue-500 text-white rounded-lg text-sm"
                                            >
                                                Upload Files
                                            </button>
                                        </div>


                                        <div className="flex gap-2 mt-2 flex-wrap">
                                            {files.map((item, index) => (
                                                <div key={index} className="relative w-20 text-center">
                                                    <div className="w-15 h-15 border rounded-lg flex items-center justify-center bg-gray-100 overflow-hidden mx-auto">

                                                        {item.preview ? (
                                                            <img
                                                                src={item.preview}
                                                                alt="preview"
                                                                className="w-full h-full object-cover"
                                                            />
                                                        ) : (
                                                            <span className="text-3xl">📄</span>
                                                        )}
                                                    </div>


                                                    <button
                                                        onClick={() => removeFile(index)}
                                                        className="absolute top-0 right-2 bg-red-500 text-white rounded-full w-4 h-4 text-sm flex items-center justify-center"
                                                    >
                                                        ×
                                                    </button>


                                                    <p className="text-xs mt-1 truncate">{item.file.name}</p>
                                                </div>
                                            ))}
                                        </div>
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
                    ) : <ClientCase caseData={caseData} />
            }

            {
                loaderData ? <Loader /> : null
            }



        </>
    );
}

export default ClientCreateCase;
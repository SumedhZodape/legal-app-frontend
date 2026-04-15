import Select from "react-select";
import { useState } from "react";
import { toast } from "react-toastify";

function ClientCase({ caseData }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const [selectedLaweyer, setSelectedLawyer] = useState([]);

  console.log(caseData)

  // update the case (Add requested lawyers)
  const updateCase = async () => {
    const caseId = caseData?.caseInfo?._id;
    const requestedLawyers = selectedLaweyer?.map((ele)=>ele.value);

    console.log(caseId)
    console.log(requestedLawyers)

    if (requestedLawyers.length === 0) {
      return toast.error("Please select minimum one lawyer!")
    }

    try {
      const response = await fetch("http://localhost:8000/client/updatecase", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
        body: JSON.stringify({
          caseId,
          requestedLawyers
        })
      })

      const res = await response.json();

      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }

    } catch (error) {
      toast.error("Server Error!")
    }
  }

  return (
    <>
      <div className="p-3 bg-gray-100  ">

        <h1 className="text-2xl font-serif font-semibold mb-4">My Case</h1>

        <div className="bg-white rounded-lg shadow p-6 border">

          <p className="text-gray-700 mb-3">
            {caseData?.caseInfo?.problemStatement}
          </p>

          <div className="flex gap-4 text-sm text-gray-500 mb-4">
            <span>📍 {caseData?.caseInfo?.location}</span>
            <span>📅 {caseData?.caseInfo?.caseDate}</span>
            <span className="ml-auto bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
              {caseData?.caseInfo?.caseStatus}
            </span>
          </div>

          <div className="border rounded-lg p-4 bg-gray-50">

            <h2 className="font-semibold text-purple-600 mb-2">
              ⚙ AI Case Analysis
            </h2>

            <div className="grid md:grid-cols-3 gap-4 text-sm">

              <div>
                <p className="text-gray-500">Predicted Type</p>
                <p className="font-medium">{caseData?.result?.predictedCaseType}</p>
              </div>

              <div>
                <p className="text-gray-500 mb-1">Severity</p>
                <span className={caseData?.result?.caseSeverity === "HIGH" ? "bg-red-500 text-white px-2 py-1 rounded" :
                  caseData?.result?.caseSeverity === "MEDIUM" ? "px-2 py-1 rounded bg-amber-600 text-white" : "px-2 py-1 rounded text-white bg-yellow-300"
                }>
                  {caseData?.result?.caseSeverity}
                </span>
              </div>

              <div>
                <p className="text-gray-500">Estimated Fee</p>
                <p className="font-medium">₹{caseData?.result?.estimatedFeeMin} - ₹{caseData?.result?.estimatedFeeMax}</p>
              </div>

            </div>

            <div className="mt-4 text-sm">
              <p className="text-gray-500">IPC Sections</p>
              <div className="flex gap-2 mt-1 flex-wrap">
                {
                  caseData?.result?.suggestedIPSSections?.map((ele, index) => {
                    return (
                      <span key={index} className="bg-gray-200 px-2 py-1 rounded">
                        {ele}
                      </span>
                    )
                  })
                }
              </div>
            </div>

            <div className="mt-4 text-sm">
              <p className="text-gray-500">Worst Case Outcome</p>
              <p>{caseData?.result?.wrostCaseOutcome}</p>
            </div>

            <div className="mt-2 text-sm">
              <p className="text-gray-500">Remark</p>
              <p>{caseData?.result?.remark}</p>
            </div>

          </div>

          <div className="mt-4 text-sm flex items- y gap-70">
            <div className="mt- text-sm">
              <p className="text-gray-500">Attachments</p>
              <p className="bg-gray-200 px-2 py-1 rounded ">
                termination_letter.pdf
              </p>
            </div>
            <div className="w-[33%] ">
              <p className="text-gray-500 mb-2">Suggested Lawyers</p>
              <span>

                <Select
                  isMulti options={caseData?.lawyersData}
                  className="text-sm w-[]"
                  classNamePrefix="select"
                  placeholder="Select lawyers..."
                  onChange={(data) => setSelectedLawyer(data || [])}
                />
              </span>
            </div>
            <button disabled={selectedLaweyer.length == 0} className={` text-white px-4  rounded-xl text-[17px] whitespace-nowrap ${selectedLaweyer.length == 0 ?
              "text-white bg-blue-400 cursor not cursor-not-allowed" : "text-white bg-blue-500 hover:bg-blue-600"}`}
              onClick={updateCase}
            >
              Send Request
            </button>
          </div>

        </div>

      </div>
    </>
  )
}

export default ClientCase
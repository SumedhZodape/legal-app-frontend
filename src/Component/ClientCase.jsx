function ClientCase() {
  return (
    <>
    <div className="p-3 bg-gray-100  ">

      <h1 className="text-2xl font-serif font-semibold mb-4">My Cases</h1>

      <div className="bg-white rounded-lg shadow p-6 border">

        <p className="text-gray-700 mb-3">
          I was wrongfully terminated from my job without any prior notice or valid reason.
          I had been working for the company for 5 years.
        </p>

        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span>📍 Mumbai, Maharashtra</span>
          <span>📅 2024-01-15</span>
          <span className="ml-auto bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
            OPEN
          </span>
        </div>

        <div className="border rounded-lg p-4 bg-gray-50">

          <h2 className="font-semibold text-purple-600 mb-2">
            ⚙ AI Case Analysis
          </h2>

          <div className="grid md:grid-cols-3 gap-4 text-sm">

            <div>
              <p className="text-gray-500">Predicted Type</p>
              <p className="font-medium">Employment Dispute</p>
            </div>

            <div>
              <p className="text-gray-500">Severity</p>
              <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded">
                MEDIUM
              </span>
            </div>

            <div>
              <p className="text-gray-500">Estimated Fee</p>
              <p className="font-medium">₹15,000 - ₹50,000</p>
            </div>

          </div>

          <div className="mt-4 text-sm">
            <p className="text-gray-500">IPC Sections</p>
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="bg-gray-200 px-2 py-1 rounded">
                Section 27 - Industrial Disputes Act
              </span>
              <span className="bg-gray-200 px-2 py-1 rounded">
                Section 25F - Conditions for Retrenchment
              </span>
            </div>
          </div>

          <div className="mt-4 text-sm">
            <p className="text-gray-500">Worst Case Outcome</p>
            <p>Case dismissed if employer proves valid grounds</p>
          </div>

          <div className="mt-2 text-sm">
            <p className="text-gray-500">Remark</p>
            <p>Strong case if termination letter lacks valid reasons</p>
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
    </>
  )
}

export default ClientCase
import React, { useState } from "react";

function JobCard({ job, applyToJob, hasApplied }) {
  const [applied, setApplied] = useState(hasApplied);

  const handleApply = async () => {
    if (!applied) {
      await applyToJob(job.id);
      setApplied(true);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{job.title}</h3>
      <p className="text-gray-600">
        <strong>Salary:</strong> {job.salary ? `$${job.salary.toLocaleString()}` : "N/A"}
      </p>
      <p className="text-gray-600">
        <strong>Equity:</strong> {job.equity ? `${(job.equity * 100).toFixed(2)}%` : "N/A"}
      </p>
      <button
        className={`mt-4 px-4 py-2 text-white rounded-md ${
          applied ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
        } transition-colors`}
        onClick={handleApply}
        disabled={applied}
      >
        {applied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JobCard from "./JobCard";
import JoblyApi from "./api";

function CompanyDetail({ user }) {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applications, setApplications] = useState(new Set(user ? user.applications : []));

  useEffect(() => {
    async function fetchCompany() {
      try {
        const response = await JoblyApi.request(`companies/${handle}`);
        setCompany(response.company);
      } catch (error) {
        console.error("Error fetching company details:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCompany();
  }, [handle]);

  const applyToJob = async (jobId) => {
    console.log("Applying for job:", jobId, "with user:", user.username);
  
    try {
      await JoblyApi.applyToJob(user.username, jobId);  // Correct method call
      setApplications(new Set(applications.add(jobId)));
    } catch (error) {
      console.error("Error applying to job:", error);
    }
  };
  

  if (loading) return <p>Loading company details...</p>;
  if (!company) return <p>Company not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{company.name}</h2>
      <p className="text-gray-600 mb-2">{company.description}</p>
      <p className="text-gray-600"><strong>Industry:</strong> {company.industry}</p>
      <p className="text-gray-600"><strong>Number of Employees:</strong> {company.numEmployees}</p>

      <h3 className="text-2xl font-semibold text-gray-800 mt-6">Jobs at {company.name}</h3>
      {company.jobs.length > 0 ? (
        company.jobs.map((job) => (
          <JobCard key={job.id} job={job} applyToJob={applyToJob} hasApplied={applications.has(job.id)} />
        ))
      ) : (
        <p className="text-center text-gray-500">No jobs available at this company.</p>
      )}
    </div>
  );
}

export default CompanyDetail;
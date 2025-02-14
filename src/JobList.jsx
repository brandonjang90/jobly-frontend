import { useState, useEffect } from 'react';
import JobCard from './JobCard';
import JoblyApi from './api';

// JobList component: Displays a list of jobs and handles user job applications
function JobList({ user }) {
  // State variables:
  const [jobs, setJobs] = useState([]);          // Stores the list of jobs
  const [loading, setLoading] = useState(true);  // Indicates if jobs are loading
  const [applications, setApplications] = useState(new Set());  // Tracks job applications for the current user

  // useEffect hook: Fetches jobs and user applications when the component mounts or the `user` prop changes
  useEffect(() => {
    async function fetchJobs() {
      try {
        // Fetch all jobs from the API
        const response = await JoblyApi.request('jobs');
        setJobs(response.jobs);

        // If a user is logged in, fetch their application history
        if (user) {
          const fetchedUser = await JoblyApi.getUser(user.username);  // Fetch user details
          const appliedJobIds = new Set(fetchedUser.applications);   // Convert application IDs to a Set
          setApplications(appliedJobIds);  // Update the state with applied job IDs
        }
      } catch (error) {
        console.error("Error fetching jobs:", error);  // Log any errors that occur
      } finally {
        setLoading(false);  // Loading is complete, whether successful or not
      }
    }

    fetchJobs();  // Call the async function to fetch data
  }, [user]);  // Dependency array: re-run the effect if the `user` prop changes

  // Function to apply to a job
  const applyToJob = async (jobId) => {
    try {
      await JoblyApi.applyToJob(user.username, jobId);  // Call API to apply to the job
      setApplications(new Set(applications.add(jobId)));  // Add the job ID to the Set of applications
    } catch (error) {
      console.error("Error applying to job:", error);  // Log any errors during the application process
    }
  };

  // Conditional rendering while jobs are loading
  if (loading) return <p className="text-center text-gray-500">Loading jobs...</p>;
  
  // Message if no jobs are found
  if (jobs.length === 0) return <p className="text-center text-gray-500">No jobs found.</p>;

  // Main rendering of the job list
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Jobs</h2>
      {jobs.map((job) => (
        <JobCard 
          key={job.id} 
          job={job} 
          applyToJob={applyToJob} 
          hasApplied={applications.has(job.id)} />
      ))}
    </div>
  );
}


export default JobList;  // Export the JobList component for use in other parts of the application

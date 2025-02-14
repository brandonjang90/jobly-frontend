import { useState, useEffect } from 'react';
import CompanyCard from './CompanyCard';

function CompanyList() {
  const [allCompanies, setAllCompanies] = useState([]); // Full list of companies
  const [filteredCompanies, setFilteredCompanies] = useState([]); // Filtered list for display
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const response = await fetch(`/api/companies`);
        const data = await response.json();

        if (data.companies && Array.isArray(data.companies)) {
          setAllCompanies(data.companies);  // Extract the array from data.companies
          setFilteredCompanies(data.companies);
        } else {
          console.error("Unexpected response format:", data);
        }
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, []);

  useEffect(() => {
    const filtered = allCompanies.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCompanies(filtered);
  }, [searchTerm, allCompanies]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">All Companies</h2>
      <input
        type="text"
        placeholder="Search companies..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
      />
      {filteredCompanies.length > 0 ? (
        filteredCompanies.map((company) => (
          <CompanyCard key={company.handle} company={company} />
        ))
      ) : (
        <p className="text-center text-gray-500">No companies found.</p>
      )}
    </div>
  );
}

export default CompanyList;
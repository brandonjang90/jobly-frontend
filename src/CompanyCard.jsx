import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow mb-4">
      <h3 className="text-xl font-semibold text-gray-800">{company.name}</h3>
      <p className="text-gray-600">{company.description}</p>
      <Link to={`/companies/${company.handle}`} className="text-blue-500 hover:underline mt-2 block">
        View Details
      </Link>
    </div>
  );
}

export default CompanyCard;

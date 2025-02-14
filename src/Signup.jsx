import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";

function Signup({ setToken }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await JoblyApi.request("auth/register", formData, "post");
      setToken(res.token);
      JoblyApi.token = res.token;  // Add this line to update JoblyApi.token
      localStorage.setItem("token", res.token);
  
      const newUser = await JoblyApi.getUser(formData.username);
      console.log("Newly Registered User:", newUser);
  
      navigate("/");  // Redirect to homepage
    } catch (err) {
      console.error("Signup Error:", err);
      setError(err[0]);
    }
  };

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["username", "password", "firstName", "lastName", "email"].map((field) => (
          <label key={field} className="block">
            <span className="text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </label>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
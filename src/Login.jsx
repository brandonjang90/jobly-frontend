import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from "./api";

function Login({ setToken, setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // Request a token from the backend
      const res = await JoblyApi.request("auth/token", formData, "post");
      
      // Set the token in state and localStorage
      setToken(res.token);
      JoblyApi.token = res.token;  // Ensure JoblyApi uses the new token
      localStorage.setItem("token", res.token);
      
      console.log("Login Token:", res.token);  // Optional debug log for token
  
      // Fetch the logged-in user's details
      const loggedInUser = await JoblyApi.getUser(formData.username);
      console.log("Logged-in user:", loggedInUser);  // Debug log for the user
      setUser(loggedInUser);  // Update the global user state
  
      navigate("/");  // Redirect to homepage after login
    } catch (err) {
      console.error("Login Error:", err);
      setError("Invalid username or password.");  // Display a user-friendly message
    }
  }
  

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((fData) => ({ ...fData, [name]: value }));
  }

  return (
    <div className="max-w-md mx-auto p-8 border border-gray-300 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <label className="block">
          <span className="text-gray-700">Username:</span>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        <label className="block">
          <span className="text-gray-700">Password:</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </label>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
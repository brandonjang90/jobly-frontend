import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import JoblyApi from './api';


function Profile({ user, onProfileUpdate }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);


  useEffect(() => {
    if (user === undefined) {
      // Wait until user state is determined
      return;
    }
  
    if (user === null) {
      navigate("/login");
    } else {
      setFormData({
        username: user.username || "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        password: "",
      });
      setLoading(false);
    }
  }, [user, navigate]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    setSaving(true);
  

    try {
        console.log("JoblyApi.token:", JoblyApi.token);  // Debugging log for the token
        if (!JoblyApi.token) {
            setError("Session expired. Please log in again.");
            navigate("/login");
            return;
        }

        const { username, ...updateData } = formData;

        const updatedUser = await JoblyApi.request(
            `users/${user.username}`,
            updateData,
            "patch"
        );
        
      setSuccess(true);
      onProfileUpdate(updatedUser.user);
    } catch (err) {
      console.error("Profile update error:", err);
      setError(Array.isArray(err) ? err.join(", ") : err || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };
  
  
  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto p-8 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">Profile updated successfully!</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        {["firstName", "lastName", "email", "password"].map((field) => (
          <label key={field} className="block">
            <span className="text-gray-700">{field.charAt(0).toUpperCase() + field.slice(1)}:</span>
            <input
              type={field === "password" ? "password" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </label>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600">
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default Profile;
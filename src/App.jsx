import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './Homepage';
import NavBar from './NavBar';
import Login from './Login';
import Signup from './Signup';
import Profile from './Profile';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetails';
import JobList from './JobList';
import { decodeJwt } from "jose";
import JoblyApi from './api';
import useLocalStorage from './useLocalStorage';
import ProtectedRoute from './ProtectedRoute';
import './App.css';


function App() {
  // Hook to save the token in localStorage and ensure the token is available even after a page refresh.
  const [token, setToken] = useLocalStorage("token");
  // State to manage the currently logged-in user.
  const [user, setUser] = useState(null);
  // Loading state to show a loading message while fetching user data.
  const [loading, setLoading] = useState(true);

  //Fetch the current user when the token changes. If there's no token, it sets the user to `null`.
  useEffect(() => {
    // Prevent setting state on unmounted component
    let isMounted = true;
    const fetchUser = async () => {
      if (!token) {
        // No token means no logged-in user
        setUser(null);
        setLoading(false);
        return;
      }
      try {
        // Decode the token to extract the username
        const { username } = decodeJwt(token);

        // Fetch the user's full details from the API
        const user = await JoblyApi.getUser(username);
        if (isMounted)
        setUser(user);
      } catch (error) {
        // If an error occurs (e.g., token is invalid), reset the user and token
        console.error("Error fetching user:", error);
        if (isMounted) {
          setUser(null);
          setToken(null);  // Reset token only for permanent issues like invalid tokens
        }
      } finally {
        // Mark loading as false once the fetch is complete
        if (isMounted) setLoading(false);
      }
    };

    // Call the function to fetch the user
    fetchUser();
    return () => {isMounted = false;};
    }, [token]);  // The effect runs when `token` or `setToken` changes

  // Handle user profile update. This is passed to the Profile component to update the user state.

  const handleProfileUpdate = (updatedUser) => {
    setUser(updatedUser);
  };

  // Show a loading message while the application is fetching the user data
  if (loading) return <p>Loading application...</p>;

  return (
    <Router>
      <NavBar token={token} setToken={setToken} user={user} />
      <Routes>
        <Route path="/" element={<HomePage user={user}/>} />
        <Route path="/login" element={<Login setToken={setToken} setUser={setUser} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route
          path="/profile"
          element=
          {<ProtectedRoute 
            user={user} 
            element=
            {<Profile 
              user={user} 
              onProfileUpdate={handleProfileUpdate} 
              />} 
            />}
        />
        <Route 
          path="/companies" 
          element=
          {<ProtectedRoute
            user={user}
            element=
            {<CompanyList />} 
          />}
        />
        <Route 
          path="/companies/:handle" 
          element={<ProtectedRoute 
            user={user} 
            element={<CompanyDetail />} 
          />} 
        />
        <Route 
        path="/jobs" 
        element={<ProtectedRoute
          user={user}
          element={<JobList
            user={user}
            />} 
          />}
        />
      </Routes>
    </Router>
  );
}

export default App;

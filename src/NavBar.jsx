import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHome,  } from "react-icons/ai";
import { FaBuilding, FaBriefcase } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { LuClipboardPen } from "react-icons/lu";
import { IoMdLogIn } from "react-icons/io";
import { RiLogoutCircleRFill } from "react-icons/ri";


function NavBar({ token, setToken }) {
  const navigate = useNavigate();

  function handleLogout() {
    setToken(""); // Clear token
    localStorage.removeItem("token"); // Remove token from localStorage
    navigate("/"); // Redirect to homepage
  }

  return (
    <nav className="bg-blue-600 text-white py-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4">
        <Link to="/" className="text-2xl font-bold hover:text-gray-200 flex items-center space-x-2">
          <AiFillHome />
          <span>Jobly</span>
        </Link>

        <div className="flex items-center space-x-6">
          {token ? (
            <>
              <Link to="/companies" className="hover:text-gray-200 flex items-center space-x-1">
                <FaBuilding />
                <span>Companies</span>
              </Link>
              <Link to="/jobs" className="hover:text-gray-200 flex items-center space-x-1">
                <FaBriefcase />
                <span>Jobs</span>
              </Link>
              <Link to="/profile" className="hover:text-gray-200 flex items-center space-x-1">
                <ImProfile />
                <span>Profile</span>
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-200 flex items-center space-x-1">
                <RiLogoutCircleRFill />
                <span>Logout</span>
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200 flex items-center space-x-1">
                <IoMdLogIn />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="hover:text-gray-200 flex items-center space-x-1">
                <LuClipboardPen />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}


export default NavBar;

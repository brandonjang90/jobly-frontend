import React from "react";

function HomePage({user}) {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-blue-50">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">        
        {user ? `Welcome back, ${user.firstName}!` : "Welcome to Jobly"}
      </h1>
    </div>
  );
}

export default HomePage;

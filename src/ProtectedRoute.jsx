import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ element, user }) {
  return user ? element : <Navigate to="/login" />;
}

export default ProtectedRoute;

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
// This component checks if the user is authenticated.
// If true, it redirects them away from the component (e.g., Login/Signup).
// If false, it renders the children (the Login/Signup form).
function AuthRedirect({ children }) {
  const [auth, setAuth] = useState(null); // null = loading, true/false after check

  useEffect(() => {
    // Re-use the same authentication check logic from ProtectedRoute
    axios
      .get(API_BASE_URL+"api/auth/is-auth", { withCredentials: true })
      .then((res) => {
        setAuth(res.data.success);
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  if (auth === null) {
    return <p>Loading...</p>; // Loading state
  }

  // FIX: If user IS authenticated (auth is true), redirect to the user profile
  return auth ? <Navigate to="/userprofile" replace /> : children;
}

export default AuthRedirect;
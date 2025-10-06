// ProtectedRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function ProtectedRoute({ children }) {
  const [auth, setAuth] = useState(null); // null = loading, true/false after check

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/auth/is-auth", { withCredentials: true })
      .then((res) => {
        setAuth(res.data.success); // backend responds with { success: true }
      })
      .catch(() => {
        setAuth(false);
      });
  }, []);

  if (auth === null) {
    return <p>Loading...</p>; // could replace with spinner
  }

  return auth ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;

import { Navigate } from "react-router-dom";

export function ProtectedRoute({ Component }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (token) {
    return <Component />;
  }
}

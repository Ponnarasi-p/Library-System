import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authProvider";

const ProtectedRoute = ({ children }: any) => {
  const { token }: any = useContext(AuthContext);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
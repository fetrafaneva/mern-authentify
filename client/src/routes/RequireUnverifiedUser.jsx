import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const RequireUnverifiedUser = ({ children }) => {
  const { isLoggedin, userData, loadingUser } = useContext(AppContext);

  if (loadingUser) return null; // ou loader

  if (!isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  if (userData?.isAccountVerified) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default RequireUnverifiedUser;

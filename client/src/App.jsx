import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import EmailVerify from "./pages/EmailVerify";
import ResetPassword from "./pages/ResetPassword";
import { ToastContainer } from "react-toastify";
import RequireUnverifiedUser from "./routes/RequireUnverifiedUser";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 PROTECTION ICI */}
        <Route
          path="/email-verify"
          element={
            <RequireUnverifiedUser>
              <EmailVerify />
            </RequireUnverifiedUser>
          }
        />

        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;

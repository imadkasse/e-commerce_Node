import LoginDashboard from "@/components/dashboard/login-dashboard/LoginDashboard";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div className="w-full p-7 bg-gray-50 dark:bg-gray-800 ">
      <ToastContainer />
      <LoginDashboard />
    </div>
  );
};

export default page;

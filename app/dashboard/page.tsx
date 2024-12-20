import Home from "@/components/dashboard/Home";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div className="w-full lg:p-9 xs:p-2 bg-gray-50 dark:bg-gray-800 h-screen">
      <ToastContainer />
      <Home />
    </div>
  );
};

export default page;

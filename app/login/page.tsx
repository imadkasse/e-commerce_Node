import Login from "@/components/login&signUp/Login";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <div>
      <Login />
      <ToastContainer />
    </div>
  );
};

export default page;

import SideBarUser from "@/components/dashboardUser/SideBarUser";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <SideBarUser />
    </>
  );
};

export default page;

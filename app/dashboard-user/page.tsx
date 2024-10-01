import SideBarUser from "@/components/dashboardUser/SideBarUser";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import React from "react";

const page = () => {
  return (
    <>
      <NavBar />
      <Headr />
      <SideBarUser />
    </>
  );
};

export default page;

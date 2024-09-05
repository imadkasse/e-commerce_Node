import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const Index = () => {
  return (
    <div className="sticky top-0 flex">
      <SideBar />
      <NavBar />
    </div>
  );
};

export default Index;

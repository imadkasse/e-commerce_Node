import Explore from "@/components/exploreproducts/Explore";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import ShowAllProductsWithFillter from "@/components/products/ShowAllProductsWithFillter";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <NavBar />
      <Headr />
      <ShowAllProductsWithFillter />
      <ToastContainer />
    </>
  );
};

export default page;

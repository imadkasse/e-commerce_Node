import ProductModal from "@/components/productPage/ProductModal";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import React from "react";
import { ToastContainer } from "react-toastify";

const page = ({ params }: { params: any }) => {
  return (
    <>
      <NavBar />
      <Headr />
      <ToastContainer />
      <ProductModal id={params.id} />
    </>
  );
};

export default page;

import ProductModal from "@/components/exploreproducts/ProductModal";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import React from "react";

const page = () => {
  return (
    <div>
      <NavBar />
      <Headr />
      <ProductModal />
    </div>
  );
};

export default page;

import ProductModal from "@/components/exploreproducts/ProductModal";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import React from "react";

const page = ({ params }: { params: any }) => {
  
  return (
    <>
      <NavBar />
      <Headr />
      <ProductModal id={params.id} />
    </>
  );
};

export default page;

import Explore from "@/components/exploreproducts/Explore";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import ShowAllProducts from "@/components/products/ShowAllProducts";
import React from "react";

const page = () => {
  return (
    <>
      <NavBar />
      <Headr />
      <ShowAllProducts />
    </>
  );
};

export default page;

"use client";
import React from "react";
import FillterData from "./FillterData";
import AllProducts from "./AllProducts";

const ShowAllProducts = () => {
  return (
    <div className="px-4  sm:px-10  py-10  bg-light-background/50 dark:bg-gray-800 relative flex gap-4 ">
      <FillterData />
      <AllProducts  />
    </div>
  );
};

export default ShowAllProducts;

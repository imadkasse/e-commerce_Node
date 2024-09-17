import React from "react";
import AllProducts from "./AllProducts";
import FillterData from "./FillterData";
import { QueryProvider } from "./QueryContext";
import ShowAllProducts from "./ShowAllProducts";

const ShowAllProductsWithFillter = () => {
  return (
    <QueryProvider>
      <ShowAllProducts />
    </QueryProvider>
  );
};

export default ShowAllProductsWithFillter;

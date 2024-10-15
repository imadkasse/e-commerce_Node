import React from "react";
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


import React from "react";
import AllProducts from "./AllProducts";
import FillterData from "./FillterData";
import { QueryProvider } from "./QueryContext";

const ShowAllProducts = () => {
  return (
    <QueryProvider>
      <div className="px-4  sm:px-10  py-10  bg-light-background/50 dark:bg-gray-800 relative flex gap-4 ">
        <FillterData />
        <AllProducts qurey={"/api/eco/products?sort=price&page=1&limit=8"} />
      </div>
    </QueryProvider>
  );
};

export default ShowAllProducts;

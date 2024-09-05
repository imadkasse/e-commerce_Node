import CreateProducts from "@/components/dashboard/product/CreateProducts";
import Products from "@/components/dashboard/product/Products";
import React from "react";

const page = () => {
  return (
    <div className="w-full lg:p-9 xs:p-2 bg-gray-50 dark:bg-gray-800 ">
      <CreateProducts />
      <Products />
    </div>
  );
};

export default page;

"use client";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import ShoppingCart from "@/components/shoppingCart/ShoppingCart";

const page = () => {
  return (
    <div>
      <NavBar />
      <Headr />
      <ShoppingCart />
    </div>
  );
};

export default page;

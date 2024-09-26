import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import ShoppingCart from "@/components/shoppingCart/ShoppingCart";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <NavBar />
      <Headr />
      <ToastContainer />
      <ShoppingCart />
    </>
  );
};

export default page;

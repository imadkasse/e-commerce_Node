import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import { TotalPriceProvider } from "@/components/shoppingCart/context/price";
import ShoppingCart from "@/components/shoppingCart/ShoppingCart";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <NavBar />
      <Headr />
      <ToastContainer />
      <TotalPriceProvider>
        <ShoppingCart />
      </TotalPriceProvider>
    </>
  );
};

export default page;

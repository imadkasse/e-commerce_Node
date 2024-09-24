import Favorite from "@/components/favorite/Favorite";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import { ToastContainer } from "react-toastify";

const page = () => {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Headr />
      <Favorite />
    </>
  );
};

export default page;

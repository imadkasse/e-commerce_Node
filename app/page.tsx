import ADS from "@/components/ads/ADS";
import Categories from "@/components/categories/Categories";
import Explore from "@/components/exploreproducts/Explore";
import Footer from "@/components/footer/Footer";
import MostProducts from "@/components/mostTrendingProducts/MostProducts";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";
import ScrollToTopButton from "@/components/scrollToTop/ScrollToTopBtn";
import Slide from "@/components/slidProduct/Slide";
import { ToastContainer } from "react-toastify";

export default function Home() {
  return (
    <>
      <ToastContainer />
      <NavBar />
      <Headr />
      <Slide />
      <Categories />
      <Explore />
      <ADS />
      <MostProducts />
      <Footer />
    </>
  );
}

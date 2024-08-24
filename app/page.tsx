import ADS from "@/components/ads/ADS";
import Categories from "@/components/categories/Categories";
import Explore from "@/components/exploreproducts/Explore";
import Footer from "@/components/footer/Footer";
import MostProducts from "@/components/mostTrendingProducts/MostProducts";
import NavBar from "@/components/navBar/NavBar";
import Slide from "@/components/slidProduct/Slide";

export default function Home() {
  return (
    <main className="">
      <Slide />
      <Categories />
      <Explore />
      <ADS />
      <MostProducts />
      <Footer />
    </main>
  );
}

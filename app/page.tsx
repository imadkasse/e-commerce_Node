import Categories from "@/components/categories/Categories";
import Explore from "@/components/exploreproducts/Explore";
import NavBar from "@/components/navBar/NavBar";
import Slide from "@/components/slidProduct/Slide";

export default function Home() {
  return (
    <main className="">
      <Slide />
      <Categories />
      <Explore />
    </main>
  );
}

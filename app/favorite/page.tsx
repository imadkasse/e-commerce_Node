import Favorite from "@/components/favorite/Favorite";
import Headr from "@/components/navBar/Headr";
import NavBar from "@/components/navBar/NavBar";

const page = () => {
  return (
    <div>
      <NavBar />
      <Headr />
      <Favorite />
    </div>
  );
};

export default page;

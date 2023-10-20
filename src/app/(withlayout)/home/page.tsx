import CategoryPage from "@/components/ui/CategoryPage";
import GetInTouch from "@/components/ui/GetInTouch";
import Header from "@/components/ui/Header";
import LatestNews from "@/components/ui/LatestNews";
import Reviews from "@/components/ui/Reviews";
import ServiceProvide from "@/components/ui/ServiceProvide";
import Services from "@/components/ui/Services";
import Upcoming from "@/components/ui/Upcoming";

const Home = () => {
  return (
    <div>
      <Header />
      <CategoryPage />
      <Services />
      <Upcoming />
      <ServiceProvide />
      <Reviews />
      <LatestNews />
      <GetInTouch />
    </div>
  );
};

export default Home;

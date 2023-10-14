"use client";
import Header from "@/components/ui/Header";
import LatestNews from "@/components/ui/LatestNews";
import Reviews from "@/components/ui/Riviews";
import Services from "@/components/ui/Services";

const Home = () => {
  return (
    <div>
      <Header />
      <Services />
      <Reviews />
      <LatestNews />
    </div>
  );
};

export default Home;

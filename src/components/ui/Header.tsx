"use client";
import { useState } from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import RequestModal from "../common/RequestModal";

const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const bannars = [
    {
      id: 1,
      title: "Residential Plumbing",
      descripttion:
        "The residential plumbing system starts with the supply of clean, potable water. This water is delivered to your home from a municipal water source or a well. It is essential that this water is free from contaminants and safe for consumption.",
      image: "/assets/images/slide-2.jpg",
    },
    {
      id: 2,
      title: "Basement Plumbing",
      descripttion:
        "Water heaters are another critical component of residential plumbing. They ensure you have hot water for bathing, washing dishes, and doing laundry. Common types include tankless water heaters and traditional storage tanks.",
      image: "/assets/images/slide-3.jpg",
    },
    {
      id: 3,
      title: "Commercial Plumbing",
      descripttion:
        "Plumbing emergencies, such as burst pipes, need immediate attention to prevent water damage to your home. Knowing how to shut off the main water supply and having a reliable plumber's contact information are essential in such situations.",
      image: "/assets/images/slide-2.jpg",
    },
  ];
  return (
    <AwesomeSlider
      className="h-[270px] md:h-[70vh] lg:h-[80vh] w-[100vw]" // You can add a custom class for styling
    >
      {bannars?.map((banner) => (
        <div
          key={banner.id}
          className="hero min-w-[100vw] min-h-[100vh]"
          style={{
            backgroundImage: `url(${banner?.image})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="hero-overlay bg-opacity-60"></div>
          <div className="hero-content w-full text-center text-neutral-content">
            <div className="max-w-xl">
              <h1 className="mb-5 text-5xl font-bold">{banner?.title}</h1>
              <p className="mb-5">
                {banner?.descripttion}
              </p>
              <button onClick={openModal} className="btn btn-primary">
                Online Book
              </button>
            </div>
          </div>
          <RequestModal isOpen={isOpen} onClose={closeModal} />
        </div>
      ))}
    </AwesomeSlider>
  );
};

export default Header;

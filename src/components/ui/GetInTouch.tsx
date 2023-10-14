"use client";
import { useState } from "react";
import { MdOutlinePhone } from "react-icons/md";
import Image from "next/image";
import RequestModal from "../common/RequestModal";

const GetInTouch = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="">
      <div className="bg-[#F4F5F8] h-[250px]">
        <div className="container  relative space-y-5 flex flex-col h-full justify-center">
          <h3 className="text-xl md:text-3xl font-bold">
            Cant find your desired service? Let us know 24/7 in +88063456364
          </h3>
          <div className="flex flex-col lg:flex-row gap-5">
            <button
              onClick={openModal}
              className="btn btn-accent"
            >
              Request a service
            </button>
            <button className="btn btn-outline">
              <MdOutlinePhone className="w-5 h-5 inline-block" /> +880654
            </button>
          </div>
          <Image
            width={340}
            height={400}
            className="absolute -top-[92px] right-0 hidden lg:block"
            src="/assets/images/service-request.png"
            alt=""
          />
        </div>
      </div>
      <RequestModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default GetInTouch;

"use client";

import { PhoneArrowDownLeftIcon } from "@heroicons/react/20/solid";
import { EnvelopeIcon, MapPinIcon } from "@heroicons/react/24/solid";

const ContactCards = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 max-w-[1020px] mx-auto gap-5 py-5 px-2 md:py-10">
      <div className="card bg-base-50 shadow">
        <div className="card-body items-center text-center">
            <div className="btn">
                <MapPinIcon className="w-8 h-8" />
            </div>
          <h2 className="card-title">Address</h2>
          <p>Mohammadpur limited, road 07, House 115, Dhaka-1225</p>
        </div>
      </div>
      <div className="card bg-base-50 shadow">
        <div className="card-body items-center text-center">
            <div className="btn">
                <EnvelopeIcon className="w-8 h-8" />
            </div>
          <h2 className="card-title">Email Us</h2>
          <p>abdullainfo30@gmail.com</p>
          <p>masudnatore82@gmail.com</p>
        </div>
      </div>
      <div className="card bg-base-50 shadow">
        <div className="card-body items-center text-center">
            <div className="btn">
                <PhoneArrowDownLeftIcon className="w-8 h-8" />
            </div>
          <h2 className="card-title">Call Now</h2>
          <p>+880 1796-682951</p>
          <p>+880 1794-544893</p>
        </div>
      </div>
    </div>
  );
};

export default ContactCards;

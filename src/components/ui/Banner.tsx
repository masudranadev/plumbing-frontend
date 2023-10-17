"use client";

import Link from "next/link";

const Banner = () => {
  return (
    <div
      className="hero min-h-[40vh]"
      style={{
        backgroundImage: "url(/assets/images/page-title.jpg)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Contact Page</h1>
          <div className="text-base breadcrumbs">
            <div>
              <Link href="/home">Home</Link>
              <button>Contact</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;

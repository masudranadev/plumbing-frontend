"use client";

import { StarIcon } from "@heroicons/react/24/solid";
import Image from "next/image";

const ServiceProvide = () => {
  return (
    <div className="bg-[#0052DA] py-5 md:py-0">
      <div className="container ">
        <div className="grid grid-cols-1 lg:grid-cols-2 justify-between items-center lg:h-[600px] overflow-hidden gap-y-5 ">
          <div>
            <h1 className="text-xl md:text-2xl lg:text-5xl font-bold text-slate-50 mb-7">
              We Are Provide Always Different From Other Services.
            </h1>
            <div className="bg-[#0D5BDC] p-3 rounded-md lg:w-1/2">
              <div className="flex justify-center items-center space-x-5">
                <h2 className="text-2xl lg:text-5xl text-yellow-500 font-bold">90K</h2>
                <div>
                  <div className="flex justify-center mt-2 gap-0.5 ">
                    {Array(5)
                      .fill(0)
                      .map((index, i) => (
                        <StarIcon key={i} className="w-6 h-6 text-yellow-500" />
                      ))}
                  </div>
                  <p className="text-xl text-slate-50 font-sans">
                    Customer Reviews
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-[#1b5ec9] flex items-center justify-center  rounded-full lg:w-[700px] lg:h-[600px] gap-5 py-5 md:py-0">
            <div className="grid grid-cols-1 lg:grid-cols-2 justify-center items-center gap-x-5 md:gap-x-10 lg:gap-x-16 gap-y-7 md:gap-y-12 lg:gap-y-24">
              <div className="flex items-center justify-end space-x-5">
                <Image
                  width={60}
                  height={50}
                  alt="image"
                  src="/assets/images/9.png"
                />
                <div>
                  <h2 className="text-xl md:text-2xl lg:text-5xl font-bold text-slate-50">200</h2>
                  <p className="text-slate-50 font-medium text-xl">
                    Running Project
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-5">
                <Image
                  width={60}
                  height={50}
                  alt="image"
                  src="/assets/images/10.png"
                />
                <div>
                <h2 className="text-xl md:text-2xl lg:text-5xl font-bold text-slate-50">85+</h2>
                <p className="text-slate-50 font-medium text-xl">
                  Team Members
                </p>
                </div>
              </div>
              <div className="flex items-center justify-center space-x-5">
                <Image
                  width={60}
                  height={50}
                  alt="image"
                  src="/assets/images/11.png"
                />
               <div>
               <h2 className="text-xl md:text-2xl lg:text-5xl font-bold text-slate-50">39K</h2>
                <p className="text-slate-50 font-medium text-xl">
                  Happy Clients
                </p>
               </div>
              </div>
              <div className="flex items-center justify-center space-x-5">
                <Image
                  width={60}
                  height={50}
                  alt="image"
                  src="/assets/images/12.png"
                />
                <div>
                <h2 className="text-xl md:text-2xl lg:text-5xl font-bold text-slate-50">45</h2>
                <p className="text-slate-50 font-medium text-xl">
                  Award Winning
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceProvide;

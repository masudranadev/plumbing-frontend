"use client";
import { useServicesQuery } from "@/redux/api/serviceApi";
import {
  ArrowPathIcon,
  ClipboardDocumentCheckIcon,
  EyeIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import ServiceCardLoader from "../common/ServiceCardLoader";
import { useAddToCartMutation } from "@/redux/api/addToCartApi";
import Swal from "sweetalert2";
import { getUserInfo, isLoggedin } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ENUM_USER_ROLE } from "@/enums/user";
import { useDebounced } from "@/redux/hooks";

const Services = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const isLoggedIn = isLoggedin();
  const query: Record<string, any> = {};
  if (!!minPrice && !!maxPrice) {
    query["minPrice"] = minPrice;
    query["maxPrice"] = maxPrice;
  }

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }
  const { data, isLoading } = useServicesQuery({ ...query });
  const [addToCart] = useAddToCartMutation();

  const resetFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
  };
  const handleAddToCart = async (id: string) => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      if (id) {
        const res: any = await addToCart({ serviceId: id });
        if (res.data) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Service is Added!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "This service Already Added!",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      }
    }
  };
  const handleBook = (id: string) => {
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      router.push(`/booking/${id}`);
    }
  };
  return (
    <section className="py-10 md:py-20">
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <span className="block mb-2 text-lg font-semibold text-primary">
              Our Services
            </span>
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
              What We Offer
            </h2>
            <p className="text-base text-body-color">
              There are many variations of passages of Lorem Ipsum available but
              the majority have suffered alteration in some form
            </p>
          </div>
        </div>
      </div>
      <div className="container flex flex-col md:flex-row gap-3 justify-between my-5">
        <div className=" flex gap-x-4">
          <div className="form-control">
            <input
              type="text"
              value={searchTerm}
              placeholder="Search by any keyword..."
              className="input input-bordered w-full md:w-auto block"
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
            />
          </div>
          {(!!searchTerm || !!minPrice || !!maxPrice) && (
            <button
              onClick={resetFilters}
              className="btn btn-circle btn-accent"
            >
              <ArrowPathIcon className="w-6 h-6" />
            </button>
          )}
        </div>
        <div className="flex gap-1">
          <div className="form-control">
            <input
              type="number"
              value={minPrice}
              placeholder="min price"
              className="input input-bordered w-full md:w-auto block"
              onChange={(e) => {
                setMinPrice(e.target.value);
              }}
            />
          </div>
          <div className="form-control">
            <input
              type="number"
              value={maxPrice}
              placeholder="max price"
              className="input input-bordered w-full md:w-auto block"
              onChange={(e) => {
                setMaxPrice(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
      <div className="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {isLoading ? (
          <>
            <ServiceCardLoader />
            <ServiceCardLoader />
            <ServiceCardLoader />
            <ServiceCardLoader />
            <ServiceCardLoader />
            <ServiceCardLoader />
          </>
        ) : (
          data?.services?.map((service: any) => (
            <div
              key={service?.id}
              className="border overflow-hidden group border-gray-200 rounded p-3 shadow hover:shadow hover:shadow-primaryColor text-center relative"
            >
              <div className="relative rounded overflow-hidden inline-block w-full">
                <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-gray-900 group-hover:h-[50%] opacity-80"></span>
                <Image
                  width={250}
                  height={250}
                  className="h-[200px] md:h-[250px] lg:h-[300px] w-full object-cover object-top rounded"
                  src={service?.image}
                  alt={service?.title}
                />
                <span className="absolute bottom-0 left-0 flex w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-gray-900 group-hover:h-[50%] opacity-80"></span>
              </div>
              <div className="relative inline-flex items-center justify-center px-1 md:px-5 lg:px-10 py-1 md:py-2 lg:py-4 overflow-hidden bg-gray-800 rounded group -mt-7 md:-mt-10 lg:-mt-14">
                <span className="absolute w-0 h-0 transition-all duration-1000 ease-out bg-primaryColor rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <Image
                  width={250}
                  height={250}
                  className="w-[50px] h-[50px] mx-auto z-10"
                  src="/assets/images/2.jpg"
                  alt={service?.title}
                />
              </div>
              <div className="p-1 md:p-2 lg:p-4 mt-1 md:mt-3 space-y-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  {service?.title}
                </h2>
                <p className="text-xs md:text-base">{service?.description}</p>
              </div>
              <div className="flex flex-col md:flex-row justify-center gap-3">
                <button
                  onClick={() => handleAddToCart(service?.id)}
                  className="btn btn-outline btn-accent"
                  disabled={
                    role === ENUM_USER_ROLE.ADMIN ||
                    role === ENUM_USER_ROLE.SUPER_ADMIN
                  }
                >
                  <ShoppingBagIcon className="w-6 h-6 inline-block" /> Add To
                  Cart
                </button>
                <button
                  onClick={() => handleBook(service?.id)}
                  className="btn btn-outline btn-accent"
                  disabled={
                    role === ENUM_USER_ROLE.ADMIN ||
                    role === ENUM_USER_ROLE.SUPER_ADMIN
                  }
                >
                  <ClipboardDocumentCheckIcon className="w-6 h-6 inline-block" />{" "}
                  Book now
                </button>
              </div>
              <Link
                href={`/service/${service?.id}`}
                className="absolute top-3 -right-14 group-hover:right-3 transition-all duration-500 ease-in-out"
              >
                <button className="btn inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                  <EyeIcon className="w-5 h-5" />
                </button>
              </Link>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Services;

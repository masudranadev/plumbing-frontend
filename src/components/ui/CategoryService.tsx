"use client";
import { useGetServicesByCategoryIdQuery } from "@/redux/api/serviceApi";
import {
  ClipboardDocumentCheckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import ServiceCardLoader from "../common/ServiceCardLoader";
import { useAddToCartMutation } from "@/redux/api/addToCartApi";
import Swal from "sweetalert2";
import { getUserInfo, isLoggedin } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { ENUM_USER_ROLE } from "@/enums/user";
import Link from "next/link";
import { EyeIcon } from "@heroicons/react/24/outline";

const CategoryService = ({ id }: { id: string }) => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const isLoggedIn = isLoggedin();

  const { data, isLoading } = useGetServicesByCategoryIdQuery(id);
  const [addToCart] = useAddToCartMutation();

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
    <section className="py-20">
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
          data?.map((service: any) => (
            <div
              key={service?.id}
              className="border group border-gray-200 rounded p-3 shadow hover:shadow hover:shadow-primaryColor text-center relative overflow-hidden"
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
                <Link
                  href={`/service/${service?.id}`}
                  className="absolute top-[42%] scale-0 group-hover:scale-100 transition-all duration-500 ease-in-out"
                >
                  <button className="btn inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700">
                    <EyeIcon className="w-5 h-5" />
                  </button>
                </Link>
              </div>
              <div className="p-1 md:p-2 lg:p-4 mt-1 md:mt-3 space-y-2">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  {service?.title}
                </h2>
                <p className="text-xs md:text-base">{service?.description}</p>
              </div>
              <div className="flex justify-center gap-3">
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
                  <ClipboardDocumentCheckIcon className="w-6 h-6 inline-block" />
                  Book now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CategoryService;

"use client";
import Loading from "../common/Loading";
import Image from "next/image";
import { format, parseISO } from "date-fns";
import { LuCalendarDays } from "react-icons/lu";
import { useState } from "react";
import {
  FaBriefcase,
  FaFacebookF,
  FaGithub,
  FaLinkedinIn,
} from "react-icons/fa";
import Link from "next/link";
import { useGetReviewsByServiceIdQuery } from "@/redux/api/reviewApi";
import { useServiceQuery, useServicesQuery } from "@/redux/api/serviceApi";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import Review from "./Review";
import ReviewModal from "./ReviewModal";
import {
  ClipboardDocumentCheckIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import { ENUM_USER_ROLE } from "@/enums/user";
import { getUserInfo, isLoggedin } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { useAddToCartMutation } from "@/redux/api/addToCartApi";

const ServiceDetails = ({ id }: { id: string }) => {
  const [tab, setTab] = useState<string>("details");
  const [openModal, setOpenModal] = useState<boolean | null>(null);
  const query: Record<string, any> = {};
  const { data, isLoading: loading } = useServiceQuery(id);
  const { data: reviews, isLoading } = useGetReviewsByServiceIdQuery(id);
  const { data: categoriesData } = useCategoriesQuery({ ...query });
  const { data: serviceData } = useServicesQuery({ ...query });
  const [addToCart] = useAddToCartMutation();
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const isLoggedIn: boolean = isLoggedin();
  if (isLoading || loading || !serviceData) {
    return <Loading />;
  }

  const services: any[] | undefined = [...serviceData?.services];

  if (services && services.length > 0) {
    services.sort((a, b) => {
      const dateA: number = new Date(a.createdAt).getTime();
      const dateB: number = new Date(b.createdAt).getTime();
      return dateB - dateA;
    });
  }

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
    <div className="container mx-auto min-h-[70vh] py-12">
      <div className="grid grid-cols-12 gap-5">
        {/* left side section */}
        <div className="col-span-8 bg-slate-50 p-5 rounded">
          <figure className="mb-7">
            <Image
              src={data?.image}
              alt={data?.title}
              width={1000}
              height={500}
              className="group-hover:scale-110 h-full transition-all duration-200"
            />
          </figure>
          <div className="flex items-center gap-x-4">
            <p className="flex items-center gap-x-1">
              <span className="w-2 h-2 rounded-full bg-blue-600"></span>
              <span>
                <LuCalendarDays />
              </span>
              <span>{format(parseISO(data?.createdAt), "PP")}</span>
            </p>
          </div>
          <h1 className="text-4xl font-bold leading-5 my-8">{data.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
          {/* comments section */}
          <section>
            <div>
              <div
                onClick={() => setTab("details")}
                className={`tab tab-lifted ${
                  tab === "details" && "tab-active"
                }`}
              >
                Details
              </div>
              <button
                onClick={() => setTab("review")}
                className={`tab tab-lifted ${tab === "review" && "tab-active"}`}
              >
                Review
              </button>
            </div>
            <div>
              {tab === "details" ? (
                <p className="mt-5">{data?.description}</p>
              ) : (
                <div>
                  <div className="my-10 flex flex-col md:flex-row gap-10">
                    <label
                      onClick={() => setOpenModal(true)}
                      htmlFor="review_modal"
                      className="btn btn-accent"
                    >
                      write reivew
                    </label>
                  </div>
                  <Review reviews={reviews} />
                </div>
              )}
            </div>
            {!!openModal && (
              <ReviewModal serviceId={id} setOpenModal={setOpenModal} />
            )}
          </section>
        </div>

        {/* right section */}
        <aside className="col-span-4 bg-slate-50 rounded">
          {/* profile or author section */}
          <div className="m-5 bg-slate-200 rounded pb-5">
            <div className="flex flex-col justify-center">
              <div className="h-[150px] w-full">
                <Image
                  src={data?.image}
                  alt={data?.title}
                  width={300}
                  height={150}
                  className="w-full h-full"
                />
              </div>
              <h2 className="text-3xl px-4 font-semibold mt-5">
                ${data?.price}
              </h2>
              <h2 className="text-2xl px-4 font-semibold mt-3">
                {data?.title}
              </h2>
              <p className="px-4 text-justify mt-2">
                Do you want to get service now hits the booking button. or you
                need to another time so hits the add to cart button. Thank you.
              </p>
              <nav className="flex gap-x-2 mt-5 px-4">
                <div className="flex flex-col md:flex-row justify-center gap-3">
                  <button
                    onClick={() => handleAddToCart(data?.id)}
                    className="btn btn-outline btn-accent group"
                    disabled={
                      role === ENUM_USER_ROLE.ADMIN ||
                      role === ENUM_USER_ROLE.SUPER_ADMIN
                    }
                  >
                    <ShoppingBagIcon className="w-6 h-6 inline-block group-hover:text-slate-50" />
                    <span className="group-hover:text-slate-50"> Add To Cart</span>
                  </button>
                  <button
                    onClick={() => handleBook(data?.id)}
                    className="btn btn-secondary group"
                    disabled={
                      role === ENUM_USER_ROLE.ADMIN ||
                      role === ENUM_USER_ROLE.SUPER_ADMIN
                    }
                  >
                    <ClipboardDocumentCheckIcon className="w-6 h-6 inline-block group-hover:text-slate-50" />{" "}
                    <span className="group-hover:text-slate-50">Book now</span>
                  </button>
                </div>
              </nav>
            </div>
          </div>
          {/* category section */}
          <div className="m-5 rounded my-14">
            <h2 className="text-2xl font-normal">Categories</h2>
            <div className="flex gap-x-1 mt-2">
              <span className="w-[100px] h-[5px] bg-primary inline-block rounded-full"></span>
              <span className="flex-1 h-[5px] bg-slate-400 inline-block rounded-full"></span>
            </div>
            <div className="flex flex-col mt-7">
              {categoriesData?.categories?.map((category: any) => (
                <Link
                  href={`/category/service/${category?.id}`}
                  key={category?.id}
                  className="text-xl mb-2 hover:underline hover:text-blue-500"
                >
                  {category?.title}
                </Link>
              ))}
            </div>
          </div>
          {/* recent blog */}
          <div className="m-5 rounded mb-16">
            <h2 className="text-2xl font-normal">Best Services</h2>
            <div className="flex gap-x-1 mt-2">
              <span className="w-[100px] h-[5px] bg-primary inline-block rounded-full"></span>
              <span className="flex-1 h-[5px] bg-slate-400 inline-block rounded-full"></span>
            </div>
            <div className="mt-7 space-y-3">
              {services?.slice(0, 3)?.map((service) => (
                <div className="flex items-center" key={service?.id}>
                  <div className="w-[150px] rounded-full ring ring-slate-50 focus:ring-2">
                    <Image
                      src={service?.image}
                      alt="Shoes"
                      width={100}
                      height={100}
                    />
                    {service?.thumbnail}
                  </div>
                  <div>
                    <Link
                      className="text-xl hover:underline text-blue-500"
                      href={`/service/${service?.id}`}
                    >
                      {service?.title}
                    </Link>
                    <p>{format(parseISO(service?.createdAt), "PP")}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* help section */}
          <div className="p-5 rounded bg-slate-200">
            <h2 className="text-2xl font-normal mb-3">How we can help you?</h2>
            <p>
              We are always ready to for help you you need any help any time
              contact with us we are provide best service 24 house. please for
              contact with our service team member click the contact button
            </p>
            <Link
              href="/contact"
              className="bg-primary text-slate-50 px-3 py-1 rounded inline-block mt-3"
            >
              Contact us
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ServiceDetails;

// ("use client");
// import Loading from "../common/Loading";
// import Image from "next/image";
// import { format, parseISO } from "date-fns";
// import { useServiceQuery } from "@/redux/api/serviceApi";
// import { useState } from "react";
// import Review from "./Review";
// import ReviewModal from "./ReviewModal";
// import { useGetReviewsByServiceIdQuery } from "@/redux/api/reviewApi";

// const ServiceDetails = ({ id }: { id: string }) => {

//   const { data: service, isLoading: loading } = useServiceQuery(id);
//   const { data: reviews, isLoading } = useGetReviewsByServiceIdQuery(id);
//   if (isLoading || loading) {
//     return <Loading />;
//   }
//   return (
//     <div className="container mx-auto min-h-[70vh] my-12">
//       <div className="border-b pb-4 mb-5">
//         <p className="font-semibold text-primary">
//           {format(parseISO(service?.createdAt), "PP")}
//         </p>
//         <h2 className="card-title">
//           <span>{service?.title}</span>
//         </h2>
//         <div className="flex justify-end">
//           <div className="">Reviews ({reviews?.length})</div>
//           <div className="divider divider-horizontal"></div>
//           <div className="">Ratings</div>
//         </div>
//       </div>
//       <h1 className="text-5xl font-bold mb-5">{service.title}</h1>
//       <figure className="mb-7">
//         <Image
//           src={service?.image}
//           alt="Shoes"
//           width={500}
//           height={500}
//           className="group-hover:scale-110 h-full transition-all duration-200"
//         />
//       </figure>
//     </div>
//   );
// };

// export default ServiceDetails;

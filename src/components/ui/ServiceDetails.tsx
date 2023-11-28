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

const ServiceDetails = ({ id }: { id: string }) => {
  const [tab, setTab] = useState<string>("details");
  const [openModal, setOpenModal] = useState<boolean | null>(null);
  const query: Record<string, any> = {};
  const { data, isLoading: loading } = useServiceQuery(id);
  const { data: reviews, isLoading } = useGetReviewsByServiceIdQuery(id);
  const { data: categoriesData } = useCategoriesQuery({ ...query });
  const { data: serviceData } = useServicesQuery({ ...query });
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
          <div className="m-5 bg-slate-200 rounded">
            <div className="avatar flex flex-col items-center justify-center">
              <div className="w-full h-[150px] ring ring-slate-50 focus:ring-2">
                <Image
                  src={data?.image}
                  alt="Shoes"
                  width={300}
                  height={100}
                  className="object-cover object-top w-full h-[150px]"
                />
              </div>
              <h2 className="text-3xl font-semibold mt-5">
                {data?.author?.fullName}
              </h2>
              <p className="px-4 text-justify mt-3">
                I am Masud Rana. as a full stact developer. I am from
                bangladesh. I love coding very much. I Looing for a job for my
                best this industries
              </p>
              <nav className="flex gap-x-2 mt-5">
                <a
                  href="http://www.facebook.com/masudranawebdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span
                    className="w-10 h-10 rounded-full bg-[#1877f2] group-hover:bg-slate-50 transition-all duration-500 flex items-center justify-center tooltip"
                    data-tip="facebook"
                  >
                    <FaFacebookF className="text-slate-50 group-hover:text-[#1877f2] transition-all duration-500" />
                  </span>
                </a>
                <a
                  href="http://www.linkedin.com/in/masudranawebdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span
                    className="w-10 h-10 rounded-full bg-[#1877f2] group-hover:bg-slate-50 transition-all duration-500 flex items-center justify-center tooltip"
                    data-tip="linkedin"
                  >
                    <FaLinkedinIn className="text-slate-50 group-hover:text-[#1877f2] transition-all duration-500" />
                  </span>
                </a>
                <a
                  href="http://www.github.com/masudranawebdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span
                    className="w-10 h-10 rounded-full bg-slate-900 group-hover:bg-slate-50 transition-all duration-500 flex items-center justify-center tooltip"
                    data-tip="github"
                  >
                    <FaGithub className="text-slate-50 group-hover:text-slate-900 transition-all duration-500" />
                  </span>
                </a>
                <a
                  href="http://mrmasud.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                >
                  <span
                    className="w-10 h-10 rounded-full bg-slate-900 group-hover:bg-slate-50 transition-all duration-500 flex items-center justify-center tooltip"
                    data-tip="portfolio"
                  >
                    <FaBriefcase className="text-slate-50 group-hover:text-slate-900 transition-all duration-500" />
                  </span>
                </a>
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
          <div className="m-5 rounded">
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

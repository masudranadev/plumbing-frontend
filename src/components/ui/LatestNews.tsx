"use client";
import Image from "next/image";
import Link from "next/link";
import ServiceCardLoader from "../common/ServiceCardLoader";
import { useBlogsQuery } from "@/redux/api/blogApi";
import { format, parseISO } from "date-fns";

const LatestNews = () => {
  const arg = {};
  const { data, isLoading } = useBlogsQuery({ ...arg });
  return (
    <section className="py-5 md:py-10 lg:py-20">
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="mx-auto mb-12 max-w-[510px] text-center lg:mb-20">
            <h2 className="mb-4 text-3xl font-bold text-dark sm:text-4xl md:text-[40px]">
              Latest News & Blog
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
          data?.blogs?.map((blog) => (
            <Link href={`/blog/${blog?.id}`} key={blog?.id}>
              <div className="group card rounded bg-base-100 shadow hover:shadow-md">
                <figure>
                  <Image
                    src={blog?.thumbnail}
                    alt="Shoes"
                    width={500}
                    height={500}
                    className="group-hover:scale-110 h-[300px] transition-all duration-200"
                  />
                </figure>
                <div className="card-body">
                  <p className="font-semibold text-primary">
                    {format(parseISO(blog?.createdAt), "PP")}
                  </p>
                  <h2 className="card-title">
                    <span>{blog?.title}</span>
                  </h2>
                  <div className="flex gap-8 my-3 items-center">
                    <div className="avatar">
                      <div className="w-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        <Image
                          src={blog?.author?.profileImg as string}
                          alt="Shoes"
                          width={50}
                          height={50}
                        />
                      </div>
                    </div>
                    <div>
                      <h1>{blog?.author?.fullName}</h1>
                      <address>{blog?.author?.address}</address>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <div className="">Comments</div>
                    <div className="divider divider-horizontal"></div> 
                    <div className="">Likes</div>
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default LatestNews;

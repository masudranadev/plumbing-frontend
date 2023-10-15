"use client";
import Image from "next/image";
import Link from "next/link";
import ServiceCardLoader from "../common/ServiceCardLoader";
import { useBlogsQuery } from "@/redux/api/blogApi";

const LatestNews = () => {
  const arg = {};
  const { data, isLoading } = useBlogsQuery({ ...arg });
  return (
    <section className="py-10 md:py-10 lg:py-20">
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
            <div key={blog?.id}>
              <div className="card rounded bg-base-100 shadow hover:shadow-xl">
                <figure>
                  <Image
                    src={blog?.thumbnail}
                    alt="Shoes"
                    width={500}
                    height={500}
                    className="hover:scale-110 transition-all duration-200"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">
                    <Link href={`/blog/${blog?.id}`}>{blog?.title}</Link>
                  </h2>
                  <p>
                    {blog?.content.length > 100
                      ? blog?.content.slice(0, 100)
                      : blog?.content}
                  </p>
                  <div className="card-actions justify-end">
                    <div className="badge badge-outline">
                      <Link href={`/blog/${blog?.id}`}>
                        {blog?.author?.fullName}
                      </Link>
                    </div>
                    <div className="badge badge-outline">Fashion</div>
                    <div className="badge badge-outline">Products</div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default LatestNews;

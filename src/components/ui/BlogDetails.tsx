"use client";
import { useBlogQuery } from "@/redux/api/blogApi";
import Loading from "../common/Loading";
import Image from "next/image";
import { format, parseISO } from "date-fns";

const BlogDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useBlogQuery(id);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container mx-auto min-h-[70vh] my-12">
      <div className="border-b pb-4 mb-5">
        <p className="font-semibold text-primary">
          {format(parseISO(data?.createdAt), "PP")}
        </p>
        <h2 className="card-title">
          <span>{data?.title}</span>
        </h2>
        <div className="flex gap-8 my-3 items-center">
          <div className="avatar">
            <div className="w-[50px] rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={data?.author?.profileImg as string}
                alt="Shoes"
                width={50}
                height={50}
              />
            </div>
          </div>
          <div>
            <h1>{data?.author?.fullName}</h1>
            <address>{data?.author?.address}</address>
          </div>
        </div>
        <div className="flex justify-end">
          <div className="">Comments</div>
          <div className="divider divider-horizontal"></div>
          <div className="">Likes</div>
        </div>
      </div>
      <h1 className="text-5xl font-bold mb-5">{data.title}</h1>
      <figure className="mb-7">
        <Image
          src={data?.thumbnail}
          alt="Shoes"
          width={500}
          height={500}
          className="group-hover:scale-110 h-full transition-all duration-200"
        />
      </figure>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </div>
  );
};

export default BlogDetails;

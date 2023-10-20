"use client";
import { useCategoriesQuery } from "@/redux/api/categoryApi";
import { ICategory } from "@/types";
import { useRouter } from "next/navigation";
import { PiBuildingsFill } from "react-icons/pi";
import { SiHomeadvisor } from "react-icons/si";

const CategoryPage = () => {
  const query: Record<string, any> = {};
  const { data, isLoading } = useCategoriesQuery({ ...query });
  const router = useRouter();
  const handleService = (id: string) => {
    router.push(`/category/service/${id}`);
  };
  return (
    <div className="container pt-16 md:pt-32 pb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data?.categories?.map((category: ICategory, i: number) => (
          <div
            onClick={() => handleService(category?.id)}
            className={`${
              i === 0 ? "bg-[#253041]" : "bg-[#0052DA]"
            } py-8 cursor-pointer rounded bg-opacity-90 hover:bg-opacity-100 transition-all duration-300 flex items-center justify-center gap-7`}
            key={category?.id}
          >
            {i === 0 ? (
              <PiBuildingsFill className="w-10 h-10 inline-block text-white" />
            ) : (
              <SiHomeadvisor className="w-10 h-10 inline-block text-white" />
            )}
            <h1 className="text-center font-bold text-white text-xl md:text-2xl lg:text-4xl">
              {category?.title}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

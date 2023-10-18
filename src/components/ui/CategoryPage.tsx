import { useCategoriesQuery } from "@/redux/api/categoryApi";
import Loading from "../common/Loading";
import { ICategory } from "@/types";
import { useRouter } from "next/navigation";
import { PiBuildingsFill } from "react-icons/pi";
import { SiHomeadvisor } from "react-icons/si";

const CategoryPage = () => {
  const query: Record<string, any> = {};
  const { data, isLoading } = useCategoriesQuery({ ...query });
  const router = useRouter();
  const handleService = (id: string) => {
    console.log(id);
    router.push(`/category/service/${id}`);
  };
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="container pt-32 pb-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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

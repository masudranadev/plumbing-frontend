"use client";
import BreadCrumbs from "@/components/common/BreadCrumbs";
import Loading from "@/components/common/Loading";
import { useFeedbackQuery } from "@/redux/api/feedbackApi";
import Image from "next/image";
const items = [
  {
    label: "Dashboard",
    link: "/dashboard",
  },
  {
    label: "Feedback",
    link: "/dashboard/feedback",
  },
  {
    label: "Feedback Details",
    link: "",
  },
];
const DashBoardFeedbackDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useFeedbackQuery(id);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="m-5">
      <BreadCrumbs items={items} />
      <div className="p-5 bg-slate-50 rounded">
        <div className="flex space-x-5 rounded mb-5 border-b-2 pb-2">
          <Image
            src={data?.user?.profileImg as string}
            alt={data?.user?.fullName}
            width={200}
            height={250}
            className="w-[200px] h-[250px] rounded p-1 border-2"
          />
          <div className="space-y-2">
            <h1 className="flex">
              <strong className="w-[115px]">Name</strong>{" "}
              <span>: {data?.user?.fullName}</span>
            </h1>
            <h1 className="flex">
              <strong className="w-[115px]">Contact-No</strong>{" "}
              <span>: {data?.user?.contactNo}</span>
            </h1>
            <h1 className="flex">
              <strong className="w-[115px]">Email</strong>{" "}
              <span>: {data?.user?.email}</span>
            </h1>
            <h1 className="flex">
              <strong className="w-[115px]">Address</strong>{" "}
              <span>: {data?.user?.address}</span>
            </h1>
          </div>
        </div>
        <div className="flex justify-between gap-5">
          <div className="border group border-gray-200 rounded p-3 shadow hover:shadow hover:shadow-primaryColor">
            <div className="relative rounded overflow-hidden inline-block w-full">
              <span className="absolute top-0 left-0 flex w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-gray-900 group-hover:h-[50%] opacity-80"></span>
              <Image
                width={250}
                height={250}
                className="h-[200px] md:h-[250px] lg:h-[300px] w-full object-cover object-top rounded"
                src={data?.service?.image}
                alt={data?.service?.title}
              />
              <span className="absolute bottom-0 left-0 flex w-full h-0 mb-0 transition-all duration-300 ease-out transform translate-y-0 bg-gray-900 group-hover:h-[50%] opacity-80"></span>
            </div>
            <div className="p-1 md:p-2 lg:p-4 mt-1 md:mt-3 space-y-2">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                {data?.service?.title}
              </h2>
              <p className="text-xs md:text-base">
                {data?.service?.description}
              </p>
            </div>
          </div>
          <div className="ring p-5 flex-1 rounded">
            <h2 className="text-2xl font-medium border-b">User Feed-Back</h2>
            <strong>Comments: </strong>
            <h3>{data?.comments}</h3>
            <strong>Suggestoin: </strong>
            <p>{data?.suggestion}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashBoardFeedbackDetails;

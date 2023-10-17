"use client";
import Loading from "@/components/common/Loading";
import { useUserQuery } from "@/redux/api/userApi";
import Image from "next/image";

const DashBoardProfile = ({ id }: { id: string }) => {
  const { data, isLoading } = useUserQuery(id);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="w-full md:w-[700px] mx-auto flex space-x-10 my-10 ring p-5 rounded">
      <div>
        <Image
          src={data?.profileImg as string}
          alt={data?.fullName}
          width={200}
          height={250}
          className="w-[200px] h-[250px] rounded p-1 border-2"
        />
      </div>
      <div className="space-y-2">
        <h1 className="flex">
          <strong className="w-[115px]">Name</strong>{" "}
          <span>: {data?.fullName}</span>
        </h1>
        <h1 className="flex">
          <strong className="w-[115px]">Contact-No</strong>{" "}
          <span>: {data?.contactNo}</span>
        </h1>
        <h1 className="flex">
          <strong className="w-[115px]">Email</strong>{" "}
          <span>: {data?.email}</span>
        </h1>
        <h1 className="flex">
          <strong className="w-[115px]">Address</strong>{" "}
          <span>: {data?.address}</span>
        </h1>
        <h1 className="flex">
          <strong className="w-[115px]">Role</strong>{" "}
          <span>: {data?.role}</span>
        </h1>
      </div>
    </div>
  );
};

export default DashBoardProfile;

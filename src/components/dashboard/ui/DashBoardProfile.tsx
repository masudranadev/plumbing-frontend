"use client";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo } from "@/services/auth.service";
import { IUserProfile } from "@/types";
import Image from "next/image";

const Profile = () => {
  const { userId } = getUserInfo() as any;
  const { data } = useProfileQuery(userId);

  const profile = data?.profile as IUserProfile;

  return (
    <div className="min-h-screen px-2">
      <div className="w-full lg:w-[700px] mx-auto flex flex-col lg:flex-row my-10 ring p-5 rounded space-y-4">
        <Image
          src={profile?.profileImg as string}
          alt={profile?.fullName}
          width={200}
          height={250}
          className="w-full md:w-[200px] h-[250px] rounded p-1 border-2"
        />
        <div className="space-y-2">
          <h1 className="flex">
            <strong className="w-[115px]">Name</strong>{" "}
            <span>: {profile?.fullName}</span>
          </h1>
          <h1 className="flex">
            <strong className="w-[115px]">Contact-No</strong>{" "}
            <span>: {profile?.contactNo}</span>
          </h1>
          <h1 className="flex">
            <strong className="w-[115px]">Email</strong>{" "}
            <span>: {profile?.email}</span>
          </h1>
          <h1 className="flex">
            <strong className="w-[115px]">Address</strong>{" "}
            <span>: {profile?.address}</span>
          </h1>
          <h1 className="flex">
            <strong className="w-[115px]">Role</strong>{" "}
            <span>: {profile?.role}</span>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;

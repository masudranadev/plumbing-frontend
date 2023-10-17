"use client";
import { authKey } from "@/constants/storageKey";
import { ENUM_USER_ROLE } from "@/enums/user";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  UserPlusIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBlogger } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";
import { RiReservedFill } from "react-icons/ri";

const Sidebar = () => {
  const { role, userId } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(userId);
  const router = useRouter();
  const logout = () => {
    removeUserInfo(authKey);
    router.push("/");
  };

  return (
    <div className="p-4 w-80 min-h-full bg-base-200 ">
      <Link href={"/dashboard"} role="button" className="btn text-2xl btn-accent my-3">Dashboard</Link>
      <div className="flex gap-2 mb-4">
        <div className="form-control">
          <input
            type="text"
            placeholder={`Role: ${data?.profile?.fullName as string}`}
            className="input input-bordered w-full md:w-full"
            readOnly
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full ring">
              {isLoading ? (
                <span className="loading loading-dots loading-lg"></span>
              ) : (
                <Image
                  width={32}
                  height={32}
                  alt={data?.profile?.role as string}
                  src={data?.profile?.profileImg as string}
                />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="mt-3 space-y-2 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a>{data?.profile?.fullName}</a>
            </li>
            <li onClick={logout} className="btn btn-sm btn-error">
              Logout
            </li>
          </ul>
        </div>
      </div>
      <ul className="menu text-base-content">
        {role === ENUM_USER_ROLE.USER ? (
          <>
            <li>
              <Link href="/home">
                <HomeIcon className="w-6 h-6" />
              </Link>
            </li>
            <li>
              <Link href="/dashboard/booking">
                <RiReservedFill className="w-6 h-6" />
                Booking
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/home">
                <HomeIcon className="w-6 h-6" />
                Home
              </Link>
            </li>
            <li>
              <Link href="/dashboard/service">
                {" "}
                <WrenchScrewdriverIcon className="w-6 h-6" />
                Service
              </Link>
            </li>
            <li>
              <Link href="/dashboard/blog">
                {" "}
                <FaBlogger className="w-6 h-6" />
                Blog
              </Link>
            </li>
            <li>
              <Link href="/dashboard/faq">
                {" "}
                <QuestionMarkCircleIcon className="w-6 h-6" />
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/dashboard/feedback">
                {" "}
                <FcFeedback className="w-6 h-6" />
                Feedback
              </Link>
            </li>
            <li>
              <Link href="/dashboard/booking">
                {" "}
                <RiReservedFill className="w-6 h-6" />
                Booking
              </Link>
            </li>
            <li>
              <Link href="/dashboard/users">
                {" "}
                <UsersIcon className="w-6 h-6" />
                Users
              </Link>
            </li>
          </>
        )}
        {role === ENUM_USER_ROLE.SUPER_ADMIN && (
          <li>
            <Link href="/dashboard/admin/create">
              {" "}
              <UserPlusIcon className="w-6 h-6" />
              Create Admin
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;

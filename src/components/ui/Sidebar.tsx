"use client";
import { authKey } from "@/constants/storageKey";
import { ENUM_USER_ROLE } from "@/enums/user";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UserPlusIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState} from "react";
import { FaBlogger } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";
import { RiReservedFill } from "react-icons/ri";

const Sidebar = () => {
  const [active, setActive] = useState<string>("");
  const { role, userId } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(userId);
  const router = useRouter();
  const handleActive = (value: string) => {
    setActive(value)
  };

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <div className={`p-4 w-[80vw] md:w-80 min-h-full bg-base-200`}>
      <Link
        onClick={() => handleActive("home")}
        href={"/"}
        role="button"
        className="btn text-2xl btn-accent my-3"
      >
        <HomeIcon className="w-6 h-6" />
        Home
      </Link>
      <div className="flex gap-2 mb-4">
        <div className="form-control">
          <input
            type="text"
            placeholder={`Role: ${data?.profile?.role as string}`}
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
            <li onClick={() => handleActive("dashboard")}>
              <Link
                className={`${active === "dashboard" && "active"}`}
                href="/dashboard"
              >
                <Bars4Icon className="w-6 h-6" />
                Dashboard
              </Link>
            </li>
            <li onClick={() => handleActive("booking")}>
              <Link
                className={`${active === "booking" && "active"}`}
                href="/dashboard/booking"
              >
                <RiReservedFill className="w-6 h-6" />
                Booking
              </Link>
            </li>
          </>
        ) : (
          <>
            <li onClick={() => handleActive("dashboard")}>
              <Link
                className={`${active === "dashboard" && "active"}`}
                href="/dashboard"
              >
                <Bars4Icon className="w-6 h-6" />
                Dashboard
              </Link>
            </li>
            <li onClick={() => handleActive("service")}>
              <Link
                className={`${active === "service" && "active"}`}
                href="/dashboard/service"
              >
                {" "}
                <WrenchScrewdriverIcon className="w-6 h-6" />
                Service
              </Link>
            </li>
            <li onClick={() => handleActive("blog")}>
              <Link
                className={`${active === "blog" && "active"}`}
                href="/dashboard/blog"
              >
                {" "}
                <FaBlogger className="w-6 h-6" />
                Blog
              </Link>
            </li>
            <li onClick={() => handleActive("faq")}>
              <Link
                className={`${active === "faq" && "active"}`}
                href="/dashboard/faq"
              >
                {" "}
                <QuestionMarkCircleIcon className="w-6 h-6" />
                FAQ
              </Link>
            </li>
            <li onClick={() => handleActive("feedback")}>
              <Link
                className={`${active === "feedback" && "active"}`}
                href="/dashboard/feedback"
              >
                {" "}
                <FcFeedback className="w-6 h-6" />
                Feedback
              </Link>
            </li>
            <li onClick={() => handleActive("booking")}>
              <Link
                className={`${active === "booking" && "active"}`}
                href="/dashboard/booking"
              >
                {" "}
                <RiReservedFill className="w-6 h-6" />
                Booking
              </Link>
            </li>
            <li onClick={() => handleActive("users")}>
              <Link
                className={`${active === "users" && "active"}`}
                href="/dashboard/users"
              >
                {" "}
                <UsersIcon className="w-6 h-6" />
                Users
              </Link>
            </li>
            <li onClick={() => handleActive("category")}>
              <Link
                className={`${active === "category" && "active"}`}
                href="/dashboard/category"
              >
                {" "}
                <Square3Stack3DIcon className="w-6 h-6" />
                Category
              </Link>
            </li>
          </>
        )}
        {role === ENUM_USER_ROLE.SUPER_ADMIN && (
          <li onClick={() => handleActive("admin")}>
            <Link
              className={`${active === "admin" && "active"}`}
              href="/dashboard/admin/create"
            >
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

"use client";
import { ENUM_USER_ROLE } from "@/enums/user";
import { getUserInfo } from "@/services/auth.service";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";
import {
  HomeIcon,
  QuestionMarkCircleIcon,
  UserPlusIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
} from "@heroicons/react/24/solid";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBlogger } from "react-icons/fa";
import { FcFeedback } from "react-icons/fc";
import { RiReservedFill } from "react-icons/ri";

const Sidebar = () => {
  const { role } = getUserInfo() as any;
  const pathname = usePathname();

  return (
    <div className={`p-4 w-[80vw] md:w-80 min-h-full bg-slate-300`}>
      <ul className="menu text-base-content">
        <li>
          <Link
            href={"/"}
            className="w-full text-xl px-3 text-left bg-slate-400 text-slate-100"
          >
            Plumbing
          </Link>
        </li>
      </ul>
      <ul className="menu text-base-content">
        {role === ENUM_USER_ROLE.USER ? (
          <>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/booking" ? "active" : ""
                }`}
                href="/dashboard/booking"
              >
                <RiReservedFill className="w-6 h-6" />
                Booking
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                className={`${pathname === "/dashboard" ? "active" : ""}`}
                href="/dashboard"
              >
                <HomeIcon className="w-6 h-6" />
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/service" ? "active" : ""
                }`}
                href="/dashboard/service"
              >
                {" "}
                <WrenchScrewdriverIcon className="w-6 h-6" />
                Service
              </Link>
            </li>
            <li>
              <Link
                className={`${pathname === "/dashboard/blog" ? "active" : ""}`}
                href="/dashboard/blog"
              >
                {" "}
                <FaBlogger className="w-6 h-6" />
                Blog
              </Link>
            </li>
            <li>
              <Link
                className={`${pathname === "/dashboard/faq" ? "active" : ""}`}
                href="/dashboard/faq"
              >
                {" "}
                <QuestionMarkCircleIcon className="w-6 h-6" />
                FAQ
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/feedback" ? "active" : ""
                }`}
                href="/dashboard/feedback"
              >
                {" "}
                <FcFeedback className="w-6 h-6" />
                Feedback
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/booking" ? "active" : ""
                }`}
                href="/dashboard/booking"
              >
                {" "}
                <RiReservedFill className="w-6 h-6" />
                Booking
              </Link>
            </li>
            <li>
              <Link
                className={`${pathname === "/dashboard/users" ? "active" : ""}`}
                href="/dashboard/users"
              >
                <UsersIcon className="w-6 h-6" />
                Users
              </Link>
            </li>
            <li>
              <Link
                className={`${
                  pathname === "/dashboard/category" ? "active" : ""
                }`}
                href="/dashboard/category"
              >
                <Square3Stack3DIcon className="w-6 h-6" />
                Category
              </Link>
            </li>
          </>
        )}
        {role === ENUM_USER_ROLE.SUPER_ADMIN && (
          <li>
            <Link
              className={`${
                pathname === "/dashboard/admin/create" ? "active" : ""
              }`}
              href="/dashboard/admin/create"
            >
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

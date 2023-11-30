import { authKey } from "@/constants/storageKey";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { Bars4Icon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DashBoardNavbar = () => {
  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(userId);
  const router = useRouter();
  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <div className="navbar bg-base-100 pr-10">
      <div className="flex-1">
        <Bars4Icon className="w-6 h-6 lg:hidden" />
        <a className="text-xl">Welcome to our dashboard</a>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
          />
        </div>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                width={50}
                height={50}
                alt={data?.profile?.role as string}
                src={data?.profile?.profileImg as string}
              />
            </div>
          </div>
          <ul className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
            <li>
              <Link  href={`/dashboard/profile/${userId}`} className="justify-between">
                My Profile
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li onClick={logout}>
              <button>Logout</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardNavbar;

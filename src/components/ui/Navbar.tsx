"use client";
import { authKey } from "@/constants/storageKey";
import { useGetCartsQuery } from "@/redux/api/addToCartApi";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { BellAlertIcon } from "@heroicons/react/24/outline";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { userId } = getUserInfo() as any;
  const { data, isLoading, isError, error } = useProfileQuery(userId);
  const arg: any = {};
  const { data: getCarts } = useGetCartsQuery({ ...arg });

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <div className=" sticky top-0 z-50 bg-[#bdcaef]">
      <div className="container">
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
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
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link href="/home">Home</Link>
                </li>
                <li>
                  <Link href="/service">Services</Link>
                </li>
                <li>
                  <Link href="/blog">Blog</Link>
                </li>
                <li>
                  <Link href="/faq">FAQ</Link>
                </li>
                <li>
                  <Link href="/feedback">FeedBack</Link>
                </li>
                <li>
                  <Link href="/contact">Contact</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </div>
            <Link href="/home" className="btn btn-ghost normal-case text-xl">
              plumbing
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link href="/home">Home</Link>
              </li>
              <li>
                <Link href="/service">Services</Link>
              </li>
              <li>
                <Link href="/blog">Blog</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/feedback">FeedBack</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
            </ul>
          </div>
          <div className="navbar-end pr-5">
            <div className="flex space-x-2">
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <ShoppingCartIcon className="w-6 h-6" />
                    {getCarts?.carts && (
                      <span className="badge badge-sm indicator-item bg-red-500 text-white">
                        {getCarts?.carts?.length}
                      </span>
                    )}
                  </div>
                </label>
                <div
                  tabIndex={0}
                  className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
                >
                  <div className="card-body">
                    <span className="font-bold text-lg">
                      {getCarts?.carts?.length}{" "}
                      {getCarts?.carts && getCarts?.carts?.length >= 2
                        ? "Items"
                        : "Item"}
                    </span>
                    <div className="card-actions">
                      <Link href="/carts" className="btn btn-primary btn-block">
                        View cart
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <BellAlertIcon className="w-6 h-6" />
                  <span className="badge badge-xs badge-primary indicator-item"></span>
                </div>
              </button>
              <div className="dropdown dropdown-end pt-2">
                <div className="avatar" tabIndex={0}>
                  <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    {isLoading ? (
                      <span className="loading loading-dots loading-lg"></span>
                    ) : (
                      <Image
                        width={32}
                        height={32}
                        alt={data?.profile?.fullName as string}
                        src={data?.profile?.profileImg as string}
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <strong>{data?.profile?.fullName}</strong>
                  </li>
                  <li>
                    <Link href="/profile">Profile</Link>
                  </li>
                  {!userId ? (
                    <>
                      <li>
                        <Link href="/signup">Signup</Link>
                      </li>
                      <li>
                        <Link href="/login">Login</Link>
                      </li>
                    </>
                  ) : (
                    <li
                      onClick={logout}
                      className="btn mt-2 hover:text-white btn-outline btn-error"
                    >
                      Logout
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

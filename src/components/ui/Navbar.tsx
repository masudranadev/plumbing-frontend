"use client";
import { authKey } from "@/constants/storageKey";
import { useGetCartsQuery } from "@/redux/api/addToCartApi";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { ShoppingCartIcon, UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();

  const { userId } = getUserInfo() as any;
  const { data, isLoading } = useProfileQuery(userId);
  const arg: any = {};
  const { data: getCarts } = useGetCartsQuery({ ...arg });
  const handleOpen = () => {
    setOpen(!open);
  };
  const handleClose = () => {
    setTimeout(() => {
      setOpen(false);
    }, 500);
  };

  const logout = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  const menu = (
    <>
      <li onClick={handleClose}>
        <Link
          className={`${pathname === "/home" ? "active" : ""}`}
          href="/home"
        >
          Home
        </Link>
      </li>
      <li onClick={handleClose}>
        <Link
          className={`${pathname === "/service" ? "active" : ""}`}
          href="/service"
        >
          Services
        </Link>
      </li>
      <li onClick={handleClose}>
        <Link
          className={`${pathname === "/blog" ? "active" : ""}`}
          href="/blog"
        >
          Blog
        </Link>
      </li>
      <li onClick={handleClose}>
        <Link className={`${pathname === "/faq" ? "active" : ""}`} href="/faq">
          FAQ
        </Link>
      </li>
      <li onClick={handleClose}>
        <Link
          className={`${pathname === "/feedback" ? "active" : ""}`}
          href="/feedback"
        >
          FeedBack
        </Link>
      </li>
      <li onClick={handleClose}>
        <Link
          className={`${pathname === "/contact" ? "active" : ""}`}
          href="/contact"
        >
          Contact
        </Link>
      </li>
      <li>
        <Link
          className={`${pathname === "/dashboard" ? "active" : ""}`}
          href="/dashboard"
        >
          Dashboard
        </Link>
      </li>
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="navbar bg-base-100 container">
        <div className="navbar-start">
          <div className="dropdown">
            <label onClick={handleOpen} className="btn btn-ghost lg:hidden">
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
              className={`${
                open ? "block" : "hidden"
              } menu menu-sm mt-3 z-[1] p-2 shadow bg-base-100 rounded-sm w-52 absolute top-10`}
            >
              {menu}
            </ul>
          </div>
          <Link href={"/"} className="btn btn-ghost normal-case text-xl">
            Plubming
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{menu}</ul>
        </div>
        <div className="navbar-end">
          <div className="flex items-center space-x-2">
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle">
                <div className="indicator">
                  <ShoppingCartIcon className="w-6 h-6" />
                  <span className="badge badge-sm bg-red-500 text-white indicator-item">
                    {getCarts?.carts?.length}
                  </span>
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
                    <Link href={"/carts"} className="btn btn-primary btn-block">
                      View cart
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="dropdown dropdown-end pr-4">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                {!data?.profile?.profileImg ? (
                  <UserIcon className="w-10 h-10 block ring rounded-full" />
                ) : (
                  <div className="w-10 rounded-full ring">
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
                )}
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 space-y-2"
              >
                <li>
                  <a className="justify-between">
                    <strong>
                      {data?.profile?.fullName
                        ? data?.profile?.fullName
                        : "No User"}
                    </strong>
                  </a>
                </li>
                {userId && (
                  <li>
                    <Link href={"/profile"} className="justify-between">
                      My Profile
                    </Link>
                  </li>
                )}
                {!userId ? (
                  <>
                    <li>
                      <Link href={"/signup"}>Signup</Link>
                    </li>
                    <li>
                      <Link href={"/login"}>Login</Link>
                    </li>
                  </>
                ) : (
                  <li onClick={logout} className="btn btn-error text-white">
                    Logout
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

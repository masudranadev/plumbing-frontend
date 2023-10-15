"use client";
import { authKey } from "@/constants/storageKey";
import { useProfileQuery } from "@/redux/api/profileApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const { userId } = getUserInfo() as any;
  const { data, isLoading, isError, error } = useProfileQuery(userId);

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
          <div className="navbar-end">
            <div className="dropdown dropdown-end">
              <div className="avatar" tabIndex={0}>
                <div className="w-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  {isLoading ? (
                    <span className="loading loading-dots loading-lg"></span>
                  ) : (
                    <Image
                      width={32}
                      height={32}
                      alt="avater"
                      src={data?.profile?.profileImg as string}
                    />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
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
                  <li onClick={logout} className="btn btn-outline btn-error">
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

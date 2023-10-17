"use client";
import React, { useEffect } from "react";
import { isLoggedin } from "@/services/auth.service";
import dynamic from "next/dynamic";
import {useRouter} from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const Sidebar = dynamic(() => import("../../components/ui/Sidebar"), {
    ssr: false,
  });
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = isLoggedin() as boolean;
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        {/* Sidebar content here */}
        <Sidebar />
      </div>
    </div>
  );
}

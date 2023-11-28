"use client";
import React, { useEffect, useState } from "react";
import { isLoggedin } from "@/services/auth.service";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import DashBoardNavbar from "@/components/dashboard/ui/DashBoardNavbar";
const Sidebar = dynamic(() => import("../../components/ui/Sidebar"), {
  ssr: false,
});
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [close, setClose] = useState<boolean>(false);
  
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = isLoggedin() as boolean;
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="drawer lg:drawer-open">
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <DashBoardNavbar />
        <div className="overflow-auto">{children}</div>
      </div>
      <div className="drawer-side">
        <label
          htmlFor={"dashboard-drawer"}
          aria-label={`${close && "close"} sidebar`}
          className="drawer-overlay"
        ></label>
        {/* Sidebar content here */}
        <Sidebar setClose={setClose} />
      </div>
    </div>
  );
}

"use client";
import React, { useEffect } from "react";
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
  // const [close, setClose] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = isLoggedin() as boolean;
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [router]);
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashBoardNavbar />
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-200">
          {children}
        </main>
      </div>
    </div>
  );
}

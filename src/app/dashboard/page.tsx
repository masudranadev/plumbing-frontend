"use client";
import { getUserInfo } from "@/services/auth.service";

const DashboardPage = () => {
  const { role } = getUserInfo() as any;
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center">
      <div className="text-black text-center">
        <h1 className="text-5xl font-bold">
          Welcome to our {role} Dashbord!!!
        </h1>
      </div>
    </div>
  );
};

export default DashboardPage;

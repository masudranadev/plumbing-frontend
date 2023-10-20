import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by Masud Rana",
};
const DashboardPage = () => {
  
  return (
    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 min-h-screen flex items-center justify-center">
      <div className="text-black text-center">
        <h1 className="text-5xl font-bold">Welcome to our Dashbord</h1>
      </div>
    </div>
  );
};

export default DashboardPage;

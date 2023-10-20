import DashBoardProfile from "@/components/dashboard/ui/DashBoardProfile";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Profile",
  description: "Generated by Masud Rana",
};
const DashBoardProfilePage = () => {
  return <DashBoardProfile />;
};

export default DashBoardProfilePage;

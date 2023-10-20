import DashboardFaq from '@/components/dashboard/ui/DashBoardFaq';
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard-faq",
  description: "Generated by Masud Rana",
};

const DashboardFaqPage = () => {
    return (
        <>
          <DashboardFaq />  
        </>
    );
};

export default DashboardFaqPage;
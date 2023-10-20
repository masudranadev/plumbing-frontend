import FeedbackForm from "@/components/forms/FeedbackForm";
import Banner from "@/components/ui/Banner";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Feedback",
  description: "Generated by Masud Rana",
};
const FeedbackPage = () => {
  const options = [
    {
        label: "Home",
        link: "/",
        active: "home"
    },
    {
        label: "Feedback",
        link: "#",
        active: ""
    }
]
  return (
    <>
    <Banner menu={options} title="Feedback Page"/>
      <FeedbackForm />
    </>
  );
};

export default FeedbackPage;

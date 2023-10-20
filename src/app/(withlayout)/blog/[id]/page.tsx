import Banner from "@/components/ui/Banner";
import BlogDetails from "@/components/ui/BlogDetails";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Blog-details",
  description: "Generated by Masud Rana",
};
const BlogDetailsPage = ({ params }: { params: any }) => {
  const { id } = params;
  const options = [
    {
      label: "Home",
      link: "/",
      active: "home"
    },
    {
      label: "Blog",
      link: "/blog",
      active: "blog"
    },
    {
      label: "Blog Details",
      link: "#",
      active: ""
    },
  ];
  return (
    <>
      <Banner menu={options} title="Category Details Page" />
      <BlogDetails id={id} />
    </>
  );
};

export default BlogDetailsPage;

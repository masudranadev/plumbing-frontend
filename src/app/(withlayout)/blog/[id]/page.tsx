import BlogDetails from "@/components/ui/BlogDetails";

const BlogDetailsPage = ({ params }: { params: any }) => {
  const { id } = params;
  return <BlogDetails id={id} />;
};

export default BlogDetailsPage;

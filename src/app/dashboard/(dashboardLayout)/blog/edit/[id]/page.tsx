"use client";
import BlogEditForm from "@/components/dashboard/forms/BlogEditForm";

const BlogEditPage = ({ params }: { params: any }) => {
  const { id } = params;
  return (
    <div>
      <BlogEditForm id={id} />
    </div>
  );
};

export default BlogEditPage;

import CategoryEditForm from "@/components/dashboard/forms/CategoryEditForm";

const CategoryEditPage = ({ params }: { params: any }) => {
  const { id } = params;
  return <CategoryEditForm id={id} />;
};

export default CategoryEditPage;

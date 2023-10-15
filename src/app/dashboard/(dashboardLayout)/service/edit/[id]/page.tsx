import ServiceEditForm from "@/components/dashboard/forms/ServiceEditForm";

const ServiceEditPage = ({ params }: { params: any }) => {
  const { id } = params;
  return (
    <>
      <ServiceEditForm id={id} />
    </>
  );
};

export default ServiceEditPage;

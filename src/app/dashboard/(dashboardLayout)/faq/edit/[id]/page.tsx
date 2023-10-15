import FaqEditForm from "@/components/dashboard/forms/FaqEditForm";
import React from "react";

const FaqEditPage = ({ params }: { params: any }) => {
  const { id } = params;
  return (
    <>
      <FaqEditForm id={id} />
    </>
  );
};

export default FaqEditPage;

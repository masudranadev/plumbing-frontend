import BookingForm from "@/components/forms/BookingForm";
import React from "react";

const BookingPage = ({ params }: { params: any }) => {
  const { id } = params;
  return (
    <>
      <BookingForm serviceId={id} />
    </>
  );
};

export default BookingPage;

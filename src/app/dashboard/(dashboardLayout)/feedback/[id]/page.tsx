import DashBoardFeedbackDetails from "@/components/dashboard/ui/DashBoardFeedbackDetails";

const FeedbackDetailsPage = ({ params }: { params: any }) => {
  const { id } = params;
  return (
    <>
      <DashBoardFeedbackDetails id={id} />
    </>
  );
};

export default FeedbackDetailsPage;

import DashBoardProfile from "@/components/dashboard/ui/DashBoardProfile";

const DashBoardProfilePage = ({ params }: { params: any }) => {
  const { id } = params;
  return <DashBoardProfile id={id} />;
};

export default DashBoardProfilePage;

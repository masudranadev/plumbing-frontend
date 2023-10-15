import DashBoardFeedbackCard from '@/components/dashboard/ui/DashBoardFeedbackCard';

const FeedbackDetailsPage = ({params}: {params: any}) => {
    const {id} = params;
    return (
        <>
           <DashBoardFeedbackCard id={id} /> 
        </>
    );
};

export default FeedbackDetailsPage;
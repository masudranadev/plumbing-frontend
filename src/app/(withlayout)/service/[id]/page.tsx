import ServiceDetails from "@/components/ui/ServiceDetails";

const ServiceDetailsPage = ({params}: {params: any}) => {
    const {id} = params;
    return (
        <ServiceDetails id={id} />
    );
};

export default ServiceDetailsPage;
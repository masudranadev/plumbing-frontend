import ContactForm from '@/components/forms/ContactForm';
import Banner from '@/components/ui/Banner';
import ContactCards from '@/components/ui/ContactCards';
import MapContainer from '@/components/ui/MapContainer';
import React from 'react';

const ContactPage = () => {

    return (
        <>
            <Banner />
            <ContactCards />
            <ContactForm />
            <MapContainer />
        </>
    );
};

export default ContactPage;
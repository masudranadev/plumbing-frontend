import ContactForm from '@/components/forms/ContactForm';
import Banner from '@/components/ui/Banner';
import ContactCards from '@/components/ui/ContactCards';
import React from 'react';

const ContactPage = () => {
    return (
        <div>
            <Banner />
            <ContactCards />
            <ContactForm />
        </div>
    );
};

export default ContactPage;
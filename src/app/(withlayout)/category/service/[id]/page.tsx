import CategoryService from '@/components/ui/CategoryService';
import React from 'react';

const CategoryServicePage = ({params}: {params: any}) => {
    const {id} = params;
    return (
        <CategoryService id={id} />
    );
};

export default CategoryServicePage;
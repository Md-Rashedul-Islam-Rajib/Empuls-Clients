import React from 'react';
import Banner from '../component/banner/Banner';
import Services from '../component/services/layout/Services';
import Testimonials from '../component/testimonials/layout/Testimonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
        </div>
    );
};

export default Home;
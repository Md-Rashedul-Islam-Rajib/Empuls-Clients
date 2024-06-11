
import Banner from '../component/banner/Banner';
import Services from '../component/services/layout/Services';
import Testimonials from '../component/testimonials/layout/Testimonials';
import Newsletter from '../component/newsletter/layout/Newsletter';
import AboutUs from '../component/about-us/layout/AboutUs';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
            <AboutUs></AboutUs>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;
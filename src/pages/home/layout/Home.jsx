
import Banner from '../component/banner/Banner';
import Services from '../component/services/layout/Services';
import Testimonials from '../component/testimonials/layout/Testimonials';
import Newsletter from '../component/newsletter/layout/Newsletter';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <Services></Services>
            <Testimonials></Testimonials>
            <Newsletter></Newsletter>
        </div>
    );
};

export default Home;
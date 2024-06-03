import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles
// ..
AOS.init();

const Banner = () => {
    return (
        <div className="mb-8">
            
            
            <Swiper
          navigation={true}
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          loop={true}
        >
          <SwiperSlide>
          <div className="hero min-h-screen" style={{backgroundImage: 'url(/banner1.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-screen-lg">
      <h1
      data-aos="fade-down"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold">Making a Difference: Our Commitment to Community and Sustainability</h1>
      <p
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5">Our team has volunteered over 10,000 hours in 2023, and we are actively reducing our carbon footprint by 20%. Learn more about our community engagement and sustainable practices that make a positive impact</p>
      <button 
      data-aos="zoom-in"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="btn bg-[#fea116] border-0 text-white mt-4">Get Started</button>
    </div>
  </div>
</div>
          </SwiperSlide>
  
          
          <SwiperSlide>
          <div className="hero min-h-screen" style={{backgroundImage: 'url(/banner5.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
  <div className="max-w-screen-lg">
      <h1 
      data-aos="fade-down"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold">Awarded Best Employer of the Year 2024</h1>
      <p 
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5">We are proud to announce that we have been named the Best Employer of the Year 2023! This prestigious award recognizes our commitment to providing a supportive and enriching work environment for our employees</p>
      <button
      data-aos="zoom-in"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="btn bg-[#fea116] border-0 text-white mt-4">Get Started</button>
    </div>
  </div>
</div> 
          </SwiperSlide>


          <SwiperSlide>
          <div className="hero min-h-screen" style={{backgroundImage: 'url(/banner3.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
  <div className="max-w-screen-lg">
      <h1
      data-aos="fade-down"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold">Successfully Completed the XYZ Project for ABC Corporation </h1>
      <p 
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5"
      > We are delighted to have successfully completed the XYZ Project for ABC Corporation, a key milestone that showcases our expertise and commitment to delivering top-quality results for our clients</p>
      <button
      data-aos="zoom-in"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="btn bg-[#fea116] border-0 text-white mt-4">Get Started</button>
    </div>
  </div>
</div>
          </SwiperSlide>


          <SwiperSlide>
          <div className="hero min-h-screen" style={{backgroundImage: 'url(/banner4.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
  <div className="max-w-screen-lg">
      <h1
      data-aos="fade-down"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5 text-2xl md:text-3xl lg:text-5xl font-bold">From Intern to Project Manager: Mr Rafiq's Success Story</h1>
      <p 
      data-aos="fade-up"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="mb-5"
      > Discover the inspiring journey of Mr Rafiq, who started as an intern and rose to become a Project Manager within just two years. His dedication and hard work exemplify the growth opportunities available at our company</p>
      <button
      data-aos="zoom-in"
      data-aos-anchor-placement="top-bottom"
      data-aos-duration="1500"
      className="btn bg-[#fea116] border-0 text-white mt-4">Get Started</button>
    </div>
  </div>
</div>
          </SwiperSlide>


        </Swiper>


        </div>
    );
};

export default Banner;
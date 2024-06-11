import aboutUs from '../../../../../assets/aboutus.jpg'

const AboutUs = () => {
    return (
        <div className='md: mx-20'>
            <div className="flex flex-col lg:flex-row gap-6">
            <div className='flex-1 p-3'>
                <img src={aboutUs} alt="" />
            </div>

            <div className='flex-1'>
                <h2 className='font-semibold text-2xl my-4'>Empuls Employee Service :  Empowering Your Workforce</h2>

                <p className='text-lg'>Welcome to Empuls Employee Service! We are dedicated to transforming employee management with innovative solutions designed to streamline operations, enhance productivity, and foster a positive workplace culture. At Empuls, we understand the importance of effective employee management in driving business success. Our comprehensive suite of tools and services is tailored to meet the unique needs of your organization, ensuring seamless integration and efficient management of your workforce.Our mission is to empower businesses by providing cutting-edge technology and exceptional service, enabling you to focus on what matters most your people. With a user-friendly interface and customizable features, Empuls simplifies everything from onboarding and performance tracking to employee engagement and retention strategies.</p>
            </div>
        </div>
        </div>
    );
};

export default AboutUs;
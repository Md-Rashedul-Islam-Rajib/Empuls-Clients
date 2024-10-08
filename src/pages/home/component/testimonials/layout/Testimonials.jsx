import axios from 'axios';
import { useEffect, useState } from 'react';
import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Testimonials = () => {
    const axiosPublic = useAxiosPublic();
    // const [testimonials, setTestimonials] = useState([]);

    // useEffect(()=>{
	// 	axiosPublic.get('/testimonials')
	// 	.then(res=> {
	// 		setTestimonials(res.data)
	// 	})
	// },[])


    

    const {  data : testimonials = [] } = useQuery({
        queryKey: ['testimonials'],
        queryFn: async () => {
            const response = await axiosPublic.get('/testimonials');
            return response.data;
        }
      })
     

    return (
        <div>
            <section className="my-8 ">
	<div className="container flex flex-col items-center mx-auto mb-12 md:p-10 md:px-12">
		<h1 className="p-4 text-4xl font-semibold leading-none text-center">What our others are saying about us</h1>
	</div>
	<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto  lg:px-10">


		
            {
                testimonials?.map(testimonial => <div key={testimonial._id} className='flex justify-center'>
                    <div className="flex flex-col max-w-sm mx-4 my-6 shadow-xl">
                <div className="px-4 py-12 rounded-t-lg sm:px-8 md:px-12 ">
                    <p className="relative px-6 py-1 text-lg italic text-center">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="w-8 h-8 text-[#6F42C1]">
                            <path d="M232,246.857V16H16V416H54.4ZM48,48H200V233.143L48,377.905Z"></path>
                            <path d="M280,416h38.4L496,246.857V16H280ZM312,48H464V233.143L312,377.905Z"></path>
                        </svg>{testimonial?.message}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor" className="absolute right-0 w-8 h-8 text-[#6F42C1]">
                            <path d="M280,185.143V416H496V16H457.6ZM464,384H312V198.857L464,54.1Z"></path>
                            <path d="M232,16H193.6L16,185.143V416H232ZM200,384H48V198.857L200,54.1Z"></path>
                        </svg>
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center p-8 rounded-b-lg bg-[#6F42C1] text-white">
                    <img src={testimonial?.image} alt="" className="w-16 h-16 mb-2 -mt-16 bg-center bg-cover rounded-full bg-gray-500 " />
                    <p className="text-xl font-semibold leading-tight">{testimonial?.name}</p>
                    <p className="text-sm uppercase">{testimonial?.occupation}</p>
                </div>
            </div>
            </div>
            )
            }
        

		
	</div>
</section>
        </div>
    );
};

export default Testimonials;
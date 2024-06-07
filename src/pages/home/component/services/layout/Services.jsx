import { useEffect, useState } from 'react';
import ServiceCard from '../component/ServiceCard';

import useAxiosPublic from '../../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Services = () => {
    const axiosPublic = useAxiosPublic();
    // const [services, setServices] = useState([]);
	// useEffect(()=>{
	// 	axiosPublic.get('/services')
	// 	.then(res=> {
	// 		setServices(res.data)
	// 	})
	// },[])
    // const fetchFunc = async () => {
    //     const response = await axiosPublic.get('/services');
    //     return response.data;
    // }

    const {  data : services = [] } = useQuery({
        queryKey: ['services'],
        queryFn: async () => {
            const response = await axiosPublic.get('/services');
        return response.data;
        }
      })
    
    return (
        <div className='my-8'>
            <div className='text-center text-4xl font-semibold my-8'>
                <h2>We Provide</h2>
            </div>
            
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>

        </div>
    );
};

export default Services;
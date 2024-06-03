import { useEffect, useState } from 'react';
import ServiceCard from '../component/ServiceCard';
import axios from 'axios';

const Services = () => {

    const [services, setServices] = useState([]);
	useEffect(()=>{
		axios.get('http://localhost:5000/services')
		.then(res=> {
			setServices(res.data)
		})
	},[])

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
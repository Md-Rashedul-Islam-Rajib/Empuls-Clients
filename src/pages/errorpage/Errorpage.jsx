import Lottie from 'lottie-react';
import { Link } from 'react-router-dom';
import error from "../../assets/error.json"

const ErrorPage = () => {
    return (
        <div className='flex flex-col'>
           
            <div className="flex justify-center">
            <Lottie className="w-96" animationData={error} loop={false} />
            </div>

            <div className='md:flex-1 flex flex-col justify-center items-center text-center' >
                <h3 className='text-3xl md:text-4xl lg:text-5xl font-bold text-[#787878'>Page Not Found</h3>
                <Link className='btn btn-sm md:btn-md bg-[#4B5C74] text-[#f4f6f7] mt-4 rounded-3xl' to='/'>Back to the Home </Link>
            </div>
        </div >
    );
};

export default ErrorPage;
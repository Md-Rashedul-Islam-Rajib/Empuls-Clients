import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div className='flex md:mx-20'>

            <div className='max-w-80 min-h-screen bg-[#E9ECEF]'>

                <div className='p-6'>
                <Link to='/dashboard/work-sheet'><p>Work Sheet</p></Link>
                </div>

            </div>
            
            <div className='flex-1'>
                <Outlet></Outlet>
            </div>
        
        </div>
    );
};

export default Dashboard;
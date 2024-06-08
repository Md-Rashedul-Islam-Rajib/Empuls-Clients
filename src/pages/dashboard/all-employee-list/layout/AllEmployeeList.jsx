import React from 'react';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const AllEmployeeList = () => {

    const axiosPublic = useAxiosPublic();

    const {  data : userInfo = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const response = await axiosPublic.get('/users');
        return response.data;
        }
      })

    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th>Name</th>
        <th>Designation</th>
        <th>Salary</th>
        <th></th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {
        userInfo.map((item, idx)=> <tr key={idx}>
        <th>{item?.name ?  item?.name : "N/A"}</th>
        <td>{item?.designation ?  item?.designation : "N/A"}</td>
        <td>{item?.salary ?  item?.salary : "N/A"}</td>
        <td><span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
							<span>Make HR</span>
						</span></td>
        <td><span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
							<span>Fire</span>
						</span></td>
      </tr> )
      }
      
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default AllEmployeeList;
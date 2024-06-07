import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { ImCross } from 'react-icons/im';
import { BsCheckSquareFill } from 'react-icons/bs';

const EmployeeList = () => {

    const {user} = useContext(AuthContext);

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
            <div className="container p-2 mx-auto sm:p-4 text-gray-100">
	<h2 className="mb-4 text-2xl font-semibold text-black leading-tight">Invoices</h2>
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs table-auto">
			<colgroup>
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
				<col />
				{/* <col className="w-28" /> */}
			</colgroup>
			<thead className="bg-gray-700">
				<tr className="text-left">
					<th className="p-3">Name</th>
					<th className="p-3">Email</th>
					<th className="p-3">Verified Status</th>
					<th className="p-3">Bank A/C no</th>
					<th className="p-3 text-right">Salary</th>
					<th className="p-3">Status</th>
					<th className="p-3">Status</th>
				</tr>
			</thead>
			<tbody>
                {
                    userInfo.map((item,idx)=> <tr key={idx} className="border-b border-opacity-20 border-gray-700 bg-gray-900">
					<td className="p-3">
						<p>{item?.name ?  item?.name : "N/A"}</p>
					</td>
					<td className="p-3">
						<p>{item?.email ?  item?.email : "N/A"}</p>
					</td>
					<td className="p-3">
						{item.isVerified ? <BsCheckSquareFill className='text-green-500' /> :<ImCross className='text-red-600' />}
					</td>
					<td className="p-3">
						<p>{item?.bank_account_no ?  item?.bank_account_no : "N/A"}</p>
						
					</td>
					<td className="p-3 text-right">
						<p>{item?.salary ?  item?.salary : "N/A"}</p>
					</td>
					<td className="p-3 text-right">
                    <span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
							<span>Pay</span>
						</span>
					</td>
					<td className="p-3 text-right">
						<span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
							<span>Details</span>
						</span>
					</td>
				</tr> )
                }
				

				
			</tbody>
		</table>
	</div>
            </div>
        </div>
    );
};

export default EmployeeList;
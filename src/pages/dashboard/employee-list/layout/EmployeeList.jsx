import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { AuthContext } from '../../../../context/AuthProvider';
import useAxiosPublic from '../../../../hooks/useAxiosPublic';
import { ImCross } from 'react-icons/im';
import { BsCheckSquareFill } from 'react-icons/bs';
import Swal from 'sweetalert2';
import useVerification from '../../../../hooks/useVerification';

const EmployeeList = () => {

    const {user} = useContext(AuthContext);
	
    const {mutate: handleVerify } = useVerification();
    const handleVerification = (_id) => {

      handleVerify(_id) 
    }

    const axiosPublic = useAxiosPublic();

    const {  data : userInfo = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
          const response = await axiosPublic.get('/users');
        return response.data;
        }
      })


      // ! put request with useMutation 
	  // const queryClient = useQueryClient();
	  // const mutation = useMutation(
    //     (_id) => axiosPublic.put(`/users/${_id}`),
    //     {
    //         onSuccess: (data) => {
    //             if (data?.data?.modifiedCount > 0) {
    //                 Swal.fire({
    //                     title: 'Success',
    //                     text: 'This employee is now verified',
    //                     icon: 'success'
    //                 });
    //                 queryClient.invalidateQueries('users');
    //             }
    //         }
    //     }
    // );

    // const handleVerification = (_id) => {
    //     mutation.mutate(_id);
    // };

	

	  

		// axiosPublic.put(`/users/${_id}`)
		// .then(data => {
		// 	console.log(data.data)
		// 	if(data?.data?.modifiedCount > 0){
		// 		Swal.fire({
		// 			title: "Success",
		// 			text: `this employee is now verified`,
		// 			icon: "success"
		// 		  });
		// 	}
		// })
	  


    return (
        <div className='overflow-x-auto'>
            <div className="overflow-x-auto">
  <table className="table table-xs table-auto table-pin-rows table-pin-cols">
    <thead>
      <tr>
        <th>Name</th> 
        <th>Email</th> 
        <th>Verify Status</th> 
        <th>Bank A/C no</th> 
        <th>Salary</th> 
        <th></th> 
        <th></th>
      </tr>
    </thead> 
    <tbody>

		{
			userInfo?.map((item,idx)=><tr key={idx} className='hover'>
			<th>{item?.name ?  item?.name : "N/A"}</th> 
			<td>{item?.email ?  item?.email : "N/A"}</td> 
			<td>{item.isVerified ? <BsCheckSquareFill className='text-green-500' /> :<ImCross onClick={()=> {handleVerification(item?._id)}} className='text-red-600' />}</td> 
			<td>{item?.bank_account_no ?  item?.bank_account_no : "N/A"}</td> 
			<td>{item?.salary ?  item?.salary : "N/A"}</td> 
			<td>
			<span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
				{item?.isVerified ? <span>Pay</span>:<span>Pay</span>}
				</span>
				</td> 
			<td><span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
							<span>Details</span>
						</span></td>
		  </tr>)
		}
      

      
      
    </tbody> 
    
  </table>
</div>
        </div>
    );
};

export default EmployeeList;










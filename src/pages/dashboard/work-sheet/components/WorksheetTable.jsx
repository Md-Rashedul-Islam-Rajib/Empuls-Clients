import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useGetWorkData from "../../../../hooks/useGetWorkData";




const WorksheetTable = () => {

        const {user} = useContext(AuthContext);

        const axiosPublic = useAxiosPublic();

        const {workdata} = useGetWorkData();
 
     

    return (
      <div>

        {workdata?.length=== 0? <div className="flex justify-center mt-10">
              <h2 className="text-3xl font-semibold"> No work data found</h2>
              </div>:<div className="p-4">
            <div className="overflow-x-auto">
  <table className="table table-zebra table-auto table-pin-rows">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Task Type</th>
        <th>Worked Hour(s)</th>
        <th>Date</th>
      </tr>
    </thead>
    <tbody>
      {
		workdata?.map((item,idx)=><tr key={idx} className="hover">
        <th>{idx+1}</th>
        <td>{item?.tasksType ?  item?.tasksType : "N/A"}</td>
        <td>{item?.workedHours ?  item?.workedHours : "N/A"}</td>
        <td>{item?.date ?  item?.date : "N/A"}</td>
      </tr> )
	  }
      
      
      
    </tbody>
  </table>
</div>
        </div>}
      </div>
    );
};

export default WorksheetTable;

















// {
// 	workdata?.map((item,idx)=> <tr key={idx} className="border-b border-opacity-20 border-gray-700 bg-gray-900 text-white">
// 	<td className="p-3">
// 		<p>{idx+1}</p>
// 	</td>

// 	<td className="p-3">
// 		<p>{item?.tasksType}</p>
// 	</td>

// 	<td className="p-3">
// 		<p>{item?.workedHours}</p>
// 		{/* <p className="text-gray-400">Friday</p> */}
// 	</td>

// 	<td className="p-3">
// 		<p>{new Date(item?.date).toLocaleDateString()}</p>
// 		{/* <p className="text-gray-400">Tuesday</p> */}
// 	</td>
// </tr>)
// }
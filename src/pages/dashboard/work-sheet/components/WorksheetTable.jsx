import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";




const WorksheetTable = () => {

        const {user} = useContext(AuthContext);

        const axiosPublic = useAxiosPublic();

        // const fetchFunc = async (email) => {
        //     const { data } = await axiosPublic.get("/work-list", {
        //         params: { email },
        //     });
        //     return data;
        // };

        // const {data: workdata,refetch} = useQuery({
        //     queryKey: ["workdata", user?.email],
        //     queryFn: fetchFunc(user?.email),
        //     enabled: !!user?.email, // Only fetch if the email exists
        // });
    
        // // Function to call refetch when new data is added to the database
        // const handleNewData = () => {
        //     refetch();
        // };

        const [workdata, setWorkdata] = useState([]);

        useEffect(() => {
            axiosPublic
              .get("/work-list", {
                params: {
                  email: user.email,
                },
              })
              .then((res) => {
                setWorkdata(res.data);
                console.log(res.data)
              });
          }, [user?.email]);

    return (
        <div className="p-4">
            <div className="container p-2 mx-auto sm:p-4 ">
	<h2 className="mb-4 text-2xl font-semibold leading-tight">Work Data</h2>
    {/* <button onClick={handleNewData} className="mb-4 p-2 bg-blue-500 text-white rounded">Refresh Data</button> */}
	<div className="overflow-x-auto">
		<table className="min-w-full text-xs">
			<colgroup>
				
				<col />
				<col />
				<col />
				<col className="w-24" />
			</colgroup>
			<thead className="bg-gray-700">
				<tr className="text-center text-white">
					<th className="p-3">#</th>
					<th className="p-3">Task Type</th>
					<th className="p-3">Worked Hour(s)</th>
					<th className="p-3">Date</th>
					
				</tr>
			</thead>
			<tbody>
				{
                    workdata.map((item,idx)=> <tr key={idx} className="border-b border-opacity-20 border-gray-700 bg-gray-900 text-white">
					<td className="p-3">
						<p>{idx+1}</p>
					</td>

					<td className="p-3">
						<p>{item?.tasksType}</p>
					</td>

					<td className="p-3">
						<p>{item?.workedHours}</p>
						{/* <p className="text-gray-400">Friday</p> */}
					</td>

					<td className="p-3">
						<p>{new Date(item?.date).toLocaleDateString()}</p>
						{/* <p className="text-gray-400">Tuesday</p> */}
					</td>
				</tr>)
                }

				
			</tbody>
		</table>
	</div>
</div>
        </div>
    );
};

export default WorksheetTable;
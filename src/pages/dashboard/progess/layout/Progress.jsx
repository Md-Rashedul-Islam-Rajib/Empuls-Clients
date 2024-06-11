import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../../hooks/useAxiosPublic";


const Progress = () => {

    const { data: workdata = [] } = useQuery({
        queryKey: ["progress"],
        queryFn: async () => {
          const response = await axiosPublic.get("/work-list");
          return response.data;
        },
      });
console.log(workdata)
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Email</th>
        <th>Task Type</th>
        <th>Worked Hour(s)</th>
        <th>Date</th>
        
      </tr>
    </thead>
    <tbody>
      {workdata?.map((item,idx)=><tr key={idx}>
        <th>{idx+1}</th>
        <td>{item?.name ? item.name: 'N/A'}</td>
        <td>{item?.email ? item.email: 'N/A'}</td>
        <td>{item?.tasksType ? item.tasksType: 'N/A'}</td>
        <td>{item?.workedHours ? item.workedHours: 'N/A'}</td>
        <td>{item?.date ? item.date: 'N/A'}</td>
      </tr>)}
      
      
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Progress;
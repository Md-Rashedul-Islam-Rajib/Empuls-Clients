import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../../hooks/useAxiosPublic";
import { useState } from "react";


const Progress = () => {

  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState("");
      const [selectedMonth, setSelectedMonth] = useState("");
    
      const handleChangeEmployeeEmail = (event) => {
        setSelectedEmployeeEmail(event.target.value);
      };
    
      const handleChangeMonth = (event) => {
        setSelectedMonth(event.target.value);
      };

    const { data: workdata = [] } = useQuery({
        queryKey: ["progress"],
        queryFn: async () => {
          const response = await axiosPublic.get(`/work-list`, {
            params: {
              email: selectedEmployeeEmail,
              month: selectedMonth
            }
          });
          return response.data;
        },
      });

      

      

      const { data: filterUser = [] } = useQuery({
        queryKey: ["filter"],
        queryFn: async () => {
          const response = await axiosPublic.get("/users");
          return response.data;
        },
      });


      

      console.log(selectedEmployeeEmail,selectedMonth)

      const filterOption = filterUser.filter(item=>item.role !== "admin" );
      

    return (
        <div>

<form>
        <div>
          
          <select  onChange={handleChangeEmployeeEmail}>
            <option>Select Employee</option>
              {filterOption.map((item,idx)=> <option key={idx} value={item?.email}>{item?.name}</option>)}
          </select>
        </div>

        <div>
          <select  onChange={handleChangeMonth}>
            <option >Select Month</option>
              <option value="01">January</option>
              <option value="02">February</option>
              <option value="03">March</option>
              <option value="04">April</option>
              <option value="05">May</option>
              <option value="06">June</option>
              <option value="07">July</option>
              <option value="08">August</option>
              <option value="09">September</option>
              <option value="10">October</option>
              <option value="11">November</option>
              <option value="12">December</option>
             
          </select>
        </div>
        </form>
            <div className="overflow-x-auto">
  <table className="table">
    
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
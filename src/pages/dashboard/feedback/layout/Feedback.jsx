import { useQuery } from "@tanstack/react-query";
import { axiosSecure } from "../../../../hooks/useAxiosSecure";


const Feedback = () => {

    const {  data : messages = [] } = useQuery({
        queryKey: ['feedback'],
        queryFn: async () => {
            const response = await axiosSecure.get('/messages');
            return response.data;
        }
      })
console.log(messages)
    return (
        <div>
            <div className="overflow-x-auto">
  <table className="table">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Email</th>
        <th>Message</th>
        
      </tr>
    </thead>
    <tbody>
      {
        messages.map((item,idx)=> <tr key={idx} className="hover">
        <th>{idx+1}</th>
        <td>{item?.email ? item.email : 'N/A'}</td>
        <td>{item?.message  ?  item.message : 'N/A'}</td>
      </tr>)
      }
      
   
    </tbody>
  </table>
</div>
        </div>
    );
};

export default Feedback;
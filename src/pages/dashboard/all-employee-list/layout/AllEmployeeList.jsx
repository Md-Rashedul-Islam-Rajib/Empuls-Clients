import  { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useMakeHR from "../../../../hooks/useMakeHR";
import useFiring from "../../../../hooks/useFiring";
import { FaTable, FaTh } from "react-icons/fa";


const AllEmployeeList = () => {
  const axiosPublic = useAxiosPublic();

  const [isGridView, setIsGridView] = useState(true); 

  const handleToggle = () => {
    setIsGridView(!isGridView); 
  };

  const { mutate: handleHR } = useMakeHR();
  const handleMakeHR = (_id) => {
      handleHR(_id)
  };

  const {mutate : handleFire} = useFiring();
  const handleEmployeeFire = (_id) => {
    
    handleFire(_id)
  }

  const { data: userInfo = [] } = useQuery({
    queryKey: ["all-employee-list"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });
  const AllEmployeeListWithoutAdmin = userInfo.filter(item=>item.role !== "admin" );
  
  return (
    <div>
<div className="my-4 text-3xl flex justify-end">
<button onClick={handleToggle} className="toggle-button" title={isGridView ? 'Change viewing layout to table':'Change viewing layout to grid'}>
        {isGridView ? <FaTable /> : <FaTh />} 
      </button>
</div>

{isGridView ? <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
      {
        AllEmployeeListWithoutAdmin?.map((item,idx)=> <div key={idx} className="card w-96 bg-neutral text-neutral-content">
        <div className="card-body items-center text-center">
          <h2 className="card-title">{item?.name ? item?.name : "N/A"}</h2>
          <p>{item?.designation ? item?.designation : "N/A"}</p>
          <p>{item?.salary ? item?.salary : "N/A"}</p>
          <div className="card-actions justify-end">
          {item?.role === "HR" ? 
                    <span className="px-3 py-1 font-semibold rounded-md bg-green-600 text-white">
                      <span
                      >
                     HR
                      </span>
                    </span>
                   : 
                    <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleMakeHR(item._id);
                        }}
                      >
                        Make HR
                      </span>
                    </span>
                  }
            {item?.isFired ? 
                    <span className="px-3 py-1 font-semibold rounded-md  bg-red-600 text-white">
                      <span
                      >
                     Fired
                      </span>
                    </span>
                  : 
                    <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleEmployeeFire(item?._id);
                        }}
                      >
                        Fire
                      </span>
                    </span>
                  }
          </div>
        </div>
      </div>)
      }
    </div>:  <div className="overflow-x-auto">
        <table className="table">
          
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
            {AllEmployeeListWithoutAdmin?.map((item, idx) => (
              <tr key={idx}>
                <th>{item?.name ? item?.name : "N/A"}</th>
                <td>{item?.designation ? item?.designation : "N/A"}</td>
                <td>{item?.salary ? item?.salary : "N/A"}</td>
                <td>
                  {item?.role === "HR" ? 
                    <span className="px-3 py-1 font-semibold rounded-md bg-green-600 text-white">
                      <span
                      >
                     HR
                      </span>
                    </span>
                   : 
                    <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleMakeHR(item._id);
                        }}
                      >
                        Make HR
                      </span>
                    </span>
                  }
                </td>
                <td>
                {item?.isFired ? 
                    <span className="px-3 py-1 font-semibold rounded-md  bg-red-600 text-white">
                      <span
                      >
                     Fired
                      </span>
                    </span>
                  : 
                    <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleEmployeeFire(item?._id);
                        }}
                      >
                        Fire
                      </span>
                    </span>
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> }


    </div>
  );
};

export default AllEmployeeList;




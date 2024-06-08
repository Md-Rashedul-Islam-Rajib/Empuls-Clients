import React from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useMakeHR from "../../../../hooks/useMakeHR";
import useFiring from "../../../../hooks/useFiring";

const AllEmployeeList = () => {
  const axiosPublic = useAxiosPublic();

  const { mutate: handleHR } = useMakeHR();
  const handleMakeHR = (_id) => {
      handleHR(_id)
  };

  const {mutate : handleFire} = useFiring();
  const handleEmployeeFire = (_id) => {
    console.log(_id)
    handleFire(_id)
  }

  const { data: userInfo = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });

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
            {userInfo.map((item, idx) => (
              <tr key={idx}>
                <th>{item?.name ? item?.name : "N/A"}</th>
                <td>{item?.designation ? item?.designation : "N/A"}</td>
                <td>{item?.salary ? item?.salary : "N/A"}</td>
                <td>
                  {item?.role === "HR" ? (
                    <span className="px-3 py-1 font-semibold rounded-md btn bg-violet-400 text-gray-900">
                      <span
                      >
                     HR
                      </span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 font-semibold rounded-md btn bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleMakeHR(item._id);
                        }}
                      >
                        Make HR
                      </span>
                    </span>
                  )}
                </td>
                <td>
                {item?.isFired? (
                    <span className="px-3 py-1 font-semibold rounded-md btn bg-violet-400 text-gray-900">
                      <span
                      >
                     Fired
                      </span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 font-semibold rounded-md btn bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleEmployeeFire(item?._id);
                        }}
                      >
                        Fire
                      </span>
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllEmployeeList;

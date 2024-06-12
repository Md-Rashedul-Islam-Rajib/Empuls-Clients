import { useState } from "react";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useMakeHR from "../../../../hooks/useMakeHR";
import useFiring from "../../../../hooks/useFiring";
import { FaTable, FaTh } from "react-icons/fa";
import { GiHealthIncrease } from "react-icons/gi";
import useIncreaseSalary from "../../../../hooks/useIncreaseSalary";

const AllEmployeeList = () => {
  const axiosPublic = useAxiosPublic();

  const [isGridView, setIsGridView] = useState(true);
  const [showSalaryPopup, setShowSalaryPopup] = useState(false);
  const [newSalary, setNewSalary] = useState(0);
  const [salaryId, setSalaryId] = useState(null);

  const handleToggle = () => {
    setIsGridView(!isGridView);
  };

  const { mutate: handleHR } = useMakeHR();
  const handleMakeHR = (_id) => {
    handleHR(_id);
  };

  const { mutate: handleFire } = useFiring();
  const handleEmployeeFire = (_id) => {
    handleFire(_id);
  };

  const handleSalaryIncrease = (_id) => {
    setSalaryId(_id);
    setShowSalaryPopup(true);
  };

  const { mutate: handleIncreaseSalary } = useIncreaseSalary(newSalary);
  const handleSalarySubmit = () => {
    handleIncreaseSalary(salaryId);
    setShowSalaryPopup(false);
  };

  const { data: userInfo = [] } = useQuery({
    queryKey: ["all-employee-list"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });
  const AllEmployeeListWithoutAdmin = userInfo.filter(
    (item) => item.role !== "admin"
  );

  return (
    <div>
      <div className="my-4 text-3xl flex justify-end">
        <button
          onClick={handleToggle}
          className="toggle-button"
          title={
            isGridView
              ? "Change viewing layout to table"
              : "Change viewing layout to grid"
          }
        >
          {isGridView ? <FaTable /> : <FaTh />}
        </button>
      </div>

      {isGridView ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {AllEmployeeListWithoutAdmin?.map((item, idx) => (
            <div
              key={idx}
              className="card w-96 bg-neutral text-neutral-content"
            >
              <div className="card-body items-center text-center">
                <h2 className="card-title">
                  {item?.name ? item?.name : "N/A"}
                </h2>
                <p>{item?.designation ? item?.designation : "N/A"}</p>
                <p className="flex items-center gap-1">
                  {item?.salary ? item?.salary : "N/A"}{" "}
                  <span className="text-2xl cursor-pointer">
                    <GiHealthIncrease
                      onClick={() => {
                        handleSalaryIncrease(item?._id);
                      }}
                    />
                  </span>
                </p>
                <div className="card-actions justify-end">
                  {item?.role === "HR" ? (
                    <span className="px-3 py-1 font-semibold rounded-md bg-green-600 text-white">
                      <span>HR</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleMakeHR(item._id);
                        }}
                      >
                        Make HR
                      </span>
                    </span>
                  )}
                  {item?.isFired ? (
                    <span className="px-3 py-1 font-semibold rounded-md  bg-red-600 text-white">
                      <span>Fired</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
                      <span
                        onClick={() => {
                          handleEmployeeFire(item?._id);
                        }}
                      >
                        Fire
                      </span>
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table overflow-x-auto">
            <thead>
              <tr>
                <th>Name</th>
                <th>Designation</th>
                <th>Salary</th>
                <th>Increase Salary</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {AllEmployeeListWithoutAdmin?.map((item, idx) => (
                <tr key={idx}>
                  <th>{item?.name ? item?.name : "N/A"}</th>
                  <td>{item?.designation ? item?.designation : "N/A"}</td>
                  <td>{item?.salary ? item?.salary : "N/A"} </td>
                  <td>
                    <GiHealthIncrease
                      className="text-2xl cursor-pointer"
                      onClick={() => {
                        handleSalaryIncrease(item?._id);
                      }}
                    />
                  </td>
                  <td>
                    {item?.role === "HR" ? (
                      <span className="px-3 py-1 font-semibold rounded-md bg-green-600 text-white">
                        <span>HR</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
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
                    {item?.isFired ? (
                      <span className="px-3 py-1 font-semibold rounded-md  bg-red-600 text-white">
                        <span>Fired</span>
                      </span>
                    ) : (
                      <span className="px-3 py-1 font-semibold rounded-md btn btn-sm bg-violet-400 text-gray-900">
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
      )}
      {showSalaryPopup && (
        <div className="flex justify-center">
          <div className="popup my-4  input input-bordered flex items-center">
            <input
              type="number"
              onChange={(e) => setNewSalary(e.target.value)}
              placeholder="Enter new salary"
            />
            <button
              className="bg-[#6F42C1] btn btn-sm text-white"
              onClick={handleSalarySubmit}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllEmployeeList;

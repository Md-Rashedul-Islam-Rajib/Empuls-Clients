import { useQuery } from "@tanstack/react-query";
import { axiosPublic } from "../../../../hooks/useAxiosPublic";
import { useState, useEffect } from "react";

const Progress = () => {
  const [selectedEmployeeEmail, setSelectedEmployeeEmail] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [isGridView, setIsGridView] = useState(false); // Toggle between grid and table view
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024); // For responsive view handling

  const handleChangeEmployeeEmail = (event) => {
    setSelectedEmployeeEmail(event.target.value);
  };
  const handleChangeMonth = (event) => {
    setSelectedMonth(event.target.value);
  };

  const { data: workdata = [] } = useQuery({
    queryKey: ["progress", selectedEmployeeEmail, selectedMonth],
    queryFn: async () => {
      const response = await axiosPublic.get(`/work-list`, {
        params: {
          email: selectedEmployeeEmail,
          month: selectedMonth,
        },
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

  const filterOption = filterUser.filter((item) => item.role !== "admin");

  // Update screen size and handle responsiveness
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <form>
        <div>
          <select onChange={handleChangeEmployeeEmail}>
            <option>Select Employee</option>
            {filterOption.map((item, idx) => (
              <option key={idx} value={item?.email}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <select onChange={handleChangeMonth}>
            <option>Select Month</option>
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

      {/* Toggle Button for Desktop View */}
      {isDesktop && (
        <div className="flex justify-end my-4">
          <button
            onClick={() => setIsGridView(!isGridView)}
            className="btn bg-[#6F42C1] text-white"
          >
            {isGridView ? "Switch to Table View" : "Switch to Grid View"}
          </button>
        </div>
      )}

      {/* Table or Grid View based on isGridView and screen size */}
      <div className="overflow-x-auto">
        {isDesktop && !isGridView ? (
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
              {workdata?.map((item, idx) => (
                <tr key={idx}>
                  <th>{idx + 1}</th>
                  <td>{item?.name ? item.name : "N/A"}</td>
                  <td>{item?.email ? item.email : "N/A"}</td>
                  <td>{item?.tasksType ? item.tasksType : "N/A"}</td>
                  <td>{item?.workedHours ? item.workedHours : "N/A"}</td>
                  <td>{item?.date ? item.date : "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {workdata?.map((item, idx) => (
              <div
                key={idx}
                className="card shadow-lg rounded-lg p-4 bg-white hover:bg-[#6f42c1] hover:text-white border border-gray-200"
              >
                <div className="card-body">
                  <h3 className="card-title font-bold text-lg">
                    {item?.name ? item.name : "N/A"}
                  </h3>
                  <p>
                    <strong>Email:</strong> {item?.email ? item.email : "N/A"}
                  </p>
                  <p>
                    <strong>Task Type:</strong>{" "}
                    {item?.tasksType ? item.tasksType : "N/A"}
                  </p>
                  <p>
                    <strong>Worked Hours:</strong>{" "}
                    {item?.workedHours ? item.workedHours : "N/A"}
                  </p>
                  <p>
                    <strong>Date:</strong> {item?.date ? item.date : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Progress;

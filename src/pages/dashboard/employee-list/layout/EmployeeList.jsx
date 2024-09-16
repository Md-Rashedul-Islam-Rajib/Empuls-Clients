import { useMutation, useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { AuthContext } from "../../../../context/AuthProvider";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import { ImCross } from "react-icons/im";
import { BsCheckSquareFill } from "react-icons/bs";
import Swal from "sweetalert2";
import useVerification from "../../../../hooks/useVerification";
import { RxCross2 } from "react-icons/rx";
import { useForm } from "react-hook-form";
import usePayment from "../../../../hooks/usePayment";
import { Link } from "react-router-dom";

const EmployeeList = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const [selectedUser, setSelectedUser] = useState(null); // Stores the selected user info
  const [isTableView, setIsTableView] = useState(true); // Toggle state for desktop

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset, // This will reset the form when modal closes
  } = useForm();

  const { mutate: handleSalary } = usePayment();

  const onSubmit = async (data) => {
    if (selectedUser) {
      const paymentinfo = { ...data, email: selectedUser.email };
      handleSalary(paymentinfo);
      document.getElementById("payModal").close(); // Close modal after submit
      reset(); // Reset form fields
    }
  };

  const { mutate: handleVerify } = useVerification();
  const handleVerification = (_id) => {
    handleVerify(_id);
  };

  const { data: filterUser = [] } = useQuery({
    queryKey: ["employee-list"],
    queryFn: async () => {
      const response = await axiosPublic.get("/users");
      return response.data;
    },
  });

  const userInfo = filterUser.filter((item) => item.role !== "admin");

  // Open the modal with selected user's data
  const openPayModal = (user) => {
    setSelectedUser(user); // Set the selected user
    document.getElementById("payModal").showModal(); // Open the modal
  };

  return (
    <div className="p-4 md:p-8">
      {/* Toggle Button for Desktop */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsTableView(!isTableView)}
          className="btn btn-sm bg-[#6F42C1] text-white hidden lg:block"
        >
          {isTableView ? "Switch to Grid View" : "Switch to Table View"}
        </button>
      </div>

      {/* Table View (Only for Desktop) */}
      {isTableView && (
        <div className="overflow-x-auto hidden lg:block">
          <table className="table table-xs w-full">
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
              {userInfo?.map((item, idx) => (
                <tr key={idx} className="hover">
                  <th>{item?.name ? item?.name : "N/A"}</th>
                  <td>{item?.email ? item?.email : "N/A"}</td>
                  <td>
                    {item.isVerified ? (
                      <BsCheckSquareFill className="text-green-500" />
                    ) : (
                      <ImCross
                        onClick={() => {
                          handleVerification(item?._id);
                        }}
                        className="text-red-600 cursor-pointer"
                      />
                    )}
                  </td>
                  <td>{item?.bank_account_no ? item?.bank_account_no : "N/A"}</td>
                  <td>{item?.salary ? item?.salary : "N/A"}</td>
                  <td>
                    <button
                      onClick={() => openPayModal(item)} // Open modal for selected row
                      className={`btn btn-sm bg-[#6F42C1] text-white ${
                        item.isVerified ? "" : "cursor-not-allowed"
                      }`}
                      disabled={!item.isVerified}
                    >
                      Pay
                    </button>
                  </td>
                  <td>
                    <Link to={`details/${item?.email}`}>
                      <span className="btn btn-sm bg-violet-400 text-gray-900">
                        Details
                      </span>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Grid View (Always for Tablet & Mobile, optionally for Desktop) */}
      <div
        className={`grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ${
          isTableView ? "lg:hidden" : "lg:grid"
        }`}
      >
        {userInfo?.map((item, idx) => (
          <div key={idx} className="bg-white shadow-md rounded-lg p-4">
            <h3 className="font-bold text-lg">{item?.name ? item?.name : "N/A"}</h3>
            <p>Email: {item?.email ? item?.email : "N/A"}</p>
            <p>Bank A/C No: {item?.bank_account_no ? item?.bank_account_no : "N/A"}</p>
            <p>Salary: {item?.salary ? item?.salary : "N/A"}</p>
            <p>
              Verify Status:{" "}
              {item.isVerified ? (
                <BsCheckSquareFill className="text-green-500 inline" />
              ) : (
                <ImCross
                  onClick={() => {
                    handleVerification(item?._id);
                  }}
                  className="text-red-600 cursor-pointer inline"
                />
              )}
            </p>
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => openPayModal(item)} // Open modal for grid card
                className={`btn btn-sm bg-[#6F42C1] text-white ${
                  item.isVerified ? "" : "cursor-not-allowed"
                }`}
                disabled={!item.isVerified}
              >
                Pay
              </button>
              <Link to={`details/${item?.email}`} className="btn btn-sm bg-violet-400 text-gray-900">
                Details
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Pay Modal */}
      <dialog id="payModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="input flex items-center">
                Email:
                <input
                  value={selectedUser?.email || ""}
                  type="email"
                  readOnly
                  className="grow"
                />
              </label>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/3">
                <label className="input flex items-center">
                  Salary:
                  <input
                    defaultValue={selectedUser?.salary || ""}
                    type="number"
                    className="grow"
                    {...register("salary", {
                      required: true,
                    })}
                  />
                </label>
                {errors.salary && (
                  <span className="text-red-600 text-sm">
                    Salary is required
                  </span>
                )}
              </div>

              <div className="w-full md:w-1/3">
                <select
                  className="input input-ghost w-full"
                  {...register("month", { required: true })}
                >
                  <option>Select a month</option>
                  <option value="january">January</option>
                  <option value="february">February</option>
                  <option value="march">March</option>
                  <option value="april">April</option>
                  <option value="may">May</option>
                  <option value="june">June</option>
                  <option value="july">July</option>
                  <option value="august">August</option>
                  <option value="september">September</option>
                  <option value="october">October</option>
                  <option value="november">November</option>
                  <option value="december">December</option>
                </select>
                {errors.month && (
                  <span className="text-red-600 text-sm">
                    Month is required
                  </span>
                )}
              </div>
            </div>

            <div className="modal-action">
              <button type="submit" className="btn">
                Pay
              </button>
              <button
                type="button"
                onClick={() => {
                  document.getElementById("payModal").close();
                  reset(); // Reset form when modal closes
                }}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EmployeeList;

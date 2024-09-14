import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
  const [selectedUserid, setSelectedUserid] = useState(null);
  const [paymentinfo, setPaymentinfo] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();



  const {mutate: handleSalary } = usePayment(paymentinfo);

  const onSubmit = async (data) => {
    console.log(data)
      setPaymentinfo(data);
    if(selectedUserid){
      handleSalary( selectedUserid);
      
   console.log(selectedUserid,data)
      document.getElementById('item?._id').close();
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

  const userInfo = filterUser.filter(item=>item.role !== "admin" );

  return (
    <div>
      <div>
        <table className="table table-xs table-auto overflow-x-auto">
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
                      className="text-red-600"
                    />
                  )}
                </td>
                <td>{item?.bank_account_no ? item?.bank_account_no : "N/A"}</td>
                <td>{item?.salary ? item?.salary : "N/A"}</td>
                <td>
                  <span className="px-3 py-1 font-semibold rounded-md bg-violet-400 text-gray-900">
                    {item?.isVerified ? (
                      <>
                        
                        <button
                          onClick={() =>{
                            setSelectedUserid(item._id);
                            document.getElementById('item?._id').showModal();
                          }
                          }
                        >
                          Pay
                        </button>
                        {/* modal */}
                        <dialog
                          id={'item?._id'}
                          className="modal modal-bottom sm:modal-middle"
                        >
                          <div className="modal-box ">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                 <div className="">
                                 <label className="input flex items-center">
                                    Email:
                                    <input
                                      value={item.email}
                                      type="email"
                                      className="grow"
                                      {...register("email", {
                                        required: true,
                                      })}
                                    />
                                  </label>
                                 </div>
                                  
                                
                                


                              <div className="flex gap-4">
                                <div className="w-32">
                                  <label className="input flex items-center">
                                    Salary:
                                    <input
                                      value={item.salary}
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

                                <div className="flex-1">
                                  <select
                                    className="input input-ghost"
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
                                <div className="w-20">
                                  <label className="input input-bordered flex items-center ">
                                    <input
                                      type="number"
                                      className="bg-white w-10"
                                      placeholder="Year"
                                      {...register("year")}
                                    />
                                  </label>
                                  
                                </div>
                              </div>
                              <div className="flex justify-center">
                              <button
                                type="submit"
                                className="btn btn-sm bg-[#6F42C1] text-white"
                              >
                                Pay Now
                              </button>
                              </div>
                            </form>
                            <div className="modal-action">
                              <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                                  <RxCross2 />
                                </button>
                              </form>
                            </div>
                          </div>
                        </dialog>
                      </>
                    ) : (
                      <button disabled>Pay</button>
                    )}
                  </span>
                </td>
                <td>
                  <span className="px-3 py-1 font-semibold rounded-md bg-[#6F42C1] text-white">
                    <Link to={`details/${item?.email}`}><span>Details</span></Link>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
      {/* <form onSubmit={handleSubmit(onSubmit)}>
                              
                             
                              <label className="input flex items-center">
                                Name: 
                                    <input
                                      // value={item?.name}
                                      type="text"
                                      className="w-36"
                                      {...register("name", {
                                        required: true,
                                      })}
                                    />
                                  </label>


                                 <div className="">
                                 <label className="input flex items-center">
                                    Email:
                                    <input
                                      // value={item?.email}
                                      type="email"
                                      className="grow"
                                      {...register("email", {
                                        required: true,
                                      })}
                                    />
                                  </label>
                                 </div>
                                  
                                
                                <label className="input flex items-center">
                                    Employee Id :
                                    <input
                                      // defaultValue={item?._id}
                                      type="text"
                                      className="grow"
                                      {...register("employeeId", {
                                        required: true,
                                      })}
                                    />
                                  </label>


                              <div className="flex gap-4">
                                <div className="w-32">
                                  <label className="input flex items-center">
                                    Salary:
                                    <input
                                      // value={item?.salary}
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

                                <div className="flex-1">
                                  <select
                                    className="input input-ghost"
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
                                <div className="w-20">
                                  <label className="input input-bordered flex items-center ">
                                    <input
                                      type="number"
                                      className="bg-white w-10"
                                      placeholder="Year"
                                      {...register("year")}
                                    />
                                  </label>
                                  
                                </div>
                              </div>
                              <div className="flex justify-center">
                              <button
                                type="submit"
                                className="btn btn-sm bg-[#6F42C1] text-white"
                              >
                                Pay Now
                              </button>
                              </div>
                            </form> */}
      </div>
    </div>
  );
};

export default EmployeeList;

{
  /* Open the modal using document.getElementById('ID').showModal() method */
}

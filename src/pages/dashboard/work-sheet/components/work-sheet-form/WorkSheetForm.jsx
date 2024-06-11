import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../context/AuthProvider";
import useAxiosPublic from "../../../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useGetWorkData from "../../../../../hooks/useGetWorkData";


const postWorkData = async (data) => {
    const response = await axios.post('/work-list', data);
    return response.data;
};

const WorkSheetForm = () => {
  const { user } = useContext(AuthContext);

  const {refetch} = useGetWorkData();

  // const [userInfo, setUserInfo] = useState(null);

  const axiosPublic = useAxiosPublic();

  
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  
  // const postWorkData = async (data) => {
  //   const response = await axiosPublic.post('/work-list', data);
  //   return response.data;
  // };
  
//   const queryClient = useQueryClient();
// const mutation = useMutation(postWorkData, {
//   onSuccess: (data) => {
//       if (data.insertedId) {
//           Swal.fire({
//               position: 'center',
//               icon: 'success',
//               title: 'Your work data has been saved',
//               showConfirmButton: false,
//               timer: 1500,
//           });
//           queryClient.invalidateQueries(['workdata']); 
//       }
//   }
// });

  const onSubmit = async (data) => {
  //   console.log(data);
    // mutation.mutate(data);
    axiosPublic.post("/work-list",data)
    .then((res)=> {
        if (res.data.insertedId){
          refetch()
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Your work data has been saved",
                showConfirmButton: false,
                timer: 1500
              });
        }
    })
  };

  const {  data : userInfo = [] } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await axiosPublic.get('/users',{
        params : { email : user?.email}
      });
    return response.data;
    }
  })

  
  

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 p-8">
          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
              <input
                type="text"
                value={userInfo?.name}
                className="grow"
                placeholder="Name"
                {...register("name", { required: true })}
              />
            </label>
          </div>

          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
              <input
                type="text"
                value={userInfo?.email}
                className="grow"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </label>
          </div>

          <div className="flex-1">
            <select
              className="input input-bordered flex items-center gap-2 mb-2 md:mb-4 w-full"
              {...register("tasksType", { required: true })}
            >
              <option>Select Tasks Type</option>
              <option value="Sales">Sales</option>
              <option value="Support">Support</option>
              <option value="Content">Content</option>
              <option value="Paper-work">Paper Work</option>
            </select>
            {errors.tasksType && (
              <span className="text-red-600 text-sm">
                Tasks Type is required
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
              <input
                type="number"
                className="grow"
                placeholder="Worked Hours"
                {...register("workedHours", { required: true })}
              />
            </label>
            {errors.workedHours && (
              <span className="text-red-600 text-sm">
                Worked Hours is required
              </span>
            )}
          </div>

          <div className="flex-1">
            <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
              <input
                type="date"
                id="date"
                className="grow"
                defaultValue={new Date().toISOString().split("T")[0]}
                placeholder="Worked Hours"
                {...register("date", { required: true })}
              />
            </label>
            {errors.workedHours && (
              <span className="text-red-600 text-sm">Date is required</span>
            )}
          </div>
        </div>

            

        {/* <DatePicker
    showIcon
    icon=<SlCalender className="text-lg mt-2 mr-2" />
    closeOnScroll={true}
    selected={selectedDate}
    className="input input-bordered"
    onChange={handleDateChange}
    dateFormat="dd/MM/yyyy"
    {...register("date", { required: true })}
  /> */}

        <div className="w-1/5 mx-auto">
          <button className="btn bg-[#6F42C1] text-white w-full">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default WorkSheetForm;

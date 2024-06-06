import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { SlCalender } from "react-icons/sl";
import { useState } from "react";



const WorkSheet = () => {

    const [selectedDate, setSelectedDate] = useState(new Date());
    const handleDateChange = (date) => {
        setSelectedDate(date);
      };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
        date: new Date().toISOString().split('T')[0] // Setting default value to current date
      }
  });

  const onSubmit = async (data) => {
    console.log(data);
  };

  return (
    <div className="text-center">
      {/* table */}
      <div></div>

      {/* form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <select
            className="input input-bordered flex items-center gap-2 mb-2 md:mb-4 w-full"
            {...register("tasks", { required: true })}
          >
            <option>Select Tasks Type</option>
            <option value="sales">Sales</option>
            <option value="support">Support</option>
            <option value="content">Content</option>
            <option value="paper-work">Paper Work</option>
          </select>
          {errors.tasks && (
            <span className="text-red-600 text-sm">Tasks is required</span>
          )}

          <label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
            
            <input
              type="number"
              
              className="grow"
              placeholder="Worked Hours"
              {...register("workedHours", { required: true })}
            />
          </label>
          {errors.workedHours && (
            <span className="text-red-600 text-sm">Worked Hours is required</span>
          )}



<label className="input input-bordered flex items-center gap-2 mb-2 md:mb-4">
            
            <input
              type="date"
              id="date"
              className="grow"
              defaultValue={new Date().toISOString().split('T')[0]}
              placeholder="Worked Hours"
              {...register("workedHours", { required: true })}
            />
          </label>
          {errors.workedHours && (
            <span className="text-red-600 text-sm">Date is required</span>
          )}


{/* <DatePicker
              showIcon
              icon=<SlCalender className="text-lg mt-2 mr-2" />
              closeOnScroll={true}
              selected={selectedDate}
              className="input input-bordered"
              onChange={handleDateChange}
              dateFormat="dd/MM/yyyy"
            /> */}

          <button className="btn bg-[#6F42C1] text-white w-full">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default WorkSheet;
